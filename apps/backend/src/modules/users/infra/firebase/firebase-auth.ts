import { type Auth, getAuth } from 'firebase-admin/auth';
import { initializeApp, cert, getApps } from 'firebase-admin/app';

import { User } from '../../domain/user';
import { IdentityServiceAPI } from '../../application/ports/identity-service-api';
import { UserNotFoundError } from '../../domain/errors/users-errors';

export class FirebaseAuth implements IdentityServiceAPI {
  private firebaseAuth!: Auth;

  constructor() {
    this.initialize();
  }

  initialize() {
    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_PRIVATE_KEY;

    if (!projectId || !clientEmail || !privateKey) {
      console.warn(
        'Firebase credentials are missing. Firebase auth will not be initialized.',
      );
      return;
    }

    const serviceAccount = {
      projectId,
      clientEmail,
      privateKey: privateKey.replace(/\\n/g, '\n'),
    };

    const app =
      getApps().length > 0
        ? getApps()[0]
        : initializeApp({
            credential: cert(serviceAccount),
          });

    this.firebaseAuth = getAuth(app);
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
