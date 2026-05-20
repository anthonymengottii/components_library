import { Route, BrowserRouter as Router, Routes, Navigate } from 'react-router-dom';
import { NuqsAdapter } from 'nuqs/adapters/react-router/v6';
import Providers from './components/layout/Providers';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ActiveRouteProvider } from './components/context/ActiveRouteContext/ActiveRouteContext';
import { forceChakraDarkTheme } from './utils/utils';

import AnnouncementModal from './components/common/AnnouncementModal/AnnouncementModal';
import SidebarLayout from './components/layout/SidebarLayout';
import CategoryPage from './pages/CategoryPage';
import TemplatesPage from './pages/TemplatesPage';
import FavoritesPage from './pages/FavoritesPage';
import ToolsPage from './pages/ToolsPage';

function SEOUpdater() {
  const { i18n, t } = useTranslation();

  useEffect(() => {
    // Update HTML lang attribute
    document.documentElement.lang = i18n.language;

    // Update meta descriptions
    const desc = t('seo.description', 'An open source collection of high quality, animated, interactive & fully customizable React components for building stunning, memorable user interfaces.');
    
    document.querySelector('meta[name="description"]')?.setAttribute('content', desc);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', desc);
    document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', desc);
  }, [i18n.language, t]);

  return null;
}

function AppContent() {
  return (
    <>
      <Providers>
        <SEOUpdater />
        <Routes>
          <Route exact path="/" element={<Navigate to="/get-started/introduction" replace />} />
          <Route exact path="/templates" element={<TemplatesPage />} />

          <Route path="/tools/:toolId?" element={<ToolsPage />} />
          <Route
            path="/:category/:subcategory"
            element={
              <SidebarLayout>
                <CategoryPage />
              </SidebarLayout>
            }
          />

          <Route
            path="/favorites"
            element={
              <SidebarLayout>
                <FavoritesPage />
              </SidebarLayout>
            }
          />
        </Routes>
      </Providers>
    </>
  );
}

export default function App() {
  useEffect(() => {
    forceChakraDarkTheme();
  }, []);

  return (
    <Router>
      <NuqsAdapter>
        <ActiveRouteProvider>
          <AppContent />
          <AnnouncementModal />
        </ActiveRouteProvider>
      </NuqsAdapter>
    </Router>
  );
}
