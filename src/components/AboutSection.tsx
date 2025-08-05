import { useState, useEffect } from 'react';
import { Building2, Target, Eye, CheckCircle, Users, Award, Zap, Shield } from 'lucide-react';

const AboutSection = () => {
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
      title: 'Fiber Optic Excellence',
      description: 'Advanced cable laying, jointing, and splicing with precision testing and certification'
    },
    {
      icon: Building2,
      title: 'Civil Infrastructure',
      description: 'Trenching, ducting, chamber installations with full compliance to Omani standards'
    },
    {
      icon: Shield,
      title: 'Pipeline Solutions',
      description: 'Turnkey water and oil & gas pipeline projects with safety-first approach'
    },
    {
      icon: Award,
      title: 'Regulatory Compliance',
      description: 'Deep understanding of Omani regulatory frameworks and ministry guidelines'
    }
  ];

  const values = [
    {
      icon: CheckCircle,
      title: 'Technical Excellence',
      description: 'Execute technically sound projects that meet Omani standards and client objectives'
    },
    {
      icon: Users,
      title: 'Continuous Improvement',
      description: 'Embrace innovation through training, strategic planning, and process enhancement'
    },
    {
      icon: Building2,
      title: 'Partnership Excellence',
      description: 'Foster long-term relationships through integrity, transparency, and delivery excellence'
    }
  ];

  return (
    <section className="py-24 px-6">
      <div className="container mx-auto max-w-7xl">
        {/* Hero Section */}
        <div className={`text-center mb-20 transition-all duration-800 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-slide-up">
            About <span className="text-primary">Grand Technical Resources</span> LLC
          </h1>
          <p className="text-2xl md:text-3xl text-primary font-semibold mb-8 animate-slide-up">
            Enabling Tomorrow's Infrastructure. Today.
          </p>
          <p className="text-xl text-white/80 max-w-4xl mx-auto leading-relaxed animate-slide-up">
            At Grand Technical Resources LLC, we are committed to building the infrastructure that drives 
            Oman's growth. Based in the Sultanate of Oman, we specialize in telecom, civil, water pipeline, 
            and oil & gas works—executed with safety, compliance, and technical precision at the core.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          {/* Our Story */}
          <div className="glass-card">
            <h2 className="text-4xl font-bold text-white mb-6">Our Expertise</h2>
            <p className="text-lg text-white/80 leading-relaxed mb-6">
              From fiber optic cable laying and jointing to trenching, ducting, chamber installations, 
              and turnkey pipeline solutions, our team brings unmatched field expertise and a hands-on 
              approach to every project.
            </p>
            <p className="text-lg text-white/80 leading-relaxed mb-6">
              Backed by a strong safety culture and deep understanding of Omani regulatory frameworks, 
              we consistently deliver results that meet ministry guidelines and exceed client expectations.
            </p>
            <p className="text-lg text-white/80 leading-relaxed">
              What sets us apart is our ability to integrate local knowledge, technical skill, and 
              process discipline to deliver sustainable infrastructure solutions across sectors.
            </p>
          </div>

          {/* Vision & Mission */}
          <div className="space-y-8">
            {/* Vision */}
            <div className="glass-card">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-lg bg-primary/20">
                  <Eye className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-3xl font-bold text-white">Vision Statement</h2>
              </div>
              <p className="text-lg text-white/80 leading-relaxed">
                To be Oman's most dependable partner for high-quality, safe, and efficient infrastructure 
                solutions across telecom, utility, and energy sectors.
              </p>
            </div>

            {/* Mission */}
            <div className="glass-card">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-lg bg-accent/20">
                  <Target className="w-8 h-8 text-accent" />
                </div>
                <h2 className="text-3xl font-bold text-white">Mission Statement</h2>
              </div>
              <div className="space-y-4">
                {values.map((value, index) => {
                  const Icon = value.icon;
                  return (
                    <div key={index} className="flex items-start gap-4">
                      <div className="p-2 rounded-lg bg-white/10 mt-1">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-1">{value.title}</h4>
                        <p className="text-white/70 text-sm leading-relaxed">{value.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Core Capabilities */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            Core Capabilities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {capabilities.map((capability, index) => {
              const Icon = capability.icon;
              return (
                <div key={index} className="glass-card text-center group hover:scale-105 transition-transform duration-300">
                  <div className="p-4 rounded-full bg-primary/20 inline-flex mb-4 group-hover:bg-primary/30 transition-colors duration-300">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{capability.title}</h3>
                  <p className="text-white/70 leading-relaxed">{capability.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Company Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          <div className="glass-card text-center">
            <div className="text-4xl font-bold text-primary mb-2">15+</div>
            <div className="text-white/80">Years Experience</div>
          </div>
          <div className="glass-card text-center">
            <div className="text-4xl font-bold text-primary mb-2">150+</div>
            <div className="text-white/80">Projects Completed</div>
          </div>
          <div className="glass-card text-center">
            <div className="text-4xl font-bold text-primary mb-2">100%</div>
            <div className="text-white/80">Safety Compliance</div>
          </div>
          <div className="glass-card text-center">
            <div className="text-4xl font-bold text-primary mb-2">24/7</div>
            <div className="text-white/80">Support Available</div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="glass-card">
            <h3 className="text-4xl font-bold text-white mb-6">
              Ready to Build the Future?
            </h3>
            <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed">
              Partner with Oman's leading infrastructure specialists. From concept to completion, 
              we deliver excellence at every step of your project journey.
            </p>
            <div className="flex justify-center">
              <a 
                href="/contact"
                className="glass-button text-lg bg-gradient-to-r from-primary to-accent hover:scale-105 inline-flex items-center gap-3"
              >
                <Building2 className="w-5 h-5" />
                Start Your Project
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;