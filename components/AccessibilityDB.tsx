import axios from "axios";
import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";
import { FaClosedCaptioning } from "react-icons/fa";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  overview: string;
}

interface Video {
  id: string;
  key: string;
  hasSubtitles: boolean;
}

const MoviesDB = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const apiKey = "f0b5c1d3307aae122961663d10864986";
  const genreIdForSilentMovies = 10752; // Genre ID for silent films

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=popularity.desc&include_adult=false&include_video=true&page=1&vote_count.gte=100&with_genres=${genreIdForSilentMovies}`
        );
        const result = response.data.results;
        setMovies(result);
        await getVid(result);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchData(); // Call fetchData when the component mounts or when apiKey/genreIdForSilentMovies changes

    const getVid = async (movies: Movie[]) => {
      const videoPromises = movies.map(async (movie) => {
        try {
          const response = await axios.get(
            `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${apiKey}&language=en-US`
          );
          const videoData = response.data.results;
          const hasSubtitles = await checkSubtitles(movie.id);
          const trailer = videoData.find((video: { type: string }) => video.type === "Trailer");
          if (trailer) {
            return {
              id: movie.id.toString(),
              key: trailer.key,
              hasSubtitles: hasSubtitles,
            };
          }
          return null;
        } catch (error) {
          console.error("Error fetching video for movie ID:", movie.id, error);
          return null;
        }
      });
      const videoResults = await Promise.all(videoPromises);
      setVideos(videoResults.filter((video) => video !== null) as Video[]);
    };

    const checkSubtitles = async (movieId: number) => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/translations?api_key=${apiKey}`
        );
        const translations = response.data.translations;
        const hasSubtitles = translations.some(
          (translation: any) => translation.iso_639_1 === "en"
        );
        return hasSubtitles;
      } catch (error) {
        console.error("Error fetching subtitles for movie ID:", movieId, error);
        return false;
      }
    };

  }, [apiKey, genreIdForSilentMovies]); // Include apiKey and genreIdForSilentMovies in the dependency array

  const openVideoPopup = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const closeVideoPopup = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-10">
      <h1 className="text-3xl font-semibold mb-8 text-white">Silent Movies</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {movies.map((item) => (
          <div
            key={item.id} // Added key prop
            className="relative overflow-hidden rounded-lg shadow-lg"
          >
            <img
              className="w-full h-auto object-cover transition-transform duration-300 transform scale-100 hover:scale-105 rounded-t-lg cursor-pointer"
              src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
              alt={`${item.title} Poster`}
              onClick={() => openVideoPopup(item)}
            />
            {selectedMovie && selectedMovie.id === item.id && (
              <div
                className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-75 z-50"
                onClick={closeVideoPopup}
              >
                <div className="p-8 bg-white rounded-lg overflow-hidden shadow-lg max-w-3xl">
                  <h2 className="text-3xl font-semibold mb-4 flex items-center">
                    {selectedMovie.title}
                    {videos.find(
                      (video) => video.id === selectedMovie.id.toString()
                    )?.hasSubtitles && (
                      <FaClosedCaptioning
                        size={30}
                        className="text-xl ml-2"
                      />
                    )}
                  </h2>

                  <p className="text-lg mb-4">{selectedMovie.overview}</p>
                  <p className="text-base">
                    Release Date: {selectedMovie.release_date}
                  </p>
                  <br></br>
                  <div>
                    {videos.find(
                      (video) => video.id === selectedMovie.id.toString()
                    ) && (
                      <div>
                        <YouTube
                          style={{
                            width: "644px",
                            height: "367px",
                            border: "none",
                            borderRadius: "8px",
                            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                          }}
                          videoId={
                            videos.find(
                              (video) =>
                                video.id === selectedMovie.id.toString()
                            )!.key
                          }
                        ></YouTube>
                        {/* Remove redundant condition */}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoviesDB;
