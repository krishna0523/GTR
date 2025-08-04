import NavigationBar from '../components/NavigationBar';
import CableBackground from '../components/CableBackground';
import CivilWorksSection from '../components/CivilWorksSection';
import Footer from '../components/Footer';
import ScrollProgressIndicator from '../components/ScrollProgressIndicator';

const CivilWorks = () => {
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
        {/* Civil Works Section */}
        <CivilWorksSection />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default CivilWorks;