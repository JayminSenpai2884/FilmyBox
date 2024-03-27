import React, { useEffect, useState } from "react";
import axios from "axios";
import YouTube from "react-youtube";

interface Celebrity {
  id: number;
  name: string;
  profile_path: string;
}

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  genre_ids: number[];
  vote_average: number;
}

interface Video {
  id: string;
  key: string;
}

const CelebrityPlaylist: React.FC = () => {
  const [celebrities, setCelebrities] = useState<Celebrity[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedCelebrity, setSelectedCelebrity] = useState<Celebrity | null>(
    null
  );
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const apiKey = "f0b5c1d3307aae122961663d10864986";

  useEffect(() => {
    fetchTrendingCelebrities();
  }, []);

  const fetchTrendingCelebrities = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/trending/person/week?api_key=${apiKey}`
      );
      setCelebrities(response.data.results.slice(0, 20)); // Limit to the first 20 trending celebrities
    } catch (error) {
      console.error("Error fetching trending celebrities:", error);
    }
  };

  const fetchMoviesByCelebrity = async (celebrity: Celebrity) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/person/${celebrity.id}/movie_credits?api_key=${apiKey}&language=en-US`
      );
      setMovies(response.data.cast.slice(0, 5));
      setSelectedCelebrity(celebrity);
    } catch (error) {
      console.error("Error fetching movies by celebrity:", error);
    }
  };

  const fetchVideosForMovie = async (movie: Movie) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${apiKey}&language=en-US`
      );
      setVideos(response.data.results);
      setSelectedMovie(movie);
    } catch (error) {
      console.error("Error fetching videos for movie:", error);
    }
  };

  const closePopup = () => {
    setSelectedCelebrity(null);
    setMovies([]);
    setSelectedMovie(null);
    setVideos([]);
  };

  return (
    <>
      {selectedCelebrity && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="p-8 bg-gray-900 rounded-lg overflow-hidden shadow-lg max-w-screen-lg w-full h-3/4 transform transition-all duration-300">
            <button
              className="absolute top-4 right-4 text-gray-300 hover:text-gray-500 focus:outline-none"
              onClick={closePopup}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <h2 className="text-3xl font-semibold mb-4 text-white">
              Movies by {selectedCelebrity.name}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 h-full overflow-y-auto">
              {movies.map((movie) => (
                <div
                  key={movie.id}
                  className="bg-gray-800 p-4 rounded-lg shadow transform hover:scale-105 transition-transform cursor-pointer"
                  onClick={() => fetchVideosForMovie(movie)}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="w-32 h-auto mb-2 rounded-lg"
                  />
                  <h3 className="text-xl font-semibold mb-2 text-white">
                    {movie.title}
                  </h3>
                  <p className="text-gray-300 mb-2">{movie.overview}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {selectedMovie && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="p-8 bg-gray-900 rounded-lg overflow-hidden shadow-lg max-w-screen-lg w-full h-3/4 transform transition-all duration-300">
            <button
              className="absolute top-4 right-4 text-gray-300 hover:text-gray-500 focus:outline-none"
              onClick={closePopup}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <h2 className="text-3xl font-semibold mb-4 text-white text-center">
              Trailer of {selectedMovie.title}
            </h2>
            <div className="w-full h-full overflow-hidden flex justify-center items-center">
              {videos.length > 0 && (
                <YouTube
                  videoId={videos[0].key}
                  opts={{
                    width: "900",
                    height: "600",
                    playerVars: { autoplay: 1 },
                  }}
                  className="object-cover"
                />
              )}
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-white mt-10 text-3xl font-semibold mb-8 text-center py-2 rounded-lg">
          Trending Celebrities
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
{celebrities.map((celebrity) => (
  <div
    key={celebrity.id}
    className="bg-gray-800 p-4 rounded-lg shadow-md transform hover:scale-105 transition-transform cursor-pointer flex flex-col items-center"
    onClick={() => fetchMoviesByCelebrity(celebrity)}
  >
    <img
      src={`https://image.tmdb.org/t/p/w500${celebrity.profile_path}`}
      alt={celebrity.name}
      className="w-32 h-auto mb-2 rounded-full"
    />
    <h2 className="text-xl font-semibold mb-2 text-white">
      {celebrity.name}
    </h2>
  </div>
))}
</div>
</div>
</>
);
};

export default CelebrityPlaylist;
