export type ArticleCategory =
  | 'Acne Care'
  | 'Hydration'
  | 'Anti-Aging'
  | 'Sun Protection'
  | 'Ingredients 101'
  | 'Daily Routine';

export type ArticleStatus = 'published' | 'draft' | 'archived';

export interface Author {
  name: string;
  role: string;
  avatar: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  category: ArticleCategory;
  summary: string;
  contentHtml: string;
  coverImage: string;
  readingTime: number; // minutes
  author: Author;
  status: ArticleStatus;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  viewsCount: number;
  likesCount: number;
  featured?: boolean;
}

export type StoryCtaAction = 'scan' | 'product' | 'article' | 'external';

export interface StorySlide {
  id: string;
  mediaUrl: string;
  mediaType: 'image' | 'video';
  duration: number; // seconds
  title?: string;
  subtitle?: string;
  badge?: string;
  ctaText?: string;
  ctaAction?: StoryCtaAction;
  ctaTarget?: string;
  textColor: 'white' | 'dark';
  overlayOpacity: number; // 0 to 100
}

export type StoryStatus = 'active' | 'scheduled' | 'archived';

export interface Story {
  id: string;
  title: string;
  category: string;
  coverImage: string;
  status: StoryStatus;
  startDate?: string;
  endDate?: string;
  slides: StorySlide[];
  viewsCount: number;
  completionRate: number; // percentage
  createdAt: string;
  updatedAt: string;
  order: number;
}

export interface DashboardStats {
  totalArticles: number;
  publishedArticles: number;
  draftArticles: number;
  activeStories: number;
  totalViews: number;
  avgReadTime: number;
}
