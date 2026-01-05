import Layout from "@/components/layout/Layout";
import { ExternalLink } from "lucide-react";
import merchTee from "@/assets/merch-tee.jpg";

const merchItems = [
  {
    id: 1,
    name: "Catacombs Skeleton Tee",
    price: "€25",
    image: merchTee,
    description: "Black heavyweight tee with exclusive skeleton design.",
  },
];

const Merch = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="font-display text-4xl md:text-5xl tracking-widest uppercase mb-4 animate-fade-in opacity-0">
              Merch
            </h1>
            <div className="w-24 h-px bg-primary mx-auto mb-6" />
            <p className="text-muted-foreground animate-fade-in opacity-0" style={{ animationDelay: "0.2s" }}>
              Rep the underground. Limited drops available at shows or via DM.
            </p>
          </div>
        </div>
      </section>

      {/* Merch Grid */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {merchItems.map((item, index) => (
              <article
                key={item.id}
                className="group bg-card border border-border hover:border-primary/50 overflow-hidden transition-all duration-300 animate-fade-in-up opacity-0"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-lg tracking-wide uppercase mb-2">
                    {item.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-display text-xl text-primary">
                      {item.price}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Contact for Purchase */}
          <div className="text-center mt-16 animate-fade-in opacity-0" style={{ animationDelay: "0.4s" }}>
            <p className="text-muted-foreground mb-6">
              DM us on Instagram to order, or grab at the next show.
            </p>
            <a
              href="https://www.instagram.com/catacombs_irish_underground/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-display tracking-widest uppercase hover:bg-primary/90 transition-colors glow"
            >
              Contact on Instagram
              <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Merch;
