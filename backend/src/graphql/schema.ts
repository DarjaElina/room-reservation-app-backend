import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import userResolvers from './user/resolvers';



const typeDefs = mergeTypeDefs(loadFilesSync('src/graphql/**/*.graphql'));
const resolvers = mergeResolvers([userResolvers]);

export { typeDefs, resolvers };