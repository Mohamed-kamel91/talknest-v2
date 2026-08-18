import { IdentityServiceAPI } from '../external-services/ports/identity-service-api';
import { UserNotFoundError } from '../users-errors';
import { UserDetails } from '../domain/user-details';

export class UserIdentityService {
  constructor(private identityServiceApi: IdentityServiceAPI) {}

  async getUserById(userId: string) {
    try {
      const user = await this.identityServiceApi.getUserById(userId);

      if (user) {
        return user;
      }

      return new UserNotFoundError();
    } catch (err) {
      console.log(err);

      throw new Error('error occurreted getting user from service', {
        cause: err,
      });
    }
  }

  async getUserByEmail(email: string) {
    const prismaUser =
      await this.identityServiceApi.findUserByEmail(email);

    if (!prismaUser) {
      throw new UserNotFoundError(email);
    }

    return prismaUser;
  }

  async getUserDetailsByEmail(email: string) {
    const userModel =
      await this.identityServiceApi.findUserByEmail(email);

    if (!userModel) {
      throw new UserNotFoundError(email);
    }

    return UserDetails.toDTO(userModel);
  }
}
