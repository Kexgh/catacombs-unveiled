import Layout from "@/components/layout/Layout";
import EventGalleryModal from "@/components/gallery/EventGalleryModal";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Ticket } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type GalleryPhotoNormalized = { image: string; caption?: string };

type EventItem = {
  title: string;
  date: string; // ISO string
  venue: string;
  ticketUrl?: string;
  poster?: string;
  hidden?: boolean;

  // gallery can be MANY shapes depending on CMS config history
  gallery?: unknown;
  galleryPhotos?: unknown;
  photos?: unknown;
};

type EventsJson = { events?: EventItem[] };

function normalizeGallery(event: EventItem): GalleryPhotoNormalized[] {
  const raw =
    (event.gallery as unknown) ??
    (event.galleryPhotos as unknown) ??
    (event.photos as unknown) ??
    [];

  if (!Array.isArray(raw)) return [];

  return raw
    .map((item) => {
      // Case 1: ["/uploads/x.png", ...]
      if (typeof item === "string" && item.trim().length > 0) {
        return { image: item };
      }

      // Case 2: [{ image: "...", caption?: "..." }, ...]
      if (item && typeof item === "object") {
        const anyItem = item as Record<string, unknown>;
        const image =
          (typeof anyItem.image === "string" && (anyItem.image as string)) ||
          (typeof anyItem.url === "string" && (anyItem.url as string)) ||
          (typeof anyItem.src === "string" && (anyItem.src as string)) ||
          "";

        if (!image) return null;

        const caption =
          typeof anyItem.caption === "string"
            ? (anyItem.caption as string)
            : undefined;

        return { image, caption };
      }

      return null;
    })
    .filter((x): x is GalleryPhotoNormalized => Boolean(x));
}

function GalleryPreview({
  photos,
  title,
  onOpen,
}: {
  photos: GalleryPhotoNormalized[];
  title: string;
  onOpen: () => void;
}) {
  const preview = photos.slice(0, 3);
  const remaining = Math.max(0, photos.length - preview.length);

  return (
    <div className="mt-4">
      {/* Desktop: 1 big + 2 stacked */}
      <div className="hidden md:grid grid-cols-3 grid-rows-2 gap-3">
        <button
          type="button"
          onClick={onOpen}
          className="col-span-2 row-span-2 overflow-hidden rounded-lg border border-border bg-card/40 hover:bg-card/60 transition"
          aria-label={`Open full gallery for ${title}`}
        >
          <img
            src={preview[0]?.image}
            alt={`${title} photo 1`}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </button>

        <button
          type="button"
          onClick={onOpen}
          className="overflow-hidden rounded-lg border border-border bg-card/40 hover:bg-card/60 transition"
          aria-label={`Open full gallery for ${title}`}
        >
          <img
            src={preview[1]?.image}
            alt={`${title} photo 2`}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </button>

        <button
          type="button"
          onClick={onOpen}
          className="relative overflow-hidden rounded-lg border border-border bg-card/40 hover:bg-card/60 transition"
          aria-label={`Open full gallery for ${title}`}
        >
          <img
            src={preview[2]?.image}
            alt={`${title} photo 3`}
            loading="lazy"
            className="h-full w-full object-cover"
          />
          {remaining > 0 ? (
            <div className="absolute inset-0 bg-black/55 flex items-center justify-center">
              <span className="text-sm font-medium tracking-wide">
                +{remaining} more
              </span>
            </div>
          ) : null}
        </button>
      </div>

      {/* Mobile: 3 stacked */}
      <div className="md:hidden grid grid-cols-1 gap-3">
        {preview.map((p, i) => (
          <button
            key={`${p.image}-${i}`}
            type="button"
            onClick={onOpen}
            className="overflow-hidden rounded-lg border border-border bg-card/40 hover:bg-card/60 transition"
            aria-label={`Open full gallery for ${title}`}
          >
            <img
              src={p.image}
              alt={`${title} photo ${i + 1}`}
              loading="lazy"
              className="w-full h-56 object-cover"
            />
          </button>
        ))}
      </div>

      <div className="mt-4">
        <Button onClick={onOpen} className="w-full md:w-auto">
          View full gallery ({photos.length}) →
        </Button>
      </div>
    </div>
  );
}

