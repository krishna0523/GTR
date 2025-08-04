import { Fuel, Shield, HardHat, FileCheck, MapPin, Settings, AlertTriangle, CheckCircle } from 'lucide-react';

const OilGasSection = () => {
  const services = [
    {
      icon: Fuel,
      title: 'Trenching & Utility Crossings in Oilfields',
      description: 'Specialized excavation services in oil and gas operational areas'
    },
    {
      icon: Settings,
      title: 'Cable Duct Installation in Pipeline Corridors',
      description: 'Professional duct installation along existing pipeline infrastructure'
    },
    {
      icon: Shield,
      title: 'Licensed Excavation within PDO ROWs',
      description: 'Authorized excavation work within Petroleum Development Oman rights-of-way'
    },
    {
      icon: MapPin,
      title: 'Backfilling & Restoration to PDO Standards',
      description: 'Complete site restoration meeting strict PDO specifications'
    },
    {
      icon: FileCheck,
      title: 'Coordination with Third-Party Custodians',
      description: 'Seamless coordination with asset owners and regulatory bodies'
    }
  ];

  const certifications = [
    {
      icon: HardHat,
      title: 'Trained Personnel',
      description: 'Teams trained and authorized for high-risk regulated zones'
    },
    {
      icon: Shield,
      title: 'PDO Compliance',
      description: 'Full compliance with PDO operational standards and procedures'
    },
    {
      icon: AlertTriangle,
      title: 'HSE Standards',
      description: 'Strict adherence to Health, Safety, and Environmental mandates'
    },
    {
      icon: CheckCircle,
      title: 'Asset Protection',
      description: 'Comprehensive protection of underground and overhead assets'
    }
  ];

  const operators = [
    { name: 'PDO', fullName: 'Petroleum Development Oman', color: 'text-primary' },
    { name: 'OQ', fullName: 'OQ (Oman Oil & Gas)', color: 'text-accent' },
    { name: 'ORPIC', fullName: 'Oman Refineries and Petrochemicals', color: 'text-secondary' }
  ];

  return (
    <section className="py-24 px-6">
      <div className="container mx-auto max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-orange-500/20 mb-6">
            <Fuel className="w-10 h-10 text-orange-500" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-slide-up">
            <span className="text-orange-500">Oil & Gas</span> Utility Works
          </h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed animate-slide-up">
            Working in Oil & Gas Right-of-Way (ROW) zones demands a high level of compliance, safety, 
            and technical rigor. At Grand Technical Resources, our teams are trained and authorized 
            to operate in high-risk and regulated zones.
          </p>
        </div>

        {/* Authorized Operators */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            Authorized to Work With
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {operators.map((operator, index) => (
              <div key={index} className="glass-card text-center">
                <div className="w-16 h-16 rounded-full bg-orange-500/20 flex items-center justify-center mx-auto mb-4">
                  <Fuel className="w-8 h-8 text-orange-500" />
                </div>
                <h3 className={`text-3xl font-bold mb-2 ${operator.color}`}>{operator.name}</h3>
                <p className="text-white/80">{operator.fullName}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          {/* Overview */}
          <div className="glass-card">
            <h2 className="text-4xl font-bold text-white mb-6">Compliance & Safety</h2>
            <p className="text-lg text-white/80 leading-relaxed mb-6">
              All works are carried out in compliance with Oil & Gas sector standards, ensuring that 
              underground and overhead assets are protected.
            </p>
            <p className="text-lg text-white/80 leading-relaxed">
              Environmental and HSE mandates are followed throughout execution, with continuous 
              monitoring and strict safety protocols in place.
            </p>
          </div>

          {/* Certifications */}
          <div className="glass-card">
            <h2 className="text-4xl font-bold text-white mb-6">Our Qualifications</h2>
            <div className="space-y-6">
              {certifications.map((cert, index) => {
                const Icon = cert.icon;
                return (
                  <div key={index} className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-orange-500/20">
                      <Icon className="w-6 h-6 text-orange-500" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-white mb-2">{cert.title}</h4>
                      <p className="text-white/70 leading-relaxed">{cert.description}</p>
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
            Oil & Gas Support Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div key={index} className="glass-card group hover:scale-105 transition-transform duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-lg bg-orange-500/20 group-hover:bg-orange-500/30 transition-colors duration-300">
                      <Icon className="w-6 h-6 text-orange-500" />
                    </div>
                    <h3 className="text-lg font-bold text-white">{service.title}</h3>
                  </div>
                  <p className="text-white/70 leading-relaxed">{service.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Safety Protocols */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            Safety & Environmental Protocols
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-card">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <HardHat className="w-6 h-6 text-orange-500" />
                Safety Measures
              </h3>
              <ul className="space-y-3 text-white/80">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-orange-500" />
                  Continuous safety monitoring and risk assessment
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-orange-500" />
                  Specialized PPE for hazardous environments
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-orange-500" />
                  Emergency response procedures and equipment
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-orange-500" />
                  Regular safety training and certification updates
                </li>
              </ul>
            </div>
            <div className="glass-card">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Shield className="w-6 h-6 text-orange-500" />
                Environmental Protection
              </h3>
              <ul className="space-y-3 text-white/80">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-orange-500" />
                  Spill prevention and containment measures
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-orange-500" />
                  Soil and groundwater protection protocols
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-orange-500" />
                  Waste management and disposal procedures
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-orange-500" />
                  Environmental impact monitoring and reporting
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Risk Zones */}
        <div className="mb-20">
          <div className="glass-card">
            <div className="text-center mb-8">
              <AlertTriangle className="w-16 h-16 text-orange-500 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-white">High-Risk Zone Authorization</h3>
            </div>
            <p className="text-lg text-white/80 text-center leading-relaxed mb-6">
              Our teams hold special authorization to work in high-risk and regulated zones, 
              including areas controlled by major oil and gas operators in Oman.
            </p>
            <div className="flex justify-center">
              <div className="inline-flex items-center gap-2 bg-orange-500/20 px-6 py-3 rounded-full">
                <Shield className="w-5 h-5 text-orange-500" />
                <span className="text-white font-semibold">Certified for Hazardous Operations</span>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="glass-card">
            <h3 className="text-4xl font-bold text-white mb-6">
              Need Oil & Gas Infrastructure Support?
            </h3>
            <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed">
              Trust our certified team for your oil and gas utility projects. We bring the expertise, 
              safety protocols, and regulatory compliance needed for successful execution in high-risk environments.
            </p>
            <div className="flex justify-center">
              <a 
                href="/contact"
                className="glass-button text-lg bg-gradient-to-r from-orange-500 to-red-500 hover:scale-105 inline-flex items-center gap-3"
              >
                <Fuel className="w-5 h-5" />
                Start Your Oil & Gas Project
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OilGasSection;