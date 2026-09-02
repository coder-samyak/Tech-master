import { Compass, Home as HomeIcon, Briefcase, Mail } from "lucide-react";

interface NotFoundProps {
  onChangePage: (pageId: string) => void;
}

export const NotFound = ({ onChangePage }: NotFoundProps) => {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center px-6 py-24 text-center">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto">
        {/* Subtle decorative badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/20 bg-gold/5 backdrop-blur-md mb-6">
          <Compass className="w-3.5 h-3.5 text-gold animate-spin" style={{ animationDuration: "12s" }} />
          <span className="text-[11px] font-mono tracking-[0.25em] text-gold uppercase">Error 404 // Coordinate Not Found</span>
        </div>

        {/* Big Glitch / Architectural 404 Heading */}
        <h1 className="text-7xl sm:text-9xl font-serif font-bold text-white tracking-tighter mb-4 opacity-90">
          4<span className="text-gold">0</span>4
        </h1>

        <h2 className="text-2xl sm:text-3xl font-serif text-white/90 mb-4 tracking-tight">
          Lost in Digital Space
        </h2>

        <p className="text-zinc-400 text-sm sm:text-base leading-relaxed mb-10 max-w-lg mx-auto">
          The spatial coordinates or page you requested does not exist or has been relocated within our architecture lab.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="/"
            onClick={(e) => { e.preventDefault(); onChangePage("home"); }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gold text-black font-semibold text-xs tracking-widest uppercase transition-all duration-300 hover:bg-white hover:scale-105 shadow-lg shadow-gold/10 cursor-pointer"
          >
            <HomeIcon className="w-4 h-4" />
            Return Home
          </a>

          <a
            href="/what-we-do"
            onClick={(e) => { e.preventDefault(); onChangePage("portfolio"); }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 bg-white/5 text-white font-semibold text-xs tracking-widest uppercase transition-all duration-300 hover:bg-white/10 hover:border-gold/50 cursor-pointer"
          >
            <Briefcase className="w-4 h-4 text-gold" />
            Explore Portfolio
          </a>

          <a
            href="/contact"
            onClick={(e) => { e.preventDefault(); onChangePage("contact"); }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 bg-white/5 text-white font-semibold text-xs tracking-widest uppercase transition-all duration-300 hover:bg-white/10 hover:border-gold/50 cursor-pointer"
          >
            <Mail className="w-4 h-4 text-gold" />
            Contact Studio
          </a>
        </div>

        {/* Quick Links Footer */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-wrap justify-center gap-6 text-xs text-zinc-500 font-mono">
          <a href="/services" onClick={(e) => { e.preventDefault(); onChangePage("services"); }} className="hover:text-gold transition-colors cursor-pointer">
            /Services
          </a>
          <a href="/about" onClick={(e) => { e.preventDefault(); onChangePage("about"); }} className="hover:text-gold transition-colors cursor-pointer">
            /About
          </a>
          <a href="/blog" onClick={(e) => { e.preventDefault(); onChangePage("blog"); }} className="hover:text-gold transition-colors cursor-pointer">
            /Journal
          </a>
          <a href="/collaborations" onClick={(e) => { e.preventDefault(); onChangePage("collaborations"); }} className="hover:text-gold transition-colors cursor-pointer">
            /Collaborations
          </a>
        </div>
      </div>
    </section>
  );
};
