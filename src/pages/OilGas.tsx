import NavigationBar from '../components/NavigationBar';
import CursorLight from '../components/CursorLight';
import OilGasSection from '../components/OilGasSection';
import Footer from '../components/Footer';
import ScrollProgressIndicator from '../components/ScrollProgressIndicator';
import Spline from '@splinetool/react-spline';

const OilGas = () => {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Scroll Progress Indicator */}
      <ScrollProgressIndicator />
      
      {/* Spline 3D Background */}
      <div className="fixed inset-0 w-full h-full -z-20">
        <Spline 
          scene="https://prod.spline.design/5rewS4K16RKYFVCc/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>
      
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