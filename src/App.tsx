import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Sidebar } from '@/components/layout/Sidebar';
import { DashboardPage } from '@/pages/DashboardPage';
import { ArticlesPage } from '@/pages/ArticlesPage';
import { ArticleEditPage } from '@/pages/ArticleEditPage';
import { StoriesPage } from '@/pages/StoriesPage';
import { StoryEditPage } from '@/pages/StoryEditPage';
import { SettingsPage } from '@/pages/SettingsPage';

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-clea-bg">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/articles" element={<ArticlesPage />} />
            <Route path="/articles/new" element={<ArticleEditPage />} />
            <Route path="/articles/:id/edit" element={<ArticleEditPage />} />
            <Route path="/stories" element={<StoriesPage />} />
            <Route path="/stories/new" element={<StoryEditPage />} />
            <Route path="/stories/:id/edit" element={<StoryEditPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
