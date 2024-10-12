import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import userResolvers from './user/resolvers';
import { dateScalarResolvers } from './scalarDate/resolvers';
import bookingResolvers from './booking/resolvers';



const typeDefs = mergeTypeDefs(loadFilesSync('src/graphql/**/*.graphql'));
const resolvers = mergeResolvers([userResolvers, dateScalarResolvers, bookingResolvers]);

export { typeDefs, resolvers };