import HeroBanner from "@/components/hero-banner";
import ContinueWatchingRow from "@/components/continue-watching-row";
import MovieRows from "@/components/movie-rows";

export default function HomePage() {
  return (
    <main className="bg-black min-h-screen">
      {/* Hero */}
      <HeroBanner />

      {/* Content */}
      <div className="relative z-20 px-6 space-y-12 -mt-32">
        <ContinueWatchingRow />
        <MovieRows />
      </div>
    </main>
  );
}
