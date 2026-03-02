import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type GalleryPhotoNormalized = { image: string; caption?: string };

export default function EventGalleryModal({
  open,
  onOpenChange,
  title,
  subtitle,
  photos,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  subtitle?: string;
  photos: GalleryPhotoNormalized[];
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          // Fullscreen-ish modal
          "w-[95vw] max-w-6xl",
          "p-0 overflow-hidden",
          "bg-background/95 border-border"
        )}
      >
        {/* Sticky header */}
        <div className="sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur">
          <DialogHeader className="px-4 py-4 md:px-6">
            <DialogTitle className="font-display text-lg md:text-xl">
              {title}
            </DialogTitle>
            {subtitle ? (
              <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
            ) : null}
            <p className="text-xs text-muted-foreground mt-2">
              {photos.length} photo{photos.length === 1 ? "" : "s"}
            </p>
          </DialogHeader>
        </div>

        {/* Scrollable body */}
        <div className="max-h-[80vh] overflow-y-auto px-4 pb-6 md:px-6">
          {/* Desktop grid, mobile stacked */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 mt-4">
            {photos.map((p, idx) => (
              <figure
                key={`${p.image}-${idx}`}
                className="rounded-lg overflow-hidden border border-border bg-card/40"
              >
                <img
                  src={p.image}
                  alt={`${title} photo ${idx + 1}`}
                  loading="lazy"
                  className="w-full h-64 sm:h-56 lg:h-64 object-cover"
                />
                {p.caption ? (
                  <figcaption className="px-3 py-2 text-xs text-muted-foreground">
                    {p.caption}
                  </figcaption>
                ) : null}
              </figure>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}