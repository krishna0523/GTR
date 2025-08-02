import { useState, useEffect, useRef } from 'react';
import { Radio, Building2, Fuel, Droplets } from 'lucide-react';

const ServicesSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const services = [
    {
      icon: Radio,
      title: 'Fiber Optic Cable Laying',
      description: 'Advanced fiber optic installation and maintenance services for telecommunications infrastructure.',
      gradient: 'from-primary to-blue-500'
    },
    {
      icon: Building2,
      title: 'Civil Works & Excavation',
      description: 'Comprehensive civil engineering solutions including excavation, construction, and site preparation.',
      gradient: 'from-accent to-yellow-500'
    },
    {
      icon: Fuel,
      title: 'Oil & Gas Infrastructure',
      description: 'Specialized pipeline installation and maintenance for oil and gas sector operations.',
      gradient: 'from-orange-500 to-red-500'
    },
    {
      icon: Droplets,
      title: 'Water Pipeline Projects',
      description: 'Expert water pipeline installation and maintenance ensuring reliable water distribution systems.',
      gradient: 'from-blue-500 to-cyan-500'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="py-24 px-6">
      <div className="container mx-auto">
        {/* Section Title */}
        <div className={`text-center mb-16 transition-all duration-800 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our Expertise in <span className="text-primary">Action</span>
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Comprehensive infrastructure solutions tailored to Oman's growing needs
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => {
            const Icon = service.icon;
            
            return (
              <div
                key={service.title}
                className={`glass-card group hover:scale-105 cursor-pointer relative overflow-hidden transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                {/* Gradient Background Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`w-16 h-16 mb-6 text-primary flex items-center justify-center bg-gradient-to-br ${service.gradient} p-4 rounded-2xl shadow-lg`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-white/80 leading-relaxed">
                    {service.description}
                  </p>
                  
                  {/* Hover Glow Effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;