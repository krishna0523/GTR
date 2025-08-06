import NavigationBar from '../components/NavigationBar';
import ShaderCableBackground from '../components/ShaderCableBackground';
import TelecomSection from '../components/TelecomSection';
import Footer from '../components/Footer';
import ScrollProgressIndicator from '../components/ScrollProgressIndicator';

const Telecom = () => {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Scroll Progress Indicator */}
      <ScrollProgressIndicator />
      
      {/* Shader Cable Background */}
      <ShaderCableBackground />
      
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