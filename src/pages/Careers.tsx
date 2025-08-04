import NavigationBar from '../components/NavigationBar';
import FiberBackground from '../components/FiberBackground';
import CareersSection from '../components/CareersSection';
import Footer from '../components/Footer';
import ScrollProgressIndicator from '../components/ScrollProgressIndicator';

const Careers = () => {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Scroll Progress Indicator */}
      <ScrollProgressIndicator />
      
      {/* Fiber Optic Background */}
      <FiberBackground />
      
      {/* Navigation */}
      <NavigationBar />
      
      {/* Main Content */}
      <main className="relative z-10">
        {/* Careers Section */}
        <CareersSection />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Careers;