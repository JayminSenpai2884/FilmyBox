import axios from "axios";
import React, { useEffect, useState } from "react";

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  genreId: number;
}

interface HoverButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
}

const HoverButton: React.FC<HoverButtonProps> = ({ onClick, children }) => {
  return (
    <button className="overflow-hidden relative w-32 p-2 h-12 bg-black text-white border-none rounded-md text-xl font-bold cursor-pointer z-10 group" onClick={onClick}>
      {children}
      <span className="absolute w-36 h-32 -top-8 -left-2 bg-sky-200 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-500 duration-1000 origin-right"></span>
      <span className="absolute w-36 h-32 -top-8 -left-2 bg-sky-400 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-700 duration-700 origin-right"></span>
      <span className="absolute w-36 h-32 -top-8 -left-2 bg-sky-600 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-1000 duration-500 origin-right"></span>
      <span className="group-hover:opacity-100 group-hover:duration-1000 duration-100 opacity-0 absolute top-2.5 left-6 z-10">Now!</span>
    </button>
  );
};

const EventPage = () => {
  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      title: "Classic Movies Night",
      description: "Join us for a night of classic movies from the golden era of cinema.",
      date: "Saturday, 26th February",
      time: "7:00 PM",
      location: "Main Theater",
      genreId: 35, // Specify genreId for Classic Movies
    },
    {
      id: 2,
      title: "Sci-Fi Saturdays",
      description: "Experience the wonders of science fiction every Saturday night.",
      date: "Saturday, 26th February",
      time: "8:00 PM",
      location: "Sci-Fi Lounge",
      genreId: 878, // Specify genreId for Sci-Fi
    },
    {
      id: 3,
      title: "Anime Nights",
      description: "Immerse yourself in the vibrant world of anime every Friday night.",
      date: "Friday, 25th February",
      time: "8:00 PM",
      location: "Anime Lounge",
      genreId: 16, // Specify genreId for Anime
    },
  ]);

  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [relatedMovies, setRelatedMovies] = useState<any[]>([]);

  useEffect(() => {
    const fetchRelatedMovies = async () => {
      if (selectedEvent) {
        try {
          const response = await axios.get(
            `https://api.themoviedb.org/3/discover/movie?api_key=f0b5c1d3307aae122961663d10864986&sort_by=popularity.desc&include_adult=false&include_video=true&page=1&vote_count.gte=100&with_genres=${selectedEvent.genreId}`
          );
          const movies = response.data.results.slice(0, 5);
          setRelatedMovies(movies);
        } catch (error) {
          console.error("Error fetching related movies:", error);
        }
      }
    };

    fetchRelatedMovies();
  }, [selectedEvent]);

  const openMoviesPopup = (event: Event) => {
    setSelectedEvent(event);
  };

  const closePopup = () => {
    setSelectedEvent(null);
    setRelatedMovies([]);
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-10">
      {events.map((event) => (
        <div key={event.id} className="mb-8 rounded-lg bg-gray-900 text-white shadow-md">
          <div className="p-6 flex justify-between items-center">
            <h2 className="text-2xl font-bold">{event.title}</h2>
            <HoverButton onClick={() => openMoviesPopup(event)}>
              Watch
            </HoverButton>
          </div>
          <div className="p-6">
            <p className="text-gray-300 mb-2">{event.description}</p>
            <p className="text-gray-300">Date: {event.date}</p>
            <p className="text-gray-300">Time: {event.time}</p>
            <p className="text-gray-300">Location: {event.location}</p>
          </div>
        </div>
      ))}

      {selectedEvent && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-75 z-50">
          <div className="p-8 bg-white rounded-lg overflow-hidden shadow-lg max-w-screen-lg w-full h-3/4 transform transition-all duration-300">
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 transition-colors duration-300"
              onClick={closePopup}
            >
              Close
            </button>
            <h2 className="text-4xl font-bold mb-4">
              Movies for {selectedEvent.title}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full overflow-y-auto">
              {relatedMovies.map((movie) => (
                <div
                  key={movie.id}
                  className="bg-gray-200 p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-300"
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-auto mb-2 rounded-lg"
                  />
                  <h3 className="text-xl font-bold mb-2">{movie.title}</h3>
                  <p className="text-gray-700">{movie.overview}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventPage;
