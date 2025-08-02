import { useState, useEffect, useRef } from 'react';

const ClientLogos = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const clients = [
    { name: 'Omantel', logo: 'OMANTEL' },
    { name: 'OQ', logo: 'OQ' },
    { name: 'PDO', logo: 'PDO' },
    { name: 'Nama', logo: 'NAMA' },
    { name: 'Haya Water', logo: 'HAYA' },
    { name: 'OCCI', logo: 'OCCI' }
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
    <section ref={sectionRef} className="py-24 px-6">
      <div className="container mx-auto">
        {/* Section Title */}
        <div className={`text-center mb-16 transition-all duration-800 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Trusted By <span className="text-primary">Leading Organizations</span>
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Building partnerships with Oman's most respected companies
          </p>
        </div>

        {/* Logos Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center max-w-6xl mx-auto">
          {clients.map((client, index) => (
            <div
              key={client.name}
              className={`glass-card p-8 h-32 flex items-center justify-center hover:scale-110 hover:bg-white/20 cursor-pointer group transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Logo Placeholder - Using Text for Demo */}
              <div className="text-white/80 group-hover:text-primary font-bold text-lg text-center transition-colors duration-300">
                {client.logo}
              </div>
              
              {/* Hover Glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
            </div>
          ))}
        </div>

        {/* Animated Carousel for Mobile */}
        <div className="md:hidden mt-8">
          <div className="flex animate-pulse text-center">
            <p className="text-white/60 text-sm">
              Swipe to see all our partners
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;