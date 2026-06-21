import { Film, Heart } from 'lucide-react';
import { useEffect, useRef } from 'react';

// ============================================================
//  MEMORIES DATA
//  The gallery and film reel now use the local images in public/assets/images.
// ============================================================

export interface Memory {
  id: number;
  src: string;
  alt: string;
}

const imageFiles = Array.from({ length: 32 }, (_, i) => `/assets/images/${i + 1}.jpg`);

const memories: Memory[] = imageFiles.map((src, i) => ({
  id: i + 1,
  src,
  alt: `A treasured memory #${i + 1}`,
}));

const filmReelImages: string[] = imageFiles.slice(0, 10);

export default function App() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.8;
    const playPromise = audio.play();
    if (playPromise instanceof Promise) {
      playPromise.catch(() => {
        // Autoplay may be blocked by browser policies;
        // audio is still available via playback controls.
      });
    }
  }, []);

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
            <span className="mt-2 block italic text-gold-500">Appa</span>
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

      {/* ===== AUDIO PLAYER ===== */}
      <section className="mx-auto mb-10 max-w-3xl px-6 text-center">
        <div className="inline-flex items-center gap-4 rounded-3xl border border-teal-800/20 bg-white/80 px-5 py-4 shadow-lg shadow-teal-900/10 backdrop-blur-sm">
          <div className="text-left">
            <p className="text-sm uppercase tracking-[0.32em] text-teal-900/70">
              Now playing
            </p>
            <p className="font-display text-lg font-semibold text-teal-950">
              Birthday Melody
            </p>
          </div>
          <audio
            ref={audioRef}
            controls
            preload="auto"
            className="h-12 w-full max-w-xl rounded-2xl bg-teal-950/5"
          >
            <source src="/assets/music/music.mp3" type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-gold-400/30 bg-teal-950 py-10 text-center">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-3 px-6">
          <Heart className="h-6 w-6 text-gold-400" />
          <p className="font-display text-xl text-cream-50">
            Happy Birthday Appaa!
          </p>
          <p className="text-sm text-cream-200/70">
            Made with love, 2026
          </p>
        </div>
      </footer>
    </div>
  );
}
