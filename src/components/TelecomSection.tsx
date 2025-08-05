import { useState, useEffect } from 'react';
import { Radio, Zap, Settings, CheckCircle, FileText, MapPin, Shield, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

const TelecomSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger fade-in animation when component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);
  const capabilities = [
    {
      icon: Zap,
      title: 'Fiber Optic Cable (FOC) Laying & Jointing',
      description: 'Professional installation and splicing with precision testing'
    },
    {
      icon: Settings,
      title: 'Duct Installation & Cable Pulling',
      description: 'Complete ducting systems and cable management solutions'
    },
    {
      icon: Radio,
      title: 'Splicing, Testing, and Commissioning',
      description: 'Advanced splicing techniques with full commissioning services'
    },
    {
      icon: MapPin,
      title: 'Site Surveys & Route Validation',
      description: 'Comprehensive site analysis and route planning'
    },
    {
      icon: FileText,
      title: 'ROW Compliance and Permit Acquisition',
      description: 'Full regulatory compliance and permit management'
    },
    {
      icon: Target,
      title: 'Telecom Chamber & Handhole Installation',
      description: 'Professional chamber construction and installation'
    },
    {
      icon: Shield,
      title: 'Structured Documentation & As-Built Drawings',
      description: 'Complete documentation and technical drawings'
    }
  ];

  const features = [
    {
      icon: CheckCircle,
      title: 'OTDR Testing',
      description: 'Complete optical time-domain reflectometry testing for every cable segment'
    },
    {
      icon: Shield,
      title: 'Safety Compliance',
      description: 'Strict adherence to international and local safety standards'
    },
    {
      icon: FileText,
      title: 'Complete Traceability',
      description: 'Full documentation and traceability for every installation'
    }
  ];

  return (
    <section className="py-24 px-6">
      <div className="container mx-auto max-w-7xl">
        {/* Hero Section */}
        <div className={`text-center mb-20 transition-all duration-800 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}>
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/20 mb-6">
            <Radio className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-slide-up">
            <span className="text-primary">Telecom</span> Services
          </h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed animate-slide-up">
            At Grand Technical Resources LLC, we offer end-to-end telecom infrastructure solutions 
            that power Oman's growing digital backbone. With a specialized team and a deep understanding 
            of local standards and network operator protocols, we execute telecom projects with unmatched precision.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          {/* Overview */}
          <div className="glass-card">
            <h2 className="text-4xl font-bold text-white mb-6">Our Expertise</h2>
            <p className="text-lg text-white/80 leading-relaxed mb-6">
              We follow structured method statements backed by OTDR testing, safety compliance, 
              and complete traceability for every cable segment.
            </p>
            <p className="text-lg text-white/80 leading-relaxed">
              Whether it's urban connectivity, inter-city links, or industrial network infrastructure, 
              we deliver reliable and future-ready telecom networks.
            </p>
          </div>

          {/* Key Features */}
          <div className="glass-card">
            <h2 className="text-4xl font-bold text-white mb-6">Quality Assurance</h2>
            <div className="space-y-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/20">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-white mb-2">{feature.title}</h4>
                      <p className="text-white/70 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Capabilities Grid */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            Our Capabilities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {capabilities.map((capability, index) => {
              const Icon = capability.icon;
              return (
                <div key={index} className="glass-card group hover:scale-105 transition-transform duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-lg bg-primary/20 group-hover:bg-primary/30 transition-colors duration-300">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold text-white">{capability.title}</h3>
                  </div>
                  <p className="text-white/70 leading-relaxed">{capability.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Project Types */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            Project Types We Handle
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card text-center">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                <Radio className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Urban Connectivity</h3>
              <p className="text-white/70">High-density fiber networks for urban areas and commercial districts</p>
            </div>
            <div className="glass-card text-center">
              <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Inter-City Links</h3>
              <p className="text-white/70">Long-distance fiber optic connections between cities and regions</p>
            </div>
            <div className="glass-card text-center">
              <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-4">
                <Settings className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Industrial Networks</h3>
              <p className="text-white/70">Specialized telecom infrastructure for industrial and commercial facilities</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="glass-card">
            <h3 className="text-4xl font-bold text-white mb-6">
              Ready to Enhance Your Network Infrastructure?
            </h3>
            <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed">
              Partner with Oman's leading telecom infrastructure specialists. From fiber optic installation 
              to complete network commissioning, we deliver excellence at every connection point.
            </p>
            <div className="flex justify-center">
              <Link 
                to="/contact"
                className="glass-button text-lg bg-gradient-to-r from-primary to-accent hover:scale-105 inline-flex items-center gap-3"
              >
                <Radio className="w-5 h-5" />
                Start Your Telecom Project
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TelecomSection;