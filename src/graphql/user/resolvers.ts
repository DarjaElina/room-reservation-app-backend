import User from '../../models/user';
import { Resolvers, UserInput } from '../generated-types';
import { handleResolverErrors } from '../../util/errorHandler';
import { sendMail } from '../../util/mailService';
import { UserStatus } from '../../types/user/user.enums';
import { GraphQLError } from 'graphql';
import UserToken from '../../models/user_token';
import { TokenType } from '../../types/token/token.enums';
import { createToken, createPasswordHash } from '../../helpers/helpers';

const userResolvers: Resolvers = {
  Query: {
    currentUser: (_, __, { user }: { user: User }) => {
      return user;
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
          message: `🎉 Account successfully activated! Your username is ${user.username}`,
        };
      } catch (error) {
        return handleResolverErrors(error);
      }
    },

    signupRequest: async (_, { userInput }: { userInput: UserInput }) => {
      try {
        const activationLinkBase = `https://account-activation-page.vercel.app/activate/`;
        let token;

        const existingUser = await User.findOne({ where: { email: userInput.email }});
        

        if (existingUser && existingUser.status === UserStatus.Pending) {
          const existingToken = await UserToken.findOne({where: {userId: existingUser.id}});
          if (existingToken && new Date() < existingToken.expiresAt) {
            token = existingToken.token;
          } else {
            await existingToken?.destroy();
            token = await createToken(
              existingUser.id,
              TokenType.Activation,
              new Date(Date.now() + 24 * 60 * 60 * 1000)
            );
          }
          
          await sendMail(
            existingUser.email,
            'Activate Your Account',
            `Please click this link to activate your account: ${activationLinkBase}/${token}`
          );
  
          return { success: true, message: 'Signup link sent!' };
        }
        
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

        token = await createToken(
          createdUser.id,
          TokenType.Activation,
          new Date(Date.now() + 24 * 60 * 60 * 1000)
        );

        await sendMail(
          createdUser.email,
          'Activate Your Account',
          `Please click this link to activate your account: ${activationLinkBase}/${token}`
        );

        return { success: true, message: 'Signup link sent!' };
      } catch (error) {
        return handleResolverErrors(error);
      }
    },
  },
};

export default userResolvers;
