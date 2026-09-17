import { faker } from '@faker-js/faker';
import { CreateMemberInput } from '@talknest/api/members';

export class CreateMemberInputBuilder {
  private props: CreateMemberInput = {
    username: faker.string.alphanumeric({
      length: { min: 5, max: 10 },
    }),
    email: faker.internet.email(),
    userId: faker.string.uuid(),
  };

  public withUserId(userId: string) {
    this.props.userId = userId;
    return this;
  }

  public withUsername(username: string) {
    this.props.username = username;
    return this;
  }

  public withEmail(email: string) {
    this.props.email = email;
    return this;
  }

  public build() {
    return this.props;
  }
}
