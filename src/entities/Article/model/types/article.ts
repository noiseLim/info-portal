import { User } from 'entities/User';
import { ArticleBlockType, ArticleType } from '../consts/articleConsts';

export interface ArticleBlockBase {
  id: string;
  type: ArticleBlockType;
}

export interface ArtickleCodeBlock extends ArticleBlockBase {
  type: ArticleBlockType.CODE;
  code: string;
}
export interface ArtickleImageBlock extends ArticleBlockBase {
  type: ArticleBlockType.IMAGE;
  src: string;
  title: string;
}
export interface ArtickleTextBlock extends ArticleBlockBase {
  type: ArticleBlockType.TEXT;
  paragraphs: string[];
  title?: string;
}

export type ArticleBlock =
  | ArtickleCodeBlock
  | ArtickleImageBlock
  | ArtickleTextBlock;

export interface Article {
  id: string;
  title: string;
  user: User;
  subtitle: string;
  img: string;
  views: number;
  createdAt: string;
  type: ArticleType[];
  blocks: ArticleBlock[];
}
