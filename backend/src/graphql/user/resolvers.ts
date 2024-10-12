import User from '../../models/user';
import Department from '../../models/department';
import { Resolvers, UserInput } from '../generated-types';
import { handleResolverErrors } from '../../util/errorHandler';
import { generateUsername } from '../../helpers/helpers';
import { sequelize } from '../../util/db';
import { sendMail } from '../../util/mailService';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../util/config';
import { UserRole, UserStatus } from '../../types/user/user.enums';
import { GraphQLError } from 'graphql';
import UserToken from '../../models/user_token';
import { TokenType } from '../../types/token/token.enums';
import { compareSync } from 'bcryptjs';
import { createToken, createPasswordHash } from '../../helpers/helpers';

const userResolvers: Resolvers = {
  Query: {
    allUsers: async (_, __,) => {
      const users = await User.findAll({
        include: [{
          model: Department,
          include: []
        }]
      });
      
      return users;
    }
  },
  
  User: {
    department: (user) => {
      return user.department;
    }  
  },

  Mutation: {
    createUser: async (_, { userInput }: { userInput: UserInput }, { isAdmin }: { isAdmin: boolean } ) => {
      if (!isAdmin) {
        throw new GraphQLError('This action is not allowed');
      }
      try {
        const newUser: UserInput = {
          givenName: userInput.givenName,
          middleName: userInput.middleName,
          familyName: userInput.familyName,
          email: userInput.email,
          role: userInput.role,
          status: userInput.status,
          departmentId: userInput.departmentId
        };
    
        const createdUser = await User.create(newUser);
       
        const token = await createToken(createdUser.id, TokenType.Activation, new Date(Date.now() + 24 * 60 * 60 * 1000));

        const activationLink = `https://example.com/activate?token=${token}`;

        await sendMail(
          createdUser.email,
          'Activate Your Account',
          `Please click this link to activate your account: ${activationLink}`
        );

        return createdUser;
    
      } catch (error) {
        return handleResolverErrors(error);
      }
    },

    bulkCreateUsers: async (_, { users }: { users: UserInput[] }, { isAdmin }: { isAdmin: boolean }) => {
      if (!isAdmin) {
        throw new GraphQLError('This action is not allowed');
      }
      const transaction = await sequelize.transaction();
      try {
       const createdUsers = await User.bulkCreate(
        users.map(user => ({
          givenName: user.givenName,
          middleName: user.middleName,
          familyName: user.familyName,
          email: user.email,
          role: user.role,
          status: user.status,
          departmentId: user.departmentId
        })), { transaction, returning: true, validate: true }
       );

       
       const bulkUpdates = createdUsers.map((user) => {
        const username = generateUsername(user.familyName, user.givenName, user.userNumber);
        return {
          id: user.id,
          username,
        };
      });

      const updateQuery = `
        UPDATE "users"
        SET "username" = CASE "id"
          ${bulkUpdates.map(u => `WHEN '${u.id}' THEN '${u.username}'`).join('\n')}
        END
        WHERE "id" IN (${bulkUpdates.map(u => `'${u.id}'`).join(', ')});
      `;

      await sequelize.query(updateQuery, { transaction });

      await transaction.commit();

      await Promise.all(
        createdUsers.map(async (user) => {
          const token = await createToken(user.id, TokenType.Activation, new Date(Date.now() + 24 * 60 * 60 * 1000));
  
          const activationLink = `https://example.com/activate?token=${token}`;
  
          await sendMail(
            user.email,
            'Activate Your Account',
            `Please click this link to activate your account: ${activationLink}`
          );
        })
      );

      return createdUsers;

      } catch (error: unknown) {
        await transaction.rollback();
        return handleResolverErrors(error);
      }
    },

    activateUser: async (_, { activationToken, newPassword } ) => {
      try {
      const storedToken = await UserToken.findOne({ where: { token: activationToken, type: TokenType.Activation } });

      if (!storedToken || new Date() > storedToken.expiresAt) {
        throw new GraphQLError('Token is invalid or has expired');
      }

      const user = await User.findByPk(storedToken.userId);
      if (!user) {
        throw new GraphQLError('User not found');
      }

      const passwordHash = createPasswordHash(newPassword);
      await user.update({ passwordHash, status: UserStatus.Active });

      await storedToken.destroy();

      return { success: true, message: 'Account successfully activated, you can now log in' };
      } catch (error) {
        return handleResolverErrors(error);
      }
    },

    login: async (_, { username, password } ) => {
      try {
        const user = await User.findOne({ where: { username } });
        if (!user) {
          throw new GraphQLError('User not found');
        }
        if (user.status !== UserStatus.Active) {
          throw new GraphQLError('You need to activate your account first');
        }
        if (!user.passwordHash) {
          throw new GraphQLError('Password not set. Please reset your password.');
        }
        if (!JWT_SECRET) {
          throw new Error('JWT_SECRET is not defined');
        }
        const passwordCorrect = compareSync(password, user.passwordHash);

        const isAdmin = user.role === UserRole.Admin;

        if (passwordCorrect) {
          const token = jwt.sign({ userId: user.id, isAdmin }, JWT_SECRET, { expiresIn: '1h' });

          return { value: token };
        } else throw new GraphQLError('Incorrect password');
      } catch (error) {
        return handleResolverErrors(error);
      }
    },

    deleteUser: async (_, { userId }, { isAdmin }: { isAdmin: boolean } ) => {
      if (!isAdmin) {
        throw new GraphQLError('This action is not allowed');
      }
      try {
        const user = await User.findByPk(userId);
        if (!user) {
          throw new GraphQLError('User not found');
        }
        await user.destroy();
        return { success: true, message: `User successfully deleted` };
      } catch (error) {
        return handleResolverErrors(error);
      }
    },

    updateUserStatus: async (_, { userId, status }, { isAdmin }: { isAdmin: boolean }) => {
      if (!isAdmin) {
        throw new GraphQLError('This action is not allowed');
      }
      try {
        const user = await User.findByPk(userId);
        if (!user) {
          throw new GraphQLError('User not found');
        }
        await user.update({ status });
        return user;
      } catch (error) {
        return handleResolverErrors(error);
      }
    },

    resetPassword: async (_, { token, newPassword } ) => {
      try {
        const storedToken = await UserToken.findOne({ where: { token, type: TokenType.Password_reset } });

        if (!storedToken || new Date() > storedToken.expiresAt) {
          throw new GraphQLError('Token is invalid or has expired');
        }

        const user = await User.findByPk(storedToken.userId);
        if (!user) {
          throw new GraphQLError('User not found');
        }
        if (!user.passwordHash) {
          throw new GraphQLError('No active account found');
        }
        const passwordHash = createPasswordHash(newPassword);
        await user.update({ passwordHash });

        await storedToken.destroy();
        return { success: true, message: 'Password reset successful, you can now log in to your account' };
      } catch (error) {
        return handleResolverErrors(error);
      }
    },

    changePassword: async (_, { oldPassword, newPassword }, { user }: { user: User }) => {
      try {
        if (!user.passwordHash) {
          throw new GraphQLError('No active account found');
        }
        if (!compareSync(oldPassword, user.passwordHash)) {
          throw new GraphQLError('Invalid credentials');
        }
        const passwordHash = createPasswordHash(newPassword);
        await user.update({ passwordHash });
        return { success: true, message: 'Password update successful' };
      } catch (error) {
        return handleResolverErrors(error);
      }
    },

    requestPasswordReset: async (_, { email }) => {
      try {
        const user = await User.findOne({ where: { email }});
        if (!user) {
          throw new GraphQLError('No user found with this email');
        }

        const token = await createToken(user.id, TokenType.Password_reset, new Date(Date.now() + 3600000));

        const passwordResetLink: string = `https://example.com/activate?token=${token}`;

        await sendMail(
          user.email,
          'Password reset',
          `Please click this link to reset your password: ${passwordResetLink}`
        );

        return { success: true, message: 'Password reset email sent, please check your mailbox' };
      } catch (error) {
        return handleResolverErrors(error);
      }
    }
  }
};



export default userResolvers;
