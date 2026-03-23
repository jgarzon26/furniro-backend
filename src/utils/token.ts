import { Request } from 'express';

export const getToken = (req?: Request) => {
  const auth = req?.headers?.authorization;
  const bearer = auth?.split(' ')[0];
  const token = auth?.split(' ')[1];

  return { bearer, token };
};
