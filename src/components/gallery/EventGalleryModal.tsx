import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, ChevronLeft } from "lucide-react";
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
  const close = () => onOpenChange(false);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          // Fullscreen-ish modal
          "w-[100vw] sm:w-[95vw] max-w-6xl",
          "h-[100vh] sm:h-auto",
          "p-0 overflow-hidden",
          "bg-background/95 border-border"
        )}
      >
        {/* Sticky header with real close controls */}
        <div className="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur">
          <DialogHeader className="px-3 py-3 sm:px-6 sm:py-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <DialogTitle className="font-display text-lg sm:text-xl truncate">
                  {title}
                </DialogTitle>
                {subtitle ? (
                  <p className="text-sm text-muted-foreground mt-1 truncate">
                    {subtitle}
                  </p>
                ) : null}
                <p className="text-xs text-muted-foreground mt-2">
                  {photos.length} photo{photos.length === 1 ? "" : "s"}
                </p>
              </div>

              {/* Mobile-first close controls */}
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={close}
                  className="sm:hidden"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Back
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={close}
                  aria-label="Close gallery"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </DialogHeader>
        </div>

        {/* Scrollable body (works on mobile) */}
        <div className="flex-1 max-h-[calc(100vh-76px)] sm:max-h-[80vh] overflow-y-auto px-3 pb-6 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mt-4">
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