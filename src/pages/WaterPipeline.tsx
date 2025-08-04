import NavigationBar from '../components/NavigationBar';
import CableBackground from '../components/CableBackground';
import WaterPipelineSection from '../components/WaterPipelineSection';
import Footer from '../components/Footer';
import ScrollProgressIndicator from '../components/ScrollProgressIndicator';

const WaterPipeline = () => {
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
        {/* Water Pipeline Section */}
        <WaterPipelineSection />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default WaterPipeline;