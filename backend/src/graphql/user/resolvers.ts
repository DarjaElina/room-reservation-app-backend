import User from '../../models/user';
import Department from '../../models/department';
import { Resolvers } from '../generated-types';
import { UserInput } from '../generated-types';
import { handleResolverErrors } from '../../util/errorHandler';
import { generateUsername } from '../../util/helper';
import { sequelize } from '../../util/db';

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
    createUser: async (_, { user }: { user: UserInput }) => {
      try {
        const newUser = {
          givenName: user.givenName,
          middleName: user.middleName,
          familyName: user.familyName,
          email: user.email,
          role: user.role,
          status: user.status,
          departmentId: user.departmentId
        };
    
        const createdUser = await User.create(newUser);
        return createdUser;
    
      } catch (error) {
        return handleResolverErrors(error);
      }
    },

    bulkCreateUsers: async (_, { users }: { users: UserInput[] }) => {
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
      return createdUsers;

      } catch (error: unknown) {
        await transaction.rollback();
        return handleResolverErrors(error);
      }
    }
  }
};

export default userResolvers;