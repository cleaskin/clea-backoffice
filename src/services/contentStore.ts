import { INITIAL_ARTICLES, INITIAL_STORIES } from './mockData';
import type { Article, Story, DashboardStats } from '@/types';

const ARTICLES_KEY = 'clea_backoffice_articles_v1';
const STORIES_KEY = 'clea_backoffice_stories_v1';

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      localStorage.setItem(key, JSON.stringify(fallback));
      return fallback;
    }
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function saveToStorage<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.error(`Failed to save ${key} to storage`, err);
  }
}

export const contentStore = {
  // Articles
  getArticles(): Article[] {
    return loadFromStorage<Article[]>(ARTICLES_KEY, INITIAL_ARTICLES);
  },

  getArticleById(id: string): Article | undefined {
    const list = this.getArticles();
    return list.find((a) => a.id === id);
  },

  saveArticle(article: Article): Article {
    const list = this.getArticles();
    const now = new Date().toISOString();
    const index = list.findIndex((a) => a.id === article.id);

    const updated: Article = {
      ...article,
      updatedAt: now,
      createdAt: article.createdAt || now,
    };

    if (index >= 0) {
      list[index] = updated;
    } else {
      list.unshift(updated);
    }

    saveToStorage(ARTICLES_KEY, list);
    return updated;
  },

  deleteArticle(id: string): boolean {
    const list = this.getArticles();
    const filtered = list.filter((a) => a.id !== id);
    saveToStorage(ARTICLES_KEY, filtered);
    return filtered.length !== list.length;
  },

  // Stories
  getStories(): Story[] {
    const stories = loadFromStorage<Story[]>(STORIES_KEY, INITIAL_STORIES);
    return stories.sort((a, b) => a.order - b.order);
  },

  getStoryById(id: string): Story | undefined {
    const list = this.getStories();
    return list.find((s) => s.id === id);
  },

  saveStory(story: Story): Story {
    const list = this.getStories();
    const now = new Date().toISOString();
    const index = list.findIndex((s) => s.id === story.id);

    const updated: Story = {
      ...story,
      updatedAt: now,
      createdAt: story.createdAt || now,
    };

    if (index >= 0) {
      list[index] = updated;
    } else {
      updated.order = list.length + 1;
      list.push(updated);
    }

    saveToStorage(STORIES_KEY, list);
    return updated;
  },

  deleteStory(id: string): boolean {
    const list = this.getStories();
    const filtered = list.filter((s) => s.id !== id);
    saveToStorage(STORIES_KEY, filtered);
    return filtered.length !== list.length;
  },

  reorderStories(storyIds: string[]): Story[] {
    const list = this.getStories();
    const reordered: Story[] = [];

    storyIds.forEach((id, idx) => {
      const found = list.find((s) => s.id === id);
      if (found) {
        found.order = idx + 1;
        reordered.push(found);
      }
    });

    saveToStorage(STORIES_KEY, reordered);
    return reordered;
  },

  // Stats
  getStats(): DashboardStats {
    const articles = this.getArticles();
    const stories = this.getStories();

    const publishedArticles = articles.filter((a) => a.status === 'published');
    const draftArticles = articles.filter((a) => a.status === 'draft');
    const activeStories = stories.filter((s) => s.status === 'active');

    const totalViews =
      articles.reduce((acc, curr) => acc + (curr.viewsCount || 0), 0) +
      stories.reduce((acc, curr) => acc + (curr.viewsCount || 0), 0);

    const avgReadTime =
      publishedArticles.length > 0
        ? Math.round(
            publishedArticles.reduce((acc, curr) => acc + (curr.readingTime || 3), 0) /
              publishedArticles.length
          )
        : 3;

    return {
      totalArticles: articles.length,
      publishedArticles: publishedArticles.length,
      draftArticles: draftArticles.length,
      activeStories: activeStories.length,
      totalViews,
      avgReadTime,
    };
  },

  // Reset demo
  resetToDefaults(): void {
    saveToStorage(ARTICLES_KEY, INITIAL_ARTICLES);
    saveToStorage(STORIES_KEY, INITIAL_STORIES);
  },
};
