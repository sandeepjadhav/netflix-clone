import MoviePlayerClient from "./player-client";

export default async function MoviePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // ✅ unwrap params explicitly
  const { id: movieId } = await params;

  return <MoviePlayerClient movieId={movieId} />;
}
