import NavigationBar from '../components/NavigationBar';
import CableBackground from '../components/CableBackground';
import AboutSection from '../components/AboutSection';
import Footer from '../components/Footer';
import ScrollProgressIndicator from '../components/ScrollProgressIndicator';

const About = () => {
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
        {/* About Section */}
        <AboutSection />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default About;