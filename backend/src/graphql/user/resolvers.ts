import User from '../../models/user';
import Department from '../../models/department';
import { Resolvers } from '../generated-types';

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
    createUser: async (_, args) => {
      const user = await User.create({ ...args });
      return user;
    }
  }
};

export default userResolvers;