import { useState, useEffect, useRef } from 'react';
import { Cable, CheckCircle, Users, Shield } from 'lucide-react';

const StatsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState({ fiber: 0, projects: 0, team: 0, compliance: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);

  const stats = [
    { icon: Cable, value: 7000, suffix: '+', label: 'Meters of Fiber Laid', color: 'text-primary' },
    { icon: CheckCircle, value: 150, suffix: '+', label: 'Successful Projects Completed', color: 'text-accent' },
    { icon: Users, value: 25, suffix: '+', label: 'Skilled Technicians and Engineers', color: 'text-primary' },
    { icon: Shield, value: 100, suffix: '%', label: "Compliance with Oman's Safety Norms", color: 'text-accent' }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          animateCounters();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  const animateCounters = () => {
    const duration = 2000;
    const steps = 60;
    const stepTime = duration / steps;

    stats.forEach((stat, index) => {
      let currentValue = 0;
      const increment = stat.value / steps;
      
      const timer = setInterval(() => {
        currentValue += increment;
        
        setCounters(prev => ({
          ...prev,
          [['fiber', 'projects', 'team', 'compliance'][index]]: Math.min(Math.floor(currentValue), stat.value)
        }));

        if (currentValue >= stat.value) {
          clearInterval(timer);
        }
      }, stepTime);
    });
  };

  return (
    <section ref={sectionRef} className="py-24 px-6">
      <div className="container mx-auto">
        {/* Section Title */}
        <div className={`text-center mb-16 transition-all duration-800 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our Impact in <span className="text-primary">Numbers</span>
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Delivering measurable results across Oman's infrastructure landscape
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const counterKeys = ['fiber', 'projects', 'team', 'compliance'] as const;
            const currentValue = counters[counterKeys[index]];
            
            return (
              <div
                key={stat.label}
                className={`glass-card text-center group hover:scale-105 transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className={`w-16 h-16 mx-auto mb-6 ${stat.color} flex items-center justify-center`}>
                  <Icon className="w-8 h-8" />
                </div>
                
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {currentValue.toLocaleString()}{stat.suffix}
                </div>
                
                <p className="text-white/80 text-lg leading-relaxed">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;