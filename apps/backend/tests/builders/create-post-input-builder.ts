import { faker } from '@faker-js/faker';
import { CreatePostInput } from '@talknest/api/posts';

export class CreatePostInputBuilder {
  private props = {
    title: faker.lorem.sentence({ min: 5, max: 10 }),
    postType: 'text' as CreatePostInput['postType'],
    content: faker.lorem.paragraph() as string | undefined,
    link: undefined as string | undefined,
    memberId: faker.string.uuid(),
  };

  public withPostType(type: CreatePostInput['postType']) {
    this.props.postType = type;

    if (type === 'text') {
      this.props.content = faker.lorem.paragraph();
      this.props.link = undefined;
    }

    if (type === 'link') {
      this.props.link = faker.internet.url();
      this.props.content = undefined;
    }

    return this;
  }

  public withTitle(title: string) {
    this.props.title = title;
    return this;
  }

  public withContent(content: string) {
    this.props.content = content;
    this.props.link = undefined;
    this.props.postType = 'text';
    return this;
  }

  public withLink(link: string) {
    this.props.link = link;
    this.props.content = undefined;
    this.props.postType = 'link';
    return this;
  }

  public withMemberId(memberId: string) {
    this.props.memberId = memberId;
    return this;
  }

  public build(): CreatePostInput {
    if (this.props.postType === 'text') {
      return {
        title: this.props.title,
        postType: 'text',
        content: this.props.content!,
        memberId: this.props.memberId,
      };
    }

    return {
      title: this.props.title,
      postType: 'link',
      link: this.props.link!,
      memberId: this.props.memberId,
    };
  }
}
