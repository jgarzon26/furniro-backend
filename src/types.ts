import { Request, Response } from 'express';

export interface GQLContext {
  req?: Request;
  res?: Response;
  uid?: string;
  [key: string]: any;
}
