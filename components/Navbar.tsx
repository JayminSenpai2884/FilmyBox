import React, { useCallback, useEffect, useState } from "react";
import {
  BellIcon,
  MagnifyingGlassIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";

import AccountMenu from "@/components/AccountMenu";
import MobileMenu from "@/components/MobileMenu";
import NavbarItem from "@/components/NavbarItem";

import { Link } from 'react-router-dom';

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
      className={`fixed top-0 left-0 right-0 z-50 transition duration-500 ${
        showBackground ? "bg-zinc-900" : ""
      }`}
    >
      <div className="flex items-center justify-between px-4 md:px-16 py-3">
        <img
          className="h-10 lg:h-14 max-w-xs transition-transform transform hover:scale-110 rounded-full"
          src="/images/logo.png"
          alt="FilmyBox Logo"
        />
        <div className="hidden lg:flex items-center space-x-10 text-lg">
        </div>
        <div className="flex items-center space-x-4 lg:space-x-0">
          <div onClick={toggleMobileMenu} className="lg:hidden cursor-pointer">
            <MagnifyingGlassIcon className="w-6 text-gray-300 hover:text-white transition rounded-full" />
          </div>
          <div onClick={toggleMobileMenu} className="lg:hidden cursor-pointer">
            <BellIcon className="w-6 text-gray-300 hover:text-white transition rounded-full" />
          </div>
          <div
            onClick={toggleAccountMenu}
            className="flex items-center cursor-pointer relative group"
          >
            <div className="w-10 h-10 rounded-full overflow-hidden group-hover:ring-2 group-hover:ring-white">
              <img
                className="w-full h-full rounded-full"
                src="/images/avtar.png"
                alt=""
              />
            </div>
            <ChevronDownIcon className="w-4 ml-2 text-gray-300 group-hover:text-white transition" />
            <AccountMenu visible={showAccountMenu} />
          </div>
        </div>
      </div>
      <MobileMenu visible={showMobileMenu} />
    </nav>
  );
};

export default Navbar;
