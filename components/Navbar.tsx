import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { MagnifyingGlassIcon, BellIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import AccountMenu from "@/components/AccountMenu";
import MobileMenu from "@/components/MobileMenu";
import NavbarItem from "@/components/NavbarItem";

interface SearchResult {
  id: number;
  poster_path: string;
  title: string;
  name: string;
  overview: string;
}

const TOP_OFFSET = 66;

const Navbar = () => {
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showBackground, setShowBackground] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]); 

  useEffect(() => {
    const handleScroll = () => {
      setShowBackground(window.scrollY >= TOP_OFFSET);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleAccountMenu = useCallback(() => {
    setShowAccountMenu((current) => !current);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu((current) => !current);
  }, []);

  const handleSearchChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    try {
      let currentPage = 1;
      let totalPages = 1;
      let results: SearchResult[] = [];

      // Fetch all pages of results
      while (currentPage <= totalPages) {
        const response = await axios.get(`https://api.themoviedb.org/3/search/multi?api_key=f0b5c1d3307aae122961663d10864986&query=${event.target.value}&page=${currentPage}`);
        results = results.concat(response.data.results);
        totalPages = response.data.total_pages;
        currentPage++;
      }

      setSearchResults(results);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition duration-300 ${
        showBackground ? "bg-zinc-900" : ""
      }`}
    >
      <div className="flex items-center justify-between px-4 md:px-16 py-3">
        <Link href="/">
          <span className="block">
            <img
              className="h-10 lg:h-14 max-w-xs transition-transform transform hover:scale-105 rounded-full"
              src="/images/logo.png"
              alt="FilmyBox Logo"
            />
          </span>
        </Link>
        <div className="hidden lg:flex items-center space-x-15 text-lg">
          <div className="hidden lg:flex items-center space-x-15 text-lg ">
            <div className="flex items-center justify-center space-x-10">
              <Link href="/movies">
                <span className="text-white transition duration-200 hover:text-gray-400 cursor-pointer">
                  Movies
                </span>
              </Link>
              <Link href="/series">
                <span className="text-white transition duration-200 hover:text-gray-400 cursor-pointer">
                  Series
                </span>
              </Link>
              <Link href="/celebPage">
                <span className="text-white transition duration-200 hover:text-gray-400 cursor-pointer">
                  Celebrity Playlist
                </span>
              </Link>
              <Link href="/event">
                <span className="text-white transition duration-200 hover:text-gray-400 cursor-pointer">
                  Events
                </span>
              </Link>
              <Link href="/accessibility">
                <span className="text-white transition duration-200 hover:text-gray-400 cursor-pointer">
                  Accessibility
                </span>
              </Link>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4 lg:space-x-0">
          <div onClick={toggleMobileMenu} className="lg:hidden cursor-pointer">
            <MagnifyingGlassIcon className="w-6 text-gray-300 hover:text-gray-400 transition rounded-full" />
          </div>
          <div onClick={toggleMobileMenu} className="lg:hidden cursor-pointer">
            <BellIcon className="w-6 text-gray-300 hover:text-gray-400 transition rounded-full" />
          </div>
          <div
            onClick={toggleAccountMenu}
            className="flex items-center cursor-pointer relative group"
          >
            <div className="w-10 h-10 rounded-full overflow-hidden group-hover:ring-2 group-hover:ring-gray-400">
              <img
                className="w-full h-full rounded-full"
                src="/images/avtar.png"
                alt=""
              />
            </div>
            <ChevronDownIcon className="w-4 ml-2 text-gray-300 group-hover:text-gray-400 transition" />
            <AccountMenu visible={showAccountMenu} />
          </div>
        </div>
      </div>
      <MobileMenu visible={showMobileMenu} />
      
      {searchResults.length > 0 && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-75 z-50">
          <div className="p-8 bg-gray-800 rounded-lg overflow-hidden shadow-lg max-w-3xl">
            <h2 className="text-3xl font-semibold mb-4">Search Results</h2>
            <div className="grid grid-cols-1 gap-4">
              {searchResults.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 cursor-pointer" onClick={() => console.log(item)}>
                  <img
                    className="w-12 h-16 object-cover rounded-lg"
                    src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                    alt={`${item.title} Poster`}
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{item.title || item.name}</h3>
                    <p className="text-sm">{item.overview}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
