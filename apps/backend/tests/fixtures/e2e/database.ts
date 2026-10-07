import { faker } from '@faker-js/faker';

import { TextUtil } from '@talknest/core/utils';
import {
  Member as MemberModel,
  Post as PostModel,
  Prisma,
} from '@talknest/database';

import { CompositionRoot } from '../../../src/shared/composition-root';

type SeedMemberOverrides = Partial<Prisma.MemberUncheckedCreateInput>;
type SeedPostOverrides = Partial<Prisma.PostUncheckedCreateInput> & {
  memberId: string;
};

const TITLE_MAX_LENGTH = 100;

export class DatabaseFixture {
  constructor(private composition: CompositionRoot) {}

  // lazy client to make sure db is already setup
  private get client() {
    return this.composition.getDatabase().getClient();
  }

  private static generateTitle(): string {
    return faker.lorem
      .sentence({ min: 5, max: 10 })
      .slice(0, TITLE_MAX_LENGTH)
      .trim();
  }

  private static createUniqueSlug(text: string): string {
    const slugify = faker.helpers.slugify(text);
    const baseSlug = TextUtil.kebabCase(slugify);
    const hash = faker.string.alphanumeric({
      length: 6,
      casing: 'lower',
    });

    return `${baseSlug}-${hash}`;
  }

  public async getMemberById(
    id: string,
  ): Promise<MemberModel | null> {
    return this.client.member.findUnique({ where: { id } });
  }

  public async getPostById(id: string): Promise<PostModel | null> {
    return this.client.post.findUnique({ where: { id } });
  }

  public async seedMember(
    overrides: SeedMemberOverrides = {},
  ): Promise<MemberModel> {
    return this.client.member.create({
      data: {
        id: faker.string.uuid(),
        userId: `auth0|${faker.string.uuid()}`,
        username: faker.string.alphanumeric({
          length: { min: 5, max: 15 },
          casing: 'lower',
        }),
        reputationLevel: 'Level1',
        reputationScore: 0,
        ...overrides,
      },
    });
  }

  public async seedPost(
    overrides: SeedPostOverrides,
  ): Promise<PostModel> {
    const postType = overrides.postType ?? 'text';
    const title = overrides.title ?? DatabaseFixture.generateTitle();

    return this.client.post.create({
      data: {
        id: faker.string.uuid(),
        postType,
        content: postType === 'text' ? faker.lorem.paragraph() : null,
        link:
          postType === 'link'
            ? faker.internet.url({
                protocol: 'https',
                appendSlash: false,
              })
            : null,
        voteScore: 0,
        ...overrides,
        title,
        slug:
          overrides.slug ?? DatabaseFixture.createUniqueSlug(title),
      },
    });
  }

  public async seedPosts(
    memberId: string,
    overrides: Array<Omit<SeedPostOverrides, 'memberId'>> = [],
  ): Promise<PostModel[]> {
    return Promise.all(
      overrides.map((override) =>
        this.seedPost({ ...override, memberId }),
      ),
    );
  }

  public async seedManyPosts(
    memberId: string,
    count: number,
    overrides: Omit<SeedPostOverrides, 'memberId'> = {},
  ): Promise<PostModel[]> {
    return this.seedPosts(
      memberId,
      Array.from({ length: count }, () => overrides),
    );
  }

  public async resetDatabase() {
    const connection = this.client;

    try {
      await connection.$transaction([
        connection.postVote.deleteMany(),
        connection.commentVote.deleteMany(),
        connection.comment.deleteMany(),
        connection.post.deleteMany(),
        connection.member.deleteMany(),
      ]);
    } catch (error) {
      console.error('Failed to reset test database:', error);
      throw error;
    }
  }
}
