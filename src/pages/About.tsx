import NavigationBar from '../components/NavigationBar';
import VideoBackground from '../components/VideoBackground';
import AboutSection from '../components/AboutSection';
import Footer from '../components/Footer';
import ScrollProgressIndicator from '../components/ScrollProgressIndicator';

const About = () => {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Scroll Progress Indicator */}
      <ScrollProgressIndicator />
      
      {/* Video Background */}
      <VideoBackground videoSrc="/Sequence 03.mp4" />
      
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