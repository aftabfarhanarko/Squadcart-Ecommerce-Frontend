"use client";
import EmblaCarousel from "@/components/shared/EmblaCarousel";

const items = [
  {
    id: 1,
    title: "Elegant Artistic Frames",
    desc: "Modern and aesthetic wall decor that enhances the beauty of your home with peaceful and artistic messages.",
    image:
      "https://images.unsplash.com/photo-1484101403633-562f891dc89a?q=80&w=2074&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Premium Home Aesthetics",
    desc: "Eye-catching wall art designed to elevate your living space and bring sophistication to your walls.",
    image:
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Serenity in Every Corner",
    desc: "Delicate wall boards that bring a touch of serenity and connection to your home environment.",
    image:
      "https://images.unsplash.com/photo-1558882224-dda166733046?q=80&w=2069&auto=format&fit=crop",
  },
];

const TopProductCarousel = () => {
  return (
    <div className="h-full rounded-3xl overflow-hidden font-baiJamjuree">
      <EmblaCarousel dotButtons autoplay>
        {items.map((item) => (
          <div
            key={item.id}
            className="[flex:0_0_100%] w-full h-full bg-cover bg-no-repeat bg-center aspect-[16/9] min-h-[350px] relative"
            style={{
              backgroundImage: `url(${item.image})`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 md:p-12">
              <h2 className="text-2xl md:text-4xl font-black text-white mb-4 leading-tight drop-shadow-lg">
                {item.title}
              </h2>
              <p className="text-white/80 text-sm md:text-base max-w-lg line-clamp-2">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </EmblaCarousel>
    </div>
  );
};

export default TopProductCarousel;
