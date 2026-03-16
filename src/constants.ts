import { join } from 'path';

export const typePaths = './**/*.graphql';
export const generatedPath = join(process.cwd(), 'src/graphql.ts');
