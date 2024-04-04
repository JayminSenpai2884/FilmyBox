import React from "react";
import Link from "next/link";

interface MobileMenuProps {
  visible?: boolean;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ visible }) => {
  if (!visible) {
    return null;
  }

  return (
    <div className="bg-black w-56 absolute top-16 left-0 py-5 flex-col border-2 border-gray-800 flex justify-center items-center rounded-lg p-4">
      <div className="flex flex-col gap-4">
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
  );
};

export default MobileMenu;
