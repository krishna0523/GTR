import NavigationBar from '../components/NavigationBar';
import CableBackground from '../components/CableBackground';
import OilGasSection from '../components/OilGasSection';
import Footer from '../components/Footer';
import ScrollProgressIndicator from '../components/ScrollProgressIndicator';

const OilGas = () => {
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
        {/* Oil & Gas Section */}
        <OilGasSection />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default OilGas;