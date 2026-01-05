import Layout from "@/components/layout/Layout";
import { Instagram, Mail } from "lucide-react";

const AboutPage = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h1 className="font-display text-4xl md:text-5xl tracking-widest uppercase text-center mb-4 animate-fade-in opacity-0">
              About
            </h1>
            <div className="w-24 h-px bg-primary mx-auto mb-12" />

            <div className="space-y-8 text-muted-foreground animate-fade-in opacity-0" style={{ animationDelay: "0.2s" }}>
              <p className="text-lg leading-relaxed">
                Catacombs is more than an event—it's a movement. Ireland's first platform dedicated 
                to underground rap, hyperpop, and witch house, born from a need to give emerging 
                Irish artists the stage they deserve.
              </p>
              
              <p className="text-lg leading-relaxed">
                Since our explosive debut in April 2024, we've been building something different. 
                Almost everyone wears black, the air hangs thick with atmosphere, and beyond the 
                packed crowds and mosh pits, Ireland's finest underground talent takes the stage.
              </p>

              <p className="text-lg leading-relaxed">
                What started at The Sound House has grown into a movement. Our shows range from 
                18+ events to all-ages shows at The Racket Space—because the underground has no 
                age limit. The scene has been begging for a return, and we keep delivering.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-6">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="font-display text-2xl tracking-widest uppercase mb-8 animate-fade-in opacity-0">
              Get In Touch
            </h2>

            <div className="space-y-6 animate-fade-in opacity-0" style={{ animationDelay: "0.2s" }}>
              <p className="text-muted-foreground">
                Want to perform? Collaborate? Just want to chat? Hit us up.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="https://www.instagram.com/catacombs_irish_underground/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-display tracking-widest uppercase hover:bg-primary/90 transition-colors glow"
                >
                  <Instagram size={18} />
                  Instagram
                </a>
                <a
                  href="mailto:contact@catacombs.ie"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-foreground/30 text-foreground font-display tracking-widest uppercase hover:border-primary hover:text-primary transition-colors"
                >
                  <Mail size={18} />
                  Email
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <blockquote className="font-display text-2xl md:text-3xl tracking-wide uppercase leading-relaxed text-primary animate-fade-in opacity-0">
              "The scene has been begging for a return, and things are only getting better."
            </blockquote>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;