const Events = () => {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [openEventKey, setOpenEventKey] = useState<string | null>(null);

  useEffect(() => {
    fetch("/content/events.json", { cache: "no-store" })
      .then((r) => r.json())
      .then((data: EventsJson) => setEvents(data.events ?? []))
      .catch(() => setEvents([]));
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

  const galleryEvents = useMemo(() => {
    return pastEvents
      .map((e) => ({
        event: e,
        photos: normalizeGallery(e),
      }))
      .filter((x) => x.photos.length > 0);
  }, [pastEvents]);

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return isNaN(d.getTime()) ? iso : d.toLocaleDateString();
  };

  const currentGallery = useMemo(() => {
    if (!openEventKey) return null;
    const found = galleryEvents.find((x) => x.event.title === openEventKey);
    return found ?? null;
  }, [openEventKey, galleryEvents]);

  return (
    <Layout>
      <main className="mx-auto max-w-6xl px-4 py-10">
        <header className="mb-10">
          <h1 className="font-display text-3xl md:text-4xl tracking-tight">
            Events
          </h1>
          <p className="mt-2 text-muted-foreground">
            Past shows, moments, and memories from the underground.
          </p>
        </header>

        {/* Past Events */}
        <section className="mb-12">
          <h2 className="font-display text-xl tracking-wide">Past Events</h2>

          <div className="mt-4 space-y-4">
            {pastEvents.map((event) => (
              <div
                key={`${event.title}-${event.date}`}
                className="rounded-lg border border-border bg-card/40 p-4"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <div>
                    <h3 className="font-display text-lg">{event.title}</h3>
                    <div className="mt-2 flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-muted-foreground">
                      <span className="inline-flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {formatDate(event.date)}
                      </span>
                      <span className="hidden sm:inline">•</span>
                      <span className="inline-flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {event.venue}
                      </span>
                    </div>
                  </div>

                  {event.ticketUrl ? (
                    <a
                      href={event.ticketUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                    >
                      <Ticket className="h-4 w-4" />
                      Tickets
                    </a>
                  ) : null}
                </div>
              </div>
            ))}

            {pastEvents.length === 0 ? (
              <p className="text-muted-foreground">
                No past events yet (or none published). Add events in /admin.
              </p>
            ) : null}
          </div>
        </section>

        {/* Gallery */}
        <section>
          <h2 className="font-display text-xl tracking-wide">Gallery</h2>

          {galleryEvents.length === 0 ? (
            <p className="mt-4 text-muted-foreground">
              No gallery photos yet. Add them to a past event in /admin.
            </p>
          ) : (
            <div className="mt-6 space-y-10">
              {galleryEvents.map(({ event, photos }) => {
                const key = event.title; // stable enough for your CMS use
                return (
                  <div
                    key={`${event.title}-${event.date}`}
                    className="rounded-lg border border-border bg-card/30 p-4 md:p-6"
                  >
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-2">
                      <div>
                        <h3 className="font-display text-lg md:text-xl">
                          {event.title}
                        </h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {formatDate(event.date)} • {event.venue}
                        </p>
                      </div>
                    </div>

                    <GalleryPreview
                      photos={photos}
                      title={event.title}
                      onOpen={() => setOpenEventKey(key)}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Fullscreen gallery modal */}
        <EventGalleryModal
          open={Boolean(openEventKey)}
          onOpenChange={(v) => setOpenEventKey(v ? openEventKey : null)}
          title={currentGallery?.event.title ?? ""}
          subtitle={
            currentGallery
              ? `${formatDate(currentGallery.event.date)} • ${currentGallery.event.venue}`
              : ""
          }
          photos={currentGallery?.photos ?? []}
        />
      </main>
    </Layout>
  );
};

export default Events;