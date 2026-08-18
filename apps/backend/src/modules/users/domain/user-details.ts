import { UserDTO } from '@talknest/api/users';

export class UserDetails {
  // Temporary
  public static toDTO(model: any): UserDTO {
    return {
      id: '',
      email: '',
      firstName: '',
      lastName: '',
      username: '',
    };
  }
}
