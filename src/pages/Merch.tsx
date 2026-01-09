import { useEffect, useState } from "react";

type MerchItem = {
  name: string;
  price: string;
  image?: string;
  buyUrl?: string;
  description?: string;
};

type MerchJson = { items?: MerchItem[] };

const Merch = () => {
  const [items, setItems] = useState<MerchItem[]>([]);

  useEffect(() => {
    fetch("/content/merch.json", { cache: "no-store" })
      .then((r) => r.json())
      .then((data: MerchJson) => setItems(data.items ?? []))
      .catch(() => setItems([]));
  }, []);

  // If you want to keep your original merch when CMS is empty:
  // you can paste your old hardcoded array as a fallback here.

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="font-display text-4xl md:text-5xl tracking-widest uppercase mb-4 animate-fade-in opacity-0">
            Merch
          </h1>
          <div className="w-24 h-px bg-primary mx-auto mb-8" />
          <p
            className="text-muted-foreground max-w-2xl mx-auto animate-fade-in opacity-0"
            style={{ animationDelay: "0.2s" }}
          >
            Support the movement. Limited drops and exclusive designs.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, index) => (
            <div
              key={`${item.name}-${index}`}
              className="group bg-card border border-border hover:border-primary/50 transition-all duration-300 animate-fade-in-up opacity-0"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {item.image ? (
                <div className="aspect-square overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ) : null}

              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-xl tracking-wide uppercase">{item.name}</h3>
                  <span className="text-primary font-display text-lg">{item.price}</span>
                </div>

                {item.description ? (
                  <p className="text-muted-foreground mt-3">{item.description}</p>
                ) : null}

                {item.buyUrl ? (
                  <a
                    href={item.buyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full mt-6 px-6 py-3 bg-primary text-primary-foreground text-sm tracking-widest uppercase hover:bg-primary/90 transition-colors group-hover:glow"
                  >
                    Buy
                  </a>
                ) : null}
              </div>
            </div>
          ))}
        </div>

        {items.length === 0 ? (
          <div className="text-center text-muted-foreground mt-12">
            No merch listed yet. Add items in <span className="text-primary">/admin</span>.
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Merch;
