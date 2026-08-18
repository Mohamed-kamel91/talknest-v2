import path from 'path';
import { type Auth, getAuth } from 'firebase-admin/auth';
import { initializeApp, cert } from 'firebase-admin/app';

import { User } from '../../domain/user';
import { IdentityServiceAPI } from '../ports/identity-service-api';
import { UserNotFoundError } from '../../users-errors';

export class FirebaseAuth implements IdentityServiceAPI {
  private firebaseAuth: Auth;

  constructor() {
    this.initialize();
    this.firebaseAuth = getAuth();
  }

  initialize() {
    initializeApp({
      credential: cert(
        require(
          path.join(__dirname, '../../../../../service-key.json'),
        ),
      ),
    });
  }

  async getUserById(
    userId: string,
  ): Promise<User | UserNotFoundError> {
    try {
      const userRecord = await this.firebaseAuth.getUser(userId);
      return {
        id: userRecord.uid,
        email: userRecord.email || '',
        emailVerified: userRecord.emailVerified,
        name: userRecord.displayName || '',
      };
    } catch (error) {
      if ((error as any).code === 'auth/user-not-found') {
        return new UserNotFoundError('user');
      }
      throw error;
    }
  }

  async findUserByEmail(
    email: string,
  ): Promise<User | UserNotFoundError> {
    try {
      const userRecord =
        await this.firebaseAuth.getUserByEmail(email);

      return {
        id: userRecord.uid,
        email: userRecord.email || '',
        emailVerified: userRecord.emailVerified,
        name: userRecord.displayName || '',
      };
    } catch (error) {
      if ((error as any).code === 'auth/user-not-found') {
        return new UserNotFoundError('user');
      }

      throw error;
    }
  }
}
