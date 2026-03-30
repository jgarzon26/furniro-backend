import { Request, Response } from 'express';

export interface GQLContext {
  req: Request;
  res: Response;
  [key: string]: any;
}

export type JwtPayload = {
  sub: any;
  username: string;
};
