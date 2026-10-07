import { ValueObject } from '@talknest/core/domain';
import { NumberUtil, TextUtil } from '@talknest/core/utils';

type PostSlugProps = {
  value: string;
};

export class PostSlug extends ValueObject<PostSlugProps> {
  private constructor(props: PostSlugProps) {
    super(props);
  }

  get value() {
    return this.props.value;
  }

  public static create(title: string): PostSlug {
    const hash = NumberUtil.generateRandomInteger(10000, 999999);
    const kebabCase = TextUtil.kebabCase(title);
    const value = `${kebabCase}-${hash}`;
    return new PostSlug({ value });
  }

  public static reconstitute(value: string): PostSlug {
    return new PostSlug({ value });
  }
}
