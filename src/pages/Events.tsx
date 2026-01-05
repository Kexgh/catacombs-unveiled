import { useState } from "react";
import Layout from "@/components/layout/Layout";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import { X } from "lucide-react";

const pastEvents = [
  {
    id: 1,
    title: "Catacombs I",
    date: "April 2024",
    venue: "The Sound House",
    description: "The inaugural show that started it all. Ireland's first witch house and underground rap event.",
  },
  {
    id: 2,
    title: "Catacombs II",
    date: "June 2025",
    venue: "The Sound House",
    description: "The explosive return. The scene was begging for more, and we delivered.",
  },
];

const galleryImages = [
  { id: 1, src: gallery1, alt: "Catacombs crowd with hands up under red lights" },
  { id: 2, src: gallery2, alt: "DJ performing at Catacombs event" },
  { id: 3, src: gallery3, alt: "Live performance with Irish flag backdrop" },
];

const Events = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <Layout>
      {/* Hero */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="font-display text-4xl md:text-5xl tracking-widest uppercase mb-4 animate-fade-in opacity-0">
              Events
            </h1>
            <div className="w-24 h-px bg-primary mx-auto mb-6" />
            <p className="text-muted-foreground animate-fade-in opacity-0" style={{ animationDelay: "0.2s" }}>
              From our first show to the latest, every Catacombs event brings Ireland's underground to life.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-6">
          <h2 className="font-display text-2xl tracking-widest uppercase text-center mb-12">
            Gallery
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {galleryImages.map((image, index) => (
              <button
                key={image.id}
                onClick={() => setSelectedImage(image.src)}
                className="group relative aspect-square overflow-hidden animate-fade-in-up opacity-0"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-background/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-sm uppercase tracking-widest">View</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Past Events */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <h2 className="font-display text-2xl tracking-widest uppercase text-center mb-12">
            Past Events
          </h2>

          <div className="max-w-2xl mx-auto space-y-8">
            {pastEvents.map((event, index) => (
              <article
                key={event.id}
                className="border-l-2 border-primary/50 pl-6 animate-fade-in-up opacity-0"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="text-sm text-muted-foreground mb-2">
                  {event.date} • {event.venue}
                </div>
                <h3 className="font-display text-xl tracking-wide uppercase mb-2">
                  {event.title}
                </h3>
                <p className="text-muted-foreground">
                  {event.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-background/95 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-6 right-6 text-foreground hover:text-primary transition-colors"
            onClick={() => setSelectedImage(null)}
            aria-label="Close"
          >
            <X size={32} />
          </button>
          <img
            src={selectedImage}
            alt="Gallery image"
            className="max-w-full max-h-[80vh] object-contain animate-scale-in"
          />
        </div>
      )}
    </Layout>
  );
};

export default Events;
