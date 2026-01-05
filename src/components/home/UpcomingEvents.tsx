import { Calendar, MapPin, Clock } from "lucide-react";

const upcomingEvents = [
  {
    id: 1,
    title: "Catacombs II",
    date: "June 27, 2025",
    time: "19:30",
    venue: "The Sound House",
    location: "Dublin",
    ticketUrl: "https://www.eventbrite.ie/o/catacombs-95803283123",
  },
  {
    id: 2,
    title: "Catacombs: Bonus Show",
    date: "September 13, 2025",
    time: "17:30",
    venue: "The Racket Space",
    location: "Dublin 9",
    ticketUrl: "https://www.eventbrite.ie/e/catacombs-bonus-show-tickets-1625302456399",
    isAllAges: true,
  },
];

const UpcomingEvents = () => {
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
          {upcomingEvents.map((event, index) => (
            <article
              key={event.id}
              className="group bg-card border border-border hover:border-primary/50 p-6 md:p-8 transition-all duration-300 animate-fade-in-up opacity-0"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="font-display text-xl md:text-2xl tracking-wide uppercase">
                      {event.title}
                    </h3>
                    {event.isAllAges && (
                      <span className="px-2 py-1 text-xs tracking-wide uppercase bg-primary/20 text-primary border border-primary/30">
                        16+
                      </span>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={14} />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={14} />
                      <span>{event.venue}, {event.location}</span>
                    </div>
                  </div>
                </div>

                <a
                  href={event.ticketUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground text-sm tracking-widest uppercase hover:bg-primary/90 transition-colors group-hover:glow"
                >
                  Tickets
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;
