import NavigationBar from '../components/NavigationBar';
import CableBackground from '../components/CableBackground';
import TelecomSection from '../components/TelecomSection';
import Footer from '../components/Footer';
import ScrollProgressIndicator from '../components/ScrollProgressIndicator';

const Telecom = () => {
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
        {/* Telecom Section */}
        <TelecomSection />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Telecom;