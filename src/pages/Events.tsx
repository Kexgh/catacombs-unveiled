import { Calendar, MapPin, Ticket } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type EventItem = {
  title: string;
  date: string;
  venue: string;
  ticketUrl?: string;
  poster?: string;
  hidden?: boolean;
};

type EventsJson = { events?: EventItem[] };

type GalleryPhoto = { image: string; caption?: string };
type GalleryJson = { photos?: GalleryPhoto[] };

const Events = () => {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);

  useEffect(() => {
    fetch("/content/events.json", { cache: "no-store" })
      .then((r) => r.json())
      .then((data: EventsJson) => setEvents(data.events ?? []))
      .catch(() => setEvents([]));

    fetch("/content/gallery.json", { cache: "no-store" })
      .then((r) => r.json())
      .then((data: GalleryJson) => setPhotos(data.photos ?? []))
      .catch(() => setPhotos([]));
  }, []);

  const pastEvents = useMemo(() => {
    const now = new Date();
    return (events ?? [])
      .filter((e) => !e.hidden)
      .filter((e) => {
        const d = new Date(e.date);
        return !isNaN(d.getTime()) && d < now;
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [events]);

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return isNaN(d.getTime()) ? iso : d.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="font-display text-4xl md:text-5xl tracking-widest uppercase mb-4 animate-fade-in opacity-0">
            Events
          </h1>
          <div className="w-24 h-px bg-primary mx-auto mb-8" />
          <p
            className="text-muted-foreground max-w-2xl mx-auto animate-fade-in opacity-0"
            style={{ animationDelay: "0.2s" }}
          >
            Past shows, moments, and memories from the underground.
          </p>
        </div>

        {/* Past Events */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-2xl md:text-3xl tracking-widest uppercase">
              Past Events
            </h2>
            <div className="w-16 h-px bg-primary" />
          </div>

          <div className="grid gap-6 max-w-3xl mx-auto">
            {pastEvents.map((event, index) => (
              <article
                key={`${event.title}-${event.date}-${index}`}
                className="bg-card border border-border hover:border-primary/50 p-6 md:p-8 transition-all duration-300 animate-fade-in-up opacity-0"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  <div className="flex-1">
                    <h3 className="font-display text-xl md:text-2xl tracking-wide uppercase mb-3">
                      {event.title}
                    </h3>

                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} />
                        <span>{formatDate(event.date)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={14} />
                        <span>{event.venue}</span>
                      </div>
                    </div>
                  </div>

                  {event.ticketUrl ? (
                    <a
                      href={event.ticketUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-secondary hover:bg-secondary/80 text-sm tracking-widest uppercase transition-colors"
                    >
                      <Ticket size={14} />
                      Tickets
                    </a>
                  ) : null}
                </div>
              </article>
            ))}

            {pastEvents.length === 0 ? (
              <div className="text-center text-muted-foreground">
                No past events yet (or none published). Add events in <span className="text-primary">/admin</span>.
              </div>
            ) : null}
          </div>
        </section>

        {/* Gallery */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-2xl md:text-3xl tracking-widest uppercase">
              Gallery
            </h2>
            <div className="w-16 h-px bg-primary" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {photos.map((img, index) => (
              <div
                key={`${img.image}-${index}`}
                className="group overflow-hidden border border-border bg-card animate-fade-in-up opacity-0"
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={img.image}
                    alt={img.caption ?? `Gallery image ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            ))}
          </div>

          {photos.length === 0 ? (
            <div className="text-center text-muted-foreground mt-8">
              No gallery photos yet. Add them in <span className="text-primary">/admin</span>.
            </div>
          ) : null}
        </section>
      </div>
    </div>
  );
};

export default Events;
