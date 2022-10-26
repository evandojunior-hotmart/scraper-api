import hotSecurityClient from '@hotmart/hot-security-node'
import { Request, Response } from 'express';

export const isAuthenticated = async (req: Request, res: Response, next: any) => {
  const { authorization } = req.headers;

  const userInfo = await hotSecurityClient.decode(authorization);
  console.log('userInfo', JSON.stringify(userInfo));

  if (!authorization || !userInfo) {
    res.status(401).send('User not authorized')
  } else {
    next();
  }
};