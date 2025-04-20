import { Resolvers } from '../generated-types';
import { GraphQLError } from 'graphql';
import Venue from '../../models/venue';
import { handleResolverErrors } from '../../util/errorHandler';
import User from '../../models/user';
import { z } from 'zod';
import { Op, WhereOptions } from 'sequelize';

const argsSchema = z.object({
  searchKeyword: z.string().optional(),
});

const venueResolvers: Resolvers = {
  Query: {
    allVenues: async (_, args, { user }: { user: User }) => {
      if (!user)
        throw new GraphQLError('User is not authenticated', {
          extensions: {
            code: 'UNAUTHENTICATED',
            http: { status: 401 },
          }
      });

      const normalizedArgs = argsSchema.parse(args);
      const { searchKeyword } = normalizedArgs;
      const where: WhereOptions = {};

      if (searchKeyword) {
        where.name = { [Op.iLike]: `%${searchKeyword}%` };
      }

      try {
        const venues = await Venue.findAll({ where });
        return venues;
      } catch (error) {
        return handleResolverErrors(error);
      }
    },
  },
};

export default venueResolvers;
