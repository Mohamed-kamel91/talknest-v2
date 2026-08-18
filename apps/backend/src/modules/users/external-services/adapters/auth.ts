import type { Request, Response, NextFunction } from 'express';

import { getAuth } from 'firebase-admin/auth';
import { Config } from '@talknest/config';

export function createJwtCheck(config: Config) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    const token = authHeader?.startsWith('Bearer ')
      ? authHeader.substring(7)
      : undefined;

    if (!token) {
      console.log('No Bearer token found in Authorization header');
      return res.status(401).json({ error: 'No token provided' });
    }

    console.log('Token received:', token.substring(0, 10) + '...'); // Log first 10 chars for security

    try {
      console.log('Attempting to verify ID token...');

      const decodedToken = await getAuth().verifyIdToken(token);

      console.log(
        'Token successfully verified. User ID:',
        decodedToken.uid,
      );

      (req as any).user = decodedToken;

      next();
    } catch (error) {
      console.error('Token verification failed:', error);
      return res.status(401).json({
        error: 'Invalid token',
        details:
          error instanceof Error ? error.message : 'Unknown error',
      });
    }
  };
}
