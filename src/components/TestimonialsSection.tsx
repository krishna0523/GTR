import { useState, useEffect, useRef } from 'react';
import { Quote, Star } from 'lucide-react';

const TestimonialsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const testimonials = [
    {
      quote: "Grand Technical Resources delivered exceptional fiber optic installation for our telecommunications infrastructure. Their attention to detail and commitment to safety standards exceeded our expectations.",
      author: "Ahmed Al-Rashid",
      position: "Network Infrastructure Manager",
      company: "Omantel",
      rating: 5
    },
    {
      quote: "Professional, reliable, and efficient. GTR completed our water pipeline project ahead of schedule while maintaining the highest quality standards. Outstanding work ethic and technical expertise.",
      author: "Sarah Al-Balushi",
      position: "Project Director",
      company: "Haya Water",
      rating: 5
    },
    {
      quote: "Their oil & gas infrastructure expertise is unmatched in Oman. GTR handled complex pipeline installations with precision and full compliance with safety regulations. Highly recommended.",
      author: "Mohammed Al-Hinai",
      position: "Operations Manager",
      company: "PDO",
      rating: 5
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
    <section ref={sectionRef} className="py-24 px-6">
      <div className="container mx-auto">
        {/* Section Title */}
        <div className={`text-center mb-16 transition-all duration-800 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            What Our <span className="text-primary">Clients Say</span>
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Trusted by leading organizations across Oman's infrastructure sector
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`glass-card hover:scale-105 relative overflow-hidden transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              {/* Quote Icon */}
              <div className="absolute top-4 right-4 text-primary/20">
                <Quote className="w-12 h-12" />
              </div>
              
              {/* Rating Stars */}
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-accent fill-current" />
                ))}
              </div>
              
              {/* Quote */}
              <blockquote className="text-white/90 leading-relaxed mb-6 italic">
                "{testimonial.quote}"
              </blockquote>
              
              {/* Author Info */}
              <div className="border-t border-white/20 pt-4">
                <div className="text-white font-semibold">
                  {testimonial.author}
                </div>
                <div className="text-primary text-sm">
                  {testimonial.position}
                </div>
              </div>
              
              {/* Hover Glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;