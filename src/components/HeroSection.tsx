const HeroSection = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative px-6">
      <div className="container mx-auto text-center">
        <div>
          {/* Main Headline with Typing Animation */}
          <h1 className="typing-headline text-5xl md:text-7xl font-bold text-white mb-6 leading-tight" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>
            Empowering Oman's Digital Infrastructure
          </h1>
          
          {/* Subheadline with Fade-in */}
          <p className="subheadline-fade text-xl md:text-2xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed">
            Delivering Excellence in Fiber Optics, Civil Engineering & Pipeline Solutions
          </p>
          
          {/* CTA Buttons with Staggered Animation */}
          <div className="cta-buttons-fade flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a 
              href="#contact"
              className="glass-button text-lg hover:shadow-primary/50 group relative overflow-hidden"
            >
              <span className="relative z-10">Get a Quote</span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </a>
            
            <a 
              href="#services"
              className="glass-button text-lg border-2 border-primary hover:bg-primary/20 group"
            >
              <span className="relative z-10">Explore Our Services</span>
            </a>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 cta-buttons-fade">
          <div className="flex flex-col items-center text-white/80">
            <span className="text-sm mb-2 font-medium">Scroll to control video</span>
            <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center relative">
              <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-bounce"></div>
            </div>
            <div className="mt-2 text-xs text-white/60">
              Cinematic experience awaits
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;