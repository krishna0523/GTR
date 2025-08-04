import NavigationBar from '../components/NavigationBar';
import CableBackground from '../components/CableBackground';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import ScrollProgressIndicator from '../components/ScrollProgressIndicator';

const Contact = () => {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Scroll Progress Indicator */}
      <ScrollProgressIndicator />
      
      {/* Cable Background */}
      <CableBackground />
      
      {/* Navigation */}
      <NavigationBar />
      
      {/* Main Content */}
      <main className="relative z-10">
        {/* Contact Section */}
        <ContactSection />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Contact;