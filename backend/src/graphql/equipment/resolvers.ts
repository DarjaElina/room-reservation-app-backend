import { Resolvers } from "../generated-types";
import { GraphQLError } from "graphql";
import Equipment from "../../models/equipment";
import { handleResolverErrors } from "../../util/errorHandler";
import User from "../../models/user";

const equipmentResolvers: Resolvers = {
  Query: {
    allEquipment: async (_, __, { user }: { user: User }) => {
      if (!user) {
        throw new GraphQLError('Unauthenticated');
      }
      try {
        const equipment = await Equipment.findAll();
        return equipment;
      } catch (error) {
        return handleResolverErrors(error);
      }
    }
  }
};

export default equipmentResolvers;