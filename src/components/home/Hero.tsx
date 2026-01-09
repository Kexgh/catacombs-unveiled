import heroBg from "@/assets/hero-bg.jpg";
import { useEffect, useState } from "react";

type HomeJson = {
  heroTitle?: string;
  heroSubtitle?: string;
};

const Hero = () => {
  const [home, setHome] = useState<HomeJson>({
    heroTitle: "Catacombs",
    heroSubtitle: "Irish Underground",
  });

  useEffect(() => {
    fetch("/content/home.json", { cache: "no-store" })
      .then((r) => r.json())
      .then((data: HomeJson) => {
        setHome({
          heroTitle: data.heroTitle ?? "Catacombs",
          heroSubtitle: data.heroSubtitle ?? "Irish Underground",
        });
      })
      .catch(() => {
        // keep defaults
      });
  }, []);

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
        <p
          className="text-sm md:text-base tracking-[0.3em] uppercase text-foreground/80 mb-4 animate-fade-in opacity-0"
          style={{ animationDelay: "0.2s" }}
        >
          {home.heroSubtitle ?? ""}
        </p>

        <h1
          className="font-display text-5xl md:text-7xl lg:text-8xl tracking-widest uppercase mb-6 animate-fade-in opacity-0"
          style={{ animationDelay: "0.4s" }}
        >
          {home.heroTitle ?? ""}
        </h1>

        {/* Keep the rest of your original Hero layout below this point */}
        {/* If your original file has extra paragraphs/buttons, keep them unchanged */}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-foreground/30 to-transparent" />
      </div>
    </section>
  );
};

export default Hero;
