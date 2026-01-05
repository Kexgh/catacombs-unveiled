const About = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl tracking-widest uppercase mb-4 animate-fade-in opacity-0">
            The Underground Rises
          </h2>
          <div className="w-24 h-px bg-primary mx-auto mb-8" />
          
          <div className="space-y-6 text-muted-foreground animate-fade-in opacity-0" style={{ animationDelay: "0.2s" }}>
            <p className="text-lg leading-relaxed">
              Catacombs is Ireland's first event focusing on underground rap, hyperpop, and witch house. 
              Born in April 2024, we've created a space where Ireland's finest underground artists 
              take the stage.
            </p>
            <p className="text-lg leading-relaxed">
              From explosive shows at The Sound House to all-ages events that welcome the next generation, 
              we're building something different. The scene has been begging for a return, 
              and things are only getting better.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-8 animate-fade-in opacity-0" style={{ animationDelay: "0.4s" }}>
            <div className="text-center">
              <div className="font-display text-3xl md:text-4xl text-primary mb-2">6+</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wide">Shows</div>
            </div>
            <div className="text-center">
              <div className="font-display text-3xl md:text-4xl text-primary mb-2">20+</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wide">Artists</div>
            </div>
            <div className="text-center">
              <div className="font-display text-3xl md:text-4xl text-primary mb-2">1K+</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wide">Attendees</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
