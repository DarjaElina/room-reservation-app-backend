import { Resolvers } from "../generated-types";
import { GraphQLError } from "graphql";
import Venue from "../../models/venue";
import { handleResolverErrors } from "../../util/errorHandler";
import User from "../../models/user";

const venueResolvers: Resolvers = {
  Query: {
    allVenues: async (_, __, { user }: { user: User }) => {
      if (!user) {
        throw new GraphQLError('Unauthenticated');
      }
      try {
        const venues = await Venue.findAll();
        return venues;
      } catch (error) {
        return handleResolverErrors(error);
      }
    }
  }
};

export default venueResolvers;