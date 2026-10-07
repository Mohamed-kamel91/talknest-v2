import { faker } from '@faker-js/faker';
import {
  CreatePostInput,
  type CreateLinkPostInput,
  type CreateTextPostInput,
} from '@talknest/api/posts';

export abstract class BasePostInputBuilder<
  TInput extends CreatePostInput,
> {
  protected title = faker.lorem.sentence({ min: 5, max: 10 });
  protected memberId = faker.string.uuid();

  public abstract build(): TInput;

  public withTitle(title: string): this {
    this.title = title;
    return this;
  }

  public withMemberId(memberId: string): this {
    this.memberId = memberId;
    return this;
  }
}

export class CreateTextPostInputBuilder extends BasePostInputBuilder<CreateTextPostInput> {
  private content = faker.lorem.paragraph();

  public withContent(content: string): this {
    this.content = content;
    return this;
  }

  public build(): CreateTextPostInput {
    return {
      postType: 'text',
      title: this.title,
      content: this.content,
      memberId: this.memberId,
    };
  }
}

export class CreateLinkPostInputBuilder extends BasePostInputBuilder<CreateLinkPostInput> {
  private link = faker.internet.url({
    protocol: 'https',
    appendSlash: false,
  });

  public withLink(link: string): this {
    this.link = link;
    return this;
  }

  public build(): CreateLinkPostInput {
    return {
      postType: 'link',
      title: this.title,
      link: this.link,
      memberId: this.memberId,
    };
  }
}

export class CreatePostInputBuilder {
  static aTextPost(): CreateTextPostInputBuilder {
    return new CreateTextPostInputBuilder();
  }

  static aLinkPost(): CreateLinkPostInputBuilder {
    return new CreateLinkPostInputBuilder();
  }
}
