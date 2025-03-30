import User from '../../models/user';
import { Resolvers, UserInput } from '../generated-types';
import { handleResolverErrors } from '../../util/errorHandler';
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
    currentUser: (_, __, { user }: { user: User }) => {
      return user;
    },
    checkActivationToken: async (_, { activationToken }) => {
      let isTokenActive = true;
      const storedToken = await UserToken.findOne({
        where: { token: activationToken, type: TokenType.Activation },
      });

      if (!storedToken || new Date() > storedToken.expiresAt)
        isTokenActive = false;
      return isTokenActive;
    },
  },

  User: {
    department: (user) => {
      return user.department;
    },
  },

  Mutation: {
    activateUser: async (_, { activationToken, newPassword }) => {
      try {
        const storedToken = await UserToken.findOne({
          where: { token: activationToken, type: TokenType.Activation },
        });

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

        return {
          success: true,
          message: `Account successfully activated, you can now log in. Your username is ${user.username}`,
        };
      } catch (error) {
        return handleResolverErrors(error);
      }
    },

    authenticate: async (_, { username, password }) => {
      try {
        const user = await User.findOne({ where: { username } });
        if (!user) {
          throw new GraphQLError('Invalid username or password.', {
            extensions: { 
              code: 'BAD_USER_INPUT',
              details: 'The provided credentials are incorrect.',
            },
          });
        }
        if (user.status !== UserStatus.Active) {
          throw new GraphQLError('You need to activate your account first.');
        }
        if (!user.passwordHash) {
          throw new GraphQLError(
            'Password not set. Please reset your password.'
          );
        }
        if (!JWT_SECRET) {
          throw new Error('JWT_SECRET is not defined.');
        }
        const passwordCorrect = compareSync(password, user.passwordHash);

        const isAdmin = user.role === UserRole.Admin;

        if (passwordCorrect) {
          const token = jwt.sign({ userId: user.id, isAdmin }, JWT_SECRET, {
            expiresIn: '1h',
          });

          return { value: token };
        } else {
          throw new GraphQLError('Invalid username or password.', {
            extensions: { 
              code: 'BAD_USER_INPUT',
              details: 'The provided credentials are incorrect.',
            },
          });
        }
      } catch (error) {
        console.log(error);
        return handleResolverErrors(error);
      }
    },

    signupRequest: async (_, { userInput }: { userInput: UserInput }) => {
      try {
        const newUser: UserInput = {
          givenName: userInput.givenName,
          middleName: userInput.middleName,
          familyName: userInput.familyName,
          email: userInput.email,
          role: userInput.role,
          status: userInput.status,
          departmentId: userInput.departmentId,
        };

        const createdUser = await User.create(newUser);

        const token = await createToken(
          createdUser.id,
          TokenType.Activation,
          new Date(Date.now() + 24 * 60 * 60 * 1000)
        );

        const activationLink = `http://localhost:5173/activate/${token}`;

        await sendMail(
          createdUser.email,
          'Activate Your Account',
          `Please click this link to activate your account: ${activationLink}`
        );

        return { success: true, message: 'Signup link sent!' };
      } catch (error) {
        return handleResolverErrors(error);
      }
    },
  },
};

export default userResolvers;
