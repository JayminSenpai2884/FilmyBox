import axios from "axios";
import React, { useEffect, useState } from "react";
import YouTube from 'react-youtube';

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
}

const MoviesDB = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const apiKey = "f0b5c1d3307aae122961663d10864986";
  const popular = "https://api.themoviedb.org/3/movie/popular";

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${popular}?api_key=${apiKey}`);
      const result = response.data.results;
      setMovies(result);
      await getVid(result);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const getVid = async (movies: Movie[]) => {
    const videoPromises = movies.map(async (movie) => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${apiKey}&language=en-US`);
        const videoData = response.data.results;
        if (videoData.length > 0) {
          return {
            id: movie.id.toString(),
            key: videoData[0].key
          };
        }
        return null;
      } catch (error) {
        console.error("Error fetching video for movie ID:", movie.id, error);
        return null;
      }
    });
    const videoResults = await Promise.all(videoPromises);
    setVideos(videoResults.filter(video => video !== null) as Video[]);
  };

  const openVideoPopup = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const closeVideoPopup = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-10">
      <h1 className="text-3xl font-semibold mb-8 text-white">Popular Movies</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {movies.map((item) => (
          <div key={item.id} className="relative overflow-hidden rounded-lg shadow-lg">
            <img
              className="w-full h-auto object-cover transition-transform duration-300 transform scale-100 hover:scale-105 rounded-t-lg cursor-pointer"
              src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
              alt={`${item.title} Poster`}
              onClick={() => openVideoPopup(item)}
            />
            {selectedMovie && selectedMovie.id === item.id && (
              <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-75 z-50" onClick={closeVideoPopup}>
                <div className="p-8 bg-white rounded-lg overflow-hidden shadow-lg max-w-3xl">
                  <h2 className="text-3xl font-semibold mb-4">{selectedMovie.title}</h2>
                  <p className="text-lg mb-4">{selectedMovie.overview}</p>
                  <p className="text-base">Release Date: {selectedMovie.release_date}</p>
                  <br></br>
                  <div> 
                  {videos.find(video => video.id === selectedMovie.id.toString()) && (
                    <YouTube style={{
                        width: '644px',
                        height: '367px', 
                        border: 'none',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                      }} videoId={videos.find(video => video.id === selectedMovie.id.toString())!.key}></YouTube>
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
