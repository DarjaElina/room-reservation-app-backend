import User from '../../models/user';
import { Resolvers } from '../generated-types';
import { handleResolverErrors } from '../../util/errorHandler';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../util/config';
import { UserStatus } from '../../types/user/user.enums';
import { GraphQLError } from 'graphql';
import UserToken from '../../models/user_token';
import { TokenType } from '../../types/token/token.enums';
import { compareSync } from 'bcryptjs';
import { IJwtPayload } from '../../helpers/helpers';

const tokenResolvers: Resolvers = {
  Query: {
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

  Mutation: {
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

        if (passwordCorrect) {
          const accessToken = jwt.sign({ userId: user.id }, JWT_SECRET, {
            expiresIn: '1h',
          });

          const refreshToken = jwt.sign({ userId: user.id }, JWT_SECRET, {
            expiresIn: '30d',
          });

          return { accessToken, refreshToken };
        } else {
          throw new GraphQLError('Invalid username or password.', {
            extensions: {
              code: 'BAD_USER_INPUT',
              details: 'The provided credentials are incorrect.',
            },
          });
        }
      } catch (error) {
        return handleResolverErrors(error);
      }
    },

    refreshToken: async (_, { token }: { token: string }) => {
      try {
        if (!JWT_SECRET) {
          throw new Error('JWT_SECRET is not defined');
        }
    
        const decoded = jwt.verify(token, JWT_SECRET) as IJwtPayload;
    
        const user = await User.findByPk(decoded.userId);
        if (!user) {
          throw new GraphQLError('Invalid refresh token.');
        }
    
        const accessToken = jwt.sign({ userId: user.id }, JWT_SECRET, {
          expiresIn: '1h',
        });
    
        return { accessToken };
      } catch (error) {
        console.log('Refresh token error:', error);
        throw new GraphQLError('Invalid or expired refresh token.');
      }
    }
  },
};

export default tokenResolvers;