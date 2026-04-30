import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';

// Auth and Admin
import DashboardPage from './pages/admin/DashboardPage';
import LoginPage from './pages/auth/LoginPage';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Public Pages
import HomePage from './pages/public/HomePage';
import AboutPage from './pages/public/AboutPage';
import SponsorsPage from './pages/public/SponsorsPage';
import SponsorDetailPage from './pages/public/SponsorDetailPage';
import ClasesPage from './pages/public/ClasesPage';
import BlogPage from './pages/public/BlogPage';
import NoticiaDetailPage from './pages/public/NoticiaDetailPage';
import ContactPage from './pages/public/ContactPage';
import PoliticasPage from './pages/public/PoliticasPage';
import CookiesPage from './pages/public/CookiesPage';
import LegacyPage from './pages/public/LegacyPage';
import TermsPage from './pages/public/TermsPage';

// Admin Pages
import SedesPage from './pages/admin/SedesPage';
import CrearSedePage from './pages/admin/CrearSedePage';
import EditarSedePage from './pages/admin/EditarSedePage';
import EventosPage from './pages/admin/EventosPage';
import CrearEventoPage from './pages/admin/CrearEventoPage';
import EditarEventoPage from './pages/admin/EditarEventoPage';
import PatrocinadoresPage from './pages/admin/PatrocinadoresPage';
import CrearPatrocinadorPage from './pages/admin/CrearPatrocinadorPage';
import EditarPatrocinadorPage from './pages/admin/EditarPatrocinadorPage';
import InstructoresPage from './pages/admin/InstructoresPage';
import CrearInstructorPage from './pages/admin/CrearInstructorPage';
import EditarInstructorPage from './pages/admin/EditarInstructorPage';
import NoticiasPage from './pages/admin/NoticiasPage';
import CrearNoticiaPage from './pages/admin/CrearNoticiaPage';
import EditarNoticiaPage from './pages/admin/EditarNoticiaPage';

// Components
import Navbar from './components/public/Navbar';
import Footer from './components/public/Footer';
import ChatWidget from './components/public/ChatWidget';

// Admin Placeholder Pages
import SettingsPage from './pages/admin/SettingsPage';

function App() {
  return (
    <div className="antialiased text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-950 min-h-screen">
      <BrowserRouter>
        <Routes>
          {/* Rutas Públicas con Navbar */}
          <Route element={
            <div className="relative flex flex-col min-h-screen w-full">
              {/* Backgrounds (fixed) */}
              <div
                className="fixed inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url('/src/assets/img/large/background.jpg')" }}
              ></div>
              <div className="fixed inset-0 bg-white/75"></div>

              {/* Foreground content */}
              <div className="relative z-10 flex flex-col flex-grow w-full font-sans">
                <Navbar />
                <main className="flex-grow overflow-x-hidden">
                  <Outlet />
                </main>
                <ChatWidget />
                <Footer />
              </div>
            </div>
          }>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/sponsors" element={<SponsorsPage />} />
            <Route path="/sponsors/:id" element={<SponsorDetailPage />} />
            <Route path="/clases" element={<ClasesPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/noticia/:slug" element={<NoticiaDetailPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/politicas" element={<PoliticasPage />} />
            <Route path="/cookies" element={<CookiesPage />} />
            <Route path="/legacy" element={<LegacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
          </Route>

          <Route path="/login" element={<LoginPage />} />

          {/* Rutas Protegidas de Admin */}
          <Route path="/admin" element={<ProtectedRoute />}>
            <Route index element={<DashboardPage />} />
            <Route path="sedes" element={<SedesPage />} />
            <Route path="sedes/crearsedes" element={<CrearSedePage />} />
            <Route path="sedes/editarsedes" element={<EditarSedePage />} />
            <Route path="eventos" element={<EventosPage />} />
            <Route path="eventos/creareventos" element={<CrearEventoPage />} />
            <Route path="eventos/editareventos" element={<EditarEventoPage />} />
            <Route path="patrocinadores" element={<PatrocinadoresPage />} />
            <Route path="patrocinadores/crearpatrocinadores" element={<CrearPatrocinadorPage />} />
            <Route path="patrocinadores/editarpatrocinadores" element={<EditarPatrocinadorPage />} />
            <Route path="instructores" element={<InstructoresPage />} />
            <Route path="instructores/crearinstructores" element={<CrearInstructorPage />} />
            <Route path="instructores/editarinstructores" element={<EditarInstructorPage />} />
            <Route path="noticias" element={<NoticiasPage />} />
            <Route path="noticias/crearnoticias" element={<CrearNoticiaPage />} />
            <Route path="noticias/editarnoticias" element={<EditarNoticiaPage />} />

            {/* Nuevas páginas */}
            <Route path="settings" element={<SettingsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
