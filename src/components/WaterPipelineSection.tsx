import { useState, useEffect } from 'react';
import { Droplets, Wrench, TestTube, MapPin, Shield, CheckCircle, Timer, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

const WaterPipelineSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger fade-in animation when component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);
  const services = [
    {
      icon: MapPin,
      title: 'Excavation & Bedding for Water Pipelines',
      description: 'Professional excavation and proper bedding preparation for pipeline installation'
    },
    {
      icon: Wrench,
      title: 'HDPE / GI / DI Pipe Laying',
      description: 'Expert installation of High-Density Polyethylene, Galvanized Iron, and Ductile Iron pipes'
    },
    {
      icon: Home,
      title: 'Valve Chamber and Marker Post Construction',
      description: 'Construction of access chambers and installation of identification markers'
    },
    {
      icon: TestTube,
      title: 'Jointing, Testing & Hydrostatic Pressure Testing',
      description: 'Professional pipe jointing with comprehensive pressure testing and certification'
    },
    {
      icon: Shield,
      title: 'Site Restoration & Safety Compliance',
      description: 'Complete site restoration with full safety and regulatory compliance'
    }
  ];

  const pipeTypes = [
    {
      name: 'HDPE',
      fullName: 'High-Density Polyethylene',
      features: ['Corrosion resistant', 'Flexible installation', 'Long lifespan'],
      color: 'text-blue-400'
    },
    {
      name: 'GI',
      fullName: 'Galvanized Iron',
      features: ['High strength', 'Proven reliability', 'Cost effective'],
      color: 'text-gray-400'
    },
    {
      name: 'DI',
      fullName: 'Ductile Iron',
      features: ['Superior durability', 'High pressure rating', 'Industry standard'],
      color: 'text-orange-400'
    }
  ];

  const advantages = [
    {
      icon: Shield,
      title: 'Leak Prevention',
      description: 'Advanced jointing techniques and quality materials ensure leak-free installations'
    },
    {
      icon: Timer,
      title: 'Fast-Track Execution',
      description: 'Efficient project schedules with minimal disruption to communities'
    },
    {
      icon: CheckCircle,
      title: 'Long-Term Durability',
      description: 'Quality installation practices ensure decades of reliable water supply'
    }
  ];

  return (
    <section className="py-24 px-6">
      <div className="container mx-auto max-w-7xl">
        {/* Hero Section */}
        <div className={`text-center mb-20 transition-all duration-800 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}>
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-500/20 mb-6">
            <Droplets className="w-10 h-10 text-blue-500" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-slide-up">
            <span className="text-blue-500">Water Pipeline</span> Works
          </h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed animate-slide-up">
            We provide comprehensive execution support for potable and non-potable water pipeline projects, 
            aligned with the regulatory framework of Oman's public utilities and municipalities. Our civil 
            and pipeline installation crews are experienced in managing all aspects of water infrastructure works.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          {/* Overview */}
          <div className="glass-card">
            <h2 className="text-4xl font-bold text-white mb-6">Our Commitment</h2>
            <p className="text-lg text-white/80 leading-relaxed mb-6">
              We deliver water pipeline works with an emphasis on leak prevention, long-term durability, 
              and fast-track execution schedules.
            </p>
            <p className="text-lg text-white/80 leading-relaxed">
              All projects maintain minimal disruption to surrounding environments and communities, 
              while ensuring full compliance with municipal and regulatory standards.
            </p>
          </div>

          {/* Key Advantages */}
          <div className="glass-card">
            <h2 className="text-4xl font-bold text-white mb-6">Project Benefits</h2>
            <div className="space-y-6">
              {advantages.map((advantage, index) => {
                const Icon = advantage.icon;
                return (
                  <div key={index} className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-blue-500/20">
                      <Icon className="w-6 h-6 text-blue-500" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-white mb-2">{advantage.title}</h4>
                      <p className="text-white/70 leading-relaxed">{advantage.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            Scope of Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div key={index} className="glass-card group hover:scale-105 transition-transform duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-lg bg-blue-500/20 group-hover:bg-blue-500/30 transition-colors duration-300">
                      <Icon className="w-6 h-6 text-blue-500" />
                    </div>
                    <h3 className="text-lg font-bold text-white">{service.title}</h3>
                  </div>
                  <p className="text-white/70 leading-relaxed">{service.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pipe Types */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            Pipeline Materials We Install
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pipeTypes.map((pipe, index) => (
              <div key={index} className="glass-card text-center">
                <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-4">
                  <Wrench className="w-8 h-8 text-blue-500" />
                </div>
                <h3 className={`text-3xl font-bold mb-2 ${pipe.color}`}>{pipe.name}</h3>
                <p className="text-white/80 mb-4">{pipe.fullName}</p>
                <ul className="space-y-2">
                  {pipe.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center justify-center gap-2 text-white/70">
                      <CheckCircle className="w-4 h-4 text-blue-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Project Process */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            Installation Process
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            <div className="glass-card text-center">
              <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-500">1</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Survey</h3>
              <p className="text-white/70 text-sm">Route planning and site assessment</p>
            </div>
            <div className="glass-card text-center">
              <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-500">2</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Excavation</h3>
              <p className="text-white/70 text-sm">Trenching and bedding preparation</p>
            </div>
            <div className="glass-card text-center">
              <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-500">3</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Installation</h3>
              <p className="text-white/70 text-sm">Pipe laying and jointing</p>
            </div>
            <div className="glass-card text-center">
              <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-500">4</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Testing</h3>
              <p className="text-white/70 text-sm">Pressure testing and quality assurance</p>
            </div>
            <div className="glass-card text-center">
              <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-500">5</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Completion</h3>
              <p className="text-white/70 text-sm">Site restoration and handover</p>
            </div>
          </div>
        </div>

        {/* Testing & Quality */}
        <div className="mb-20">
          <div className="glass-card">
            <div className="text-center mb-8">
              <TestTube className="w-16 h-16 text-blue-500 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-white">Quality Assurance & Testing</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-bold text-white mb-4">Testing Procedures</h4>
                <ul className="space-y-2 text-white/80">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-500" />
                    Hydrostatic pressure testing to 1.5x operating pressure
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-500" />
                    Joint integrity testing and leak detection
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-500" />
                    Flow rate and pressure verification
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-500" />
                    Water quality testing and certification
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-xl font-bold text-white mb-4">Documentation</h4>
                <ul className="space-y-2 text-white/80">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-500" />
                    Complete as-built drawings
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-500" />
                    Material certification and test reports
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-500" />
                    Operation and maintenance manuals
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-500" />
                    Warranty and guarantee certificates
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="glass-card">
            <h3 className="text-4xl font-bold text-white mb-6">
              Ready to Secure Your Water Infrastructure?
            </h3>
            <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed">
              Partner with Oman's trusted water pipeline specialists. From potable water systems to 
              industrial pipelines, we deliver reliable infrastructure that serves communities for decades.
            </p>
            <div className="flex justify-center">
              <Link 
                to="/contact"
                className="glass-button text-lg bg-gradient-to-r from-blue-500 to-cyan-500 hover:scale-105 inline-flex items-center gap-3"
              >
                <Droplets className="w-5 h-5" />
                Start Your Water Pipeline Project
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WaterPipelineSection;