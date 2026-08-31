import { MemberDTO } from '../members';
import { PostType } from './types';

export type PostDTO = {
  id: string;
  postType: PostType;
  title: string;
  content?: string | undefined;
  link?: string | undefined;
  slug: string;
  numComments: number;
  voteScore: number;
  member: MemberDTO;
  dateCreated: string;
  lastUpdated: string;
};
