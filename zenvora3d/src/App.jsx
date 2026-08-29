import React, { useState } from 'react';
import { DatabaseProvider, useDatabase } from './context/DatabaseContext';
import { MediaProvider } from './context/MediaContext';
import { Layout } from './components/Layout';
import { AuthContainer } from './pages/Auth/AuthContainer';
import { Dashboard } from './pages/Dashboard/Dashboard';

// Website Management Modules
import { Homepage } from './pages/Modules/Homepage';
import { About } from './pages/Modules/About';
import { FounderJourney } from './pages/Modules/FounderJourney';
import { Portfolio } from './pages/Modules/Portfolio';
import { Blogs } from './pages/Modules/Blogs';
import { Careers } from './pages/Modules/Careers';
import { Contact } from './pages/Modules/Contact';
import { PrivacyPolicy } from './pages/Modules/PrivacyPolicy';
import { TermsConditions } from './pages/Modules/TermsConditions';
import { FooterCMS } from './pages/Modules/FooterCMS';

// Global & Enterprise Management Modules
import { MediaLibrary } from './pages/Modules/MediaLibrary';
import { NavigationManager } from './pages/Modules/NavigationManager';
import { PagesManager } from './pages/Modules/PagesManager';
import { SEOManager } from './pages/Modules/SEOManager';
import { ContactsManager } from './pages/Modules/ContactsManager';
import { UserManagement } from './pages/Modules/UserManagement';
import { RolesPermissionsManager } from './pages/Modules/RolesPermissionsManager';
import { WebsiteSettings } from './pages/Modules/WebsiteSettings';
import { AdminProfile } from './pages/Modules/AdminProfile';

function AppContent() {
  const context = useDatabase();
  const { auth } = context || { auth: { isLoggedIn: false } };

  const [currentView, setCurrentView] = useState('dashboard');
  const isAuthenticated = Boolean(auth?.isLoggedIn || JSON.parse(localStorage.getItem('zenvora_auth') || '{}')?.isLoggedIn);

  if (!isAuthenticated) {
    return <AuthContainer onAuthSuccess={() => setCurrentView('dashboard')} />;
  }

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard setCurrentView={setCurrentView} />;

      // Website Management Pages
      case 'homepage':
        return <Homepage />;
      case 'about':
        return <About />;
      case 'founder-journey':
        return <FounderJourney />;
      case 'portfolio':
      case 'our-work':
      case 'ourWork':
        return <Portfolio />;
      case 'contact':
      case 'contact-cms':
        return <Contact />;
      case 'blogs':
        return <Blogs />;
      case 'careers':
      case 'job-openings':
      case 'resume-management':
        return <Careers />;
      case 'privacy-policy':
        return <PrivacyPolicy />;
      case 'terms-conditions':
      case 'legal-cms':
        return <TermsConditions />;
      case 'footer':
        return <FooterCMS />;

      // Global & Enterprise Management Modules
      case 'media-library':
        return <MediaLibrary />;
      case 'navigation-manager':
        return <NavigationManager />;
      case 'pages':
        return <PagesManager setCurrentView={setCurrentView} />;
      case 'seo-manager':
      case 'seo':
        return <SEOManager />;
      case 'contacts':
      case 'enquiries':
      case 'faq-contact':
        return <ContactsManager />;
      case 'users':
      case 'user-management':
        return <UserManagement />;
      case 'roles-permissions':
        return <RolesPermissionsManager />;
      case 'settings':
      case 'website-settings':
        return <WebsiteSettings setCurrentView={setCurrentView} />;
      case 'profile':
        return <AdminProfile />;

      default:
        return <Dashboard setCurrentView={setCurrentView} />;
    }
  };

  return (
    <Layout currentView={currentView} setCurrentView={setCurrentView}>
      {renderView()}
    </Layout>
  );
}

function App() {
  return (
    <DatabaseProvider>
      <MediaProvider>
        <AppContent />
      </MediaProvider>
    </DatabaseProvider>
  );
}

export default App;