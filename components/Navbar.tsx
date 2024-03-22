import React, { useCallback, useEffect, useState } from "react";
import {
  BellIcon,
  MagnifyingGlassIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link"; // Import Link component from next/link

import AccountMenu from "@/components/AccountMenu";
import MobileMenu from "@/components/MobileMenu";
import NavbarItem from "@/components/NavbarItem";

const TOP_OFFSET = 66;

const Navbar = () => {
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showBackground, setShowBackground] = useState(false);

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
    </nav>
  );
};

export default Navbar;
