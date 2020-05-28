import { GraphQLSchema } from "graphql";
import 'graphql-import-node';
import path from 'path';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs } from '@graphql-tools/merge';

const typesArray = loadFilesSync(path.join(__dirname, './**/*.graphql'));

const typeDefs = mergeTypeDefs(typesArray);import resolvers from './../resolvers/resolversMap';
import { makeExecutableSchema } from "graphql-tools";

const schema: GraphQLSchema = makeExecutableSchema({
    typeDefs,
    resolvers
});

export default schema;