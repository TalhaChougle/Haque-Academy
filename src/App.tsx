import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ActivitiesSection from './components/ActivitiesSection';
import GallerySection from './components/GallerySection';
import NoticesSection from './components/NoticesSection';
import ResultsSection from './components/ResultsSection';
import DonateSection from './components/DonateSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import AdminGear from './components/AdminGear';
import { AdminProvider } from './lib/AdminContext';
import { supabaseConfigured } from './lib/supabaseClient';

function SetupBanner() {
  if (supabaseConfigured) return null;
  return (
    <div className="bg-amber-500 text-amber-950 text-xs xs:text-sm font-medium text-center px-3 py-2 relative z-[300]">
      ⚠️ Supabase isn't configured yet — Gallery, Notices, and Admin Login won't work until you
      set up <code className="bg-amber-600/30 px-1 rounded">.env.local</code>. See{' '}
      <code className="bg-amber-600/30 px-1 rounded">.env.example</code> and{' '}
      <code className="bg-amber-600/30 px-1 rounded">supabase/setup.sql</code>.
    </div>
  );
}

export default function App() {
  return (
    <AdminProvider>
      <div className="min-h-screen bg-white">
        <SetupBanner />
        <Navbar />
        <HeroSection />
        <AboutSection />
        <ActivitiesSection />
        <GallerySection />
        <NoticesSection />
        <ResultsSection />
        <DonateSection />
        <ContactSection />
        <Footer />
        <AdminGear />
      </div>
    </AdminProvider>
  );
}
