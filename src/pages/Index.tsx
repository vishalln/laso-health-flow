import Hero from '@/components/landing/Hero';
import HowItWorks from '@/components/landing/HowItWorks';
import ProgramCards from '@/components/landing/ProgramCards';
import TrustSignals from '@/components/landing/TrustSignals';
import Testimonials from '@/components/landing/Testimonials';
import FAQ from '@/components/landing/FAQ';
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <HowItWorks />
      <ProgramCards />
      <TrustSignals />
      <Testimonials />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Index;
