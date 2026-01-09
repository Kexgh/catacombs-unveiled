import { Calendar, MapPin, Clock } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type EventItem = {
  title: string;
  date: string; // ISO string from CMS datetime widget
  venue: string;
  ticketUrl?: string;
  poster?: string;
  hidden?: boolean;
};

type EventsJson = { events?: EventItem[] };

const UpcomingEvents = () => {
  const [events, setEvents] = useState<EventItem[]>([]);

  useEffect(() => {
    fetch("/content/events.json", { cache: "no-store" })
      .then((r) => r.json())
      .then((data: EventsJson) => setEvents(data.events ?? []))
      .catch(() => setEvents([]));
  }, []);

  const upcoming = useMemo(() => {
    const now = new Date();

    return (events ?? [])
      .filter((e) => !e.hidden)
      .filter((e) => {
        const d = new Date(e.date);
        return !isNaN(d.getTime()) && d >= now;
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 3);
  }, [events]);

  // If no upcoming events, show nothing (keeps homepage clean)
  if (upcoming.length === 0) return null;

  return (
    <section className="py-24 bg-secondary">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl tracking-widest uppercase mb-4">
            Upcoming Shows
          </h2>
          <div className="w-24 h-px bg-primary mx-auto" />
        </div>

        <div className="grid gap-6 max-w-3xl mx-auto">
          {upcoming.map((event, index) => {
            const d = new Date(event.date);
            const dateStr = isNaN(d.getTime()) ? event.date : d.toLocaleDateString();
            const timeStr = isNaN(d.getTime())
              ? ""
              : d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

            return (
              <article
                key={`${event.title}-${event.date}-${index}`}
                className="group bg-card border border-border hover:border-primary/50 p-6 md:p-8 transition-all duration-300 animate-fade-in-up opacity-0"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  <div className="flex-1">
                    <h3 className="font-display text-xl md:text-2xl tracking-wide uppercase mb-3">
                      {event.title}
                    </h3>

                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} />
                        <span>{dateStr}</span>
                      </div>

                      {timeStr && (
                        <div className="flex items-center gap-2">
                          <Clock size={14} />
                          <span>{timeStr}</span>
                        </div>
                      )}

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
                      className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground text-sm tracking-widest uppercase hover:bg-primary/90 transition-colors group-hover:glow"
                    >
                      Tickets
                    </a>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;
