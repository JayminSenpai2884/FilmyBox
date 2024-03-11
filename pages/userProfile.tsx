import React from "react";
import { signOut } from "next-auth/react";
import useCurrentUser from "@/hooks/useCurrentUser";
import MovieList from "@/components/MovieList";
import useFavorites from "@/hooks/useFavorites";
import Link from "next/link"; // Import Link from next/link

const UserProfile = () => {
  const { data: currentUser } = useCurrentUser();
  const { data: favorites = [] } = useFavorites();

  return (
    <div className="w-full h-full flex flex-col justify-between bg-zinc-900 rounded-md border border-gray-200 shadow-lg p-6">
      <div>
        <div className="flex items-center mb-4 cursor-pointer">
          <img
            className="w-16 h-16 rounded-full"
            src="/images/avtar.png"
            alt="User Avatar"
          />
          <div className="ml-6">
            <p className="text-xl font-semibold text-white">
              {currentUser?.name}
            </p>
            <p className="text-sm text-white">{currentUser?.email}</p>
          </div>
        </div>
        <hr className="border-t border-gray-200 mb-4" />

        <MovieList title="My Favorites" data={favorites} />
      </div>
      <div className="text-center">
        <br />
        <Link href="/" passHref>
          <span className="text-white transition duration-300 hover:text-gray-300 hover:text-xl hover:opacity-80">
            back to home
          </span>
        </Link>
      </div>
    </div>
  );
};

export default UserProfile;
