import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-background/70" />
      
      {/* Vignette Effect */}
      <div className="absolute inset-0 vignette" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <p className="text-sm md:text-base tracking-[0.3em] uppercase text-muted-foreground mb-4 animate-fade-in opacity-0" style={{ animationDelay: "0.2s" }}>
          Irish Underground
        </p>
        
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl tracking-wider uppercase mb-6 animate-fade-in opacity-0" style={{ animationDelay: "0.4s" }}>
          Catacombs
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-in opacity-0" style={{ animationDelay: "0.6s" }}>
          Ireland's first event focusing on underground rap, hyperpop, and witch house. 
          Giving Irish underground artists a platform to perform.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in opacity-0" style={{ animationDelay: "0.8s" }}>
          <a
            href="https://www.eventbrite.ie/o/catacombs-95803283123"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 bg-primary text-primary-foreground font-display tracking-widest uppercase hover:bg-primary/90 transition-all glow"
          >
            Get Tickets
          </a>
          <a
            href="https://www.instagram.com/catacombs_irish_underground/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 border border-foreground/30 text-foreground font-display tracking-widest uppercase hover:border-primary hover:text-primary transition-colors"
          >
            Follow Us
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-foreground/30 to-transparent" />
      </div>
    </section>
  );
};

export default Hero;
