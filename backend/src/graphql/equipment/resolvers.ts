import { Resolvers } from "../generated-types";
import { GraphQLError } from "graphql";
import Equipment from "../../models/equipment";
import { handleResolverErrors } from "../../util/errorHandler";
import User from "../../models/user";
import { z } from "zod";
import { Op, WhereOptions } from 'sequelize';

const argsSchema = z.object({
  searchKeyword: z.string().optional(),
});

const equipmentResolvers: Resolvers = {
  Query: {
    allEquipment: async (_, args, { user }: { user: User }) => {
      if (!user) {
        throw new GraphQLError('Unauthenticated');
      }
      const normalizedArgs = argsSchema.parse(args);
      const { searchKeyword } = normalizedArgs;
      const where: WhereOptions = {};

      if (searchKeyword) {
        where.name = { [Op.iLike]: `%${searchKeyword}%` };
      }
      try {
        const equipment = await Equipment.findAll({where});
        return equipment;
      } catch (error) {
        return handleResolverErrors(error);
      }
    }
  }
};

export default equipmentResolvers;