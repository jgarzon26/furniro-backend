import { GraphQLDefinitionsFactory } from '@nestjs/graphql';
import { generatedPath, typePaths } from './constants.js';

const watch = process.argv.includes('-watch') || process.argv.includes('-w');

const definitionsFactory = new GraphQLDefinitionsFactory();
await definitionsFactory.generate({
  typePaths: [typePaths],
  path: generatedPath,
  outputAs: 'class',
  watch,
});
