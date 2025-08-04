import { Construction, Shovel, Layers, Home, MapPin, Shield, CheckCircle, HardHat } from 'lucide-react';

const CivilWorksSection = () => {
  const capabilities = [
    {
      icon: Shovel,
      title: 'Trenching & Excavation (manual/mechanical)',
      description: 'Professional excavation services using both manual and mechanical methods'
    },
    {
      icon: Layers,
      title: 'Sand Bedding, Backfilling & Soil Compaction',
      description: 'Proper foundation preparation and soil stabilization techniques'
    },
    {
      icon: Construction,
      title: 'PVC Pipe Laying & Warning Systems',
      description: 'Complete pipe installation with integrated warning and protection systems'
    },
    {
      icon: Home,
      title: 'Construction of Joint Chambers and Pull Boxes',
      description: 'Professional construction of access chambers and utility boxes'
    },
    {
      icon: MapPin,
      title: 'Marker Post Installation',
      description: 'Strategic placement of identification and warning marker posts'
    },
    {
      icon: Shield,
      title: 'Earthworks for Telecom and Utility Corridors',
      description: 'Comprehensive earthwork solutions for utility infrastructure'
    }
  ];

  const advantages = [
    {
      icon: Shield,
      title: 'Minimal Disruption',
      description: 'Carefully planned execution to minimize impact on public areas and traffic'
    },
    {
      icon: HardHat,
      title: 'Safety Protocols',
      description: 'Strict adherence to safety standards with certified supervisors'
    },
    {
      icon: CheckCircle,
      title: 'Site Restoration',
      description: 'Complete restoration of work zones to original or improved condition'
    }
  ];

  return (
    <section className="py-24 px-6">
      <div className="container mx-auto max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-accent/20 mb-6">
            <Construction className="w-10 h-10 text-accent" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-slide-up">
            <span className="text-accent">Civil</span> Works
          </h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed animate-slide-up">
            Grand Technical Resources brings technical expertise and safety-first execution to a wide range 
            of civil infrastructure projects. From trench excavation to chamber installation and site restoration, 
            our civil team is fully equipped and locally experienced to handle high-volume utility and infrastructure demands.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          {/* Overview */}
          <div className="glass-card">
            <h2 className="text-4xl font-bold text-white mb-6">Our Approach</h2>
            <p className="text-lg text-white/80 leading-relaxed mb-6">
              Our team ensures minimal disruption to public areas, strict adherence to safety protocols, 
              and restoration of work zones to their original state.
            </p>
            <p className="text-lg text-white/80 leading-relaxed">
              All works are performed under the guidance of certified supervisors with necessary local 
              permits in place, ensuring compliance with municipal and regulatory requirements.
            </p>
          </div>

          {/* Key Advantages */}
          <div className="glass-card">
            <h2 className="text-4xl font-bold text-white mb-6">Our Commitment</h2>
            <div className="space-y-6">
              {advantages.map((advantage, index) => {
                const Icon = advantage.icon;
                return (
                  <div key={index} className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-accent/20">
                      <Icon className="w-6 h-6 text-accent" />
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

        {/* Capabilities Grid */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            Services We Undertake
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {capabilities.map((capability, index) => {
              const Icon = capability.icon;
              return (
                <div key={index} className="glass-card group hover:scale-105 transition-transform duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-lg bg-accent/20 group-hover:bg-accent/30 transition-colors duration-300">
                      <Icon className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="text-lg font-bold text-white">{capability.title}</h3>
                  </div>
                  <p className="text-white/70 leading-relaxed">{capability.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Project Phases */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            Project Execution Phases
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="glass-card text-center">
              <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-accent">1</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Site Survey</h3>
              <p className="text-white/70">Comprehensive site analysis and planning</p>
            </div>
            <div className="glass-card text-center">
              <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-accent">2</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Excavation</h3>
              <p className="text-white/70">Professional trenching and earth removal</p>
            </div>
            <div className="glass-card text-center">
              <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-accent">3</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Installation</h3>
              <p className="text-white/70">Utility installation and chamber construction</p>
            </div>
            <div className="glass-card text-center">
              <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-accent">4</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Restoration</h3>
              <p className="text-white/70">Complete site restoration and cleanup</p>
            </div>
          </div>
        </div>

        {/* Equipment & Expertise */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="glass-card">
            <h3 className="text-2xl font-bold text-white mb-4">Equipment & Tools</h3>
            <ul className="space-y-2 text-white/80">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-accent" />
                Excavators and backhoes for mechanical trenching
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-accent" />
                Compaction equipment for soil stabilization
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-accent" />
                Specialized tools for utility installation
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-accent" />
                Safety equipment and protective gear
              </li>
            </ul>
          </div>
          <div className="glass-card">
            <h3 className="text-2xl font-bold text-white mb-4">Certifications & Compliance</h3>
            <ul className="space-y-2 text-white/80">
              <li className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-accent" />
                Certified supervisors and safety officers
              </li>
              <li className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-accent" />
                Municipal permits and regulatory compliance
              </li>
              <li className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-accent" />
                Environmental protection protocols
              </li>
              <li className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-accent" />
                Quality assurance documentation
              </li>
            </ul>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="glass-card">
            <h3 className="text-4xl font-bold text-white mb-6">
              Ready to Start Your Civil Works Project?
            </h3>
            <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed">
              Trust Oman's experienced civil works specialists for your infrastructure needs. 
              From excavation to restoration, we handle every phase with professional expertise.
            </p>
            <div className="flex justify-center">
              <a 
                href="/contact"
                className="glass-button text-lg bg-gradient-to-r from-accent to-primary hover:scale-105 inline-flex items-center gap-3"
              >
                <Construction className="w-5 h-5" />
                Start Your Civil Project
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CivilWorksSection;