import { Film, Heart } from 'lucide-react';

// ============================================================
//  MEMORIES DATA
//  Replace the `src` values below with your own local image paths.
//  e.g.  src: '/images/dad-1.jpg'
//  You can keep the structure (id / src / alt) and add as many
//  photos as you like — the gallery will lay them out automatically.
// ============================================================

export interface Memory {
  id: number;
  src: string;
  alt: string;
}

const memories: Memory[] = Array.from({ length: 36 }, (_, i) => ({
  id: i + 1,
  src: `https://images.unsplash.com/photo-${
    [
      '1507003211169-0a1dd7228f2d', // portrait
      '1511895426328-dc8714191300', // family candid
      '1494790108377-be9c29b29330', // smile
      '1500648767791-00dcc994a43e', // man portrait
      '1517423440428-a5a00ad493e8', // outdoor
      '1506794778202-cad84cf45f1d', // man smiling
      '1502920917128-1aa500764cbd', // group
      '1519345182560-3f2917c472ef', // friends
      '1502790521778-9a6c5fbd2d57', // father child
      '1531123897727-8f129e1688ce', // vintage man
    ][i % 10]
  }?auto=format&fit=crop&w=600&q=80`,
  alt: `A treasured memory #${i + 1}`,
}));

const filmReelImages: string[] = Array.from({ length: 10 }, (_, i) => i).map(
  (i) =>
    `https://images.unsplash.com/photo-${
      [
        '1507003211169-0a1dd7228f2d',
        '1511895426328-dc8714191300',
        '1494790108377-be9c29b29330',
        '1500648767791-00dcc994a43e',
        '1517423440428-a5a00ad493e8',
        '1506794778202-cad84cf45f1d',
        '1502920917128-1aa500764cbd',
        '1519345182560-3f2917c472ef',
        '1502790521778-9a6c5fbd2d57',
        '1531123897727-8f129e1688ce',
      ][i]
    }?auto=format&fit=crop&w=400&q=80`,
);

export default function App() {
  // duplicate the reel so the loop is seamless
  const reel = [...filmReelImages, ...filmReelImages];

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream-50 via-cream-100 to-cream-200 text-teal-950">
      {/* ===== HERO ===== */}
      <header className="relative overflow-hidden pb-10 pt-20 text-center">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.22),transparent_60%)]" />
        <div className="relative mx-auto max-w-4xl px-6">
          <p className="mb-4 flex items-center justify-center gap-2 text-sm uppercase tracking-[0.3em] text-gold-600">
            <Film className="h-4 w-4" />
            A Tribute
            <Film className="h-4 w-4" />
          </p>
          <h1 className="font-display text-5xl font-black leading-tight text-teal-900 sm:text-6xl md:text-7xl">
            Happy Birthday,
            <span className="mt-2 block italic text-gold-500">Dad</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-teal-800">
            A reel of memories, a gallery of moments — every frame a reason
            we celebrate you today.
          </p>
        </div>
      </header>

      {/* ===== FILM REEL MARQUEE ===== */}
      <section className="relative z-10 mx-auto mb-24 mt-6 w-full">
        <div className="bg-teal-950 py-3 shadow-2xl">
          {/* top perforation edge */}
          <div className="film-perforation h-6 bg-teal-900" />

          {/* the scrolling strip */}
          <div className="overflow-hidden bg-teal-950 py-2">
            <div className="marquee-track flex w-max animate-film-scroll gap-3">
              {reel.map((src, i) => (
                <div
                  key={i}
                  className="relative shrink-0 overflow-hidden rounded-sm ring-1 ring-black/40"
                >
                  <img
                    src={src}
                    alt={`Film frame ${i + 1}`}
                    loading="lazy"
                    className="h-44 w-32 object-cover sepia-[0.25] transition-transform duration-700 hover:scale-110 hover:sepia-0"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* bottom perforation edge */}
          <div className="film-perforation h-6 bg-teal-900" />
        </div>
      </section>

      {/* ===== MEMORIES GALLERY ===== */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="mb-12 text-center">
          <h2 className="font-display text-4xl font-bold text-teal-900 sm:text-5xl">
            A Lifetime of Great Memories
          </h2>
          <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-gold-400" />
          <p className="mx-auto mt-4 max-w-xl text-teal-800">
            Hover any photo to see it brighten. Each frame tells a story we
            are so grateful for.
          </p>
        </div>

        {/* Masonry via CSS columns, seamless variable heights */}
        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 xl:columns-4 [&>*]:mb-5">
          {memories.map((m: Memory) => (
            <figure
              key={m.id}
              className="group relative break-inside-avoid overflow-hidden rounded-lg shadow-md ring-1 ring-gold-400/30"
            >
              <img
                src={m.src}
                alt={m.alt}
                loading="lazy"
                className="w-full object-cover transition duration-700 group-hover:scale-105 group-hover:brightness-110"
              />
              <figcaption className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-teal-950/80 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <span className="font-display text-sm italic text-cream-50">
                  {m.alt}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-gold-400/30 bg-teal-950 py-10 text-center">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-3 px-6">
          <Heart className="h-6 w-6 text-gold-400" />
          <p className="font-display text-xl text-cream-50">
            Happy Birthday Dad!
          </p>
          <p className="text-sm text-cream-200/70">
            Made with love, 2026
          </p>
        </div>
      </footer>
    </div>
  );
}
