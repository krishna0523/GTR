import NavigationBar from '../components/NavigationBar';
import VideoBackground from '../components/VideoBackground';
import HeroSection from '../components/HeroSection';
import StatsSection from '../components/StatsSection';
import ServicesSection from '../components/ServicesSection';
import TestimonialsSection from '../components/TestimonialsSection';
import ClientLogos from '../components/ClientLogos';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Video Background */}
      <VideoBackground />
      
      {/* Navigation */}
      <NavigationBar />
      
      {/* Main Content */}
      <main className="relative z-10">
        {/* Hero Section */}
        <HeroSection />
        
        {/* Stats Section */}
        <StatsSection />
        
        {/* Services Section */}
        <ServicesSection />
        
        {/* Testimonials */}
        <TestimonialsSection />
        
        {/* Client Logos */}
        <ClientLogos />
        
        {/* Contact Form */}
        <ContactForm />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
