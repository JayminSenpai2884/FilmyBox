import React from "react";
import { signOut } from "next-auth/react";
import useCurrentUser from "@/hooks/useCurrentUser";
import MovieList from "@/components/MovieList";
import useFavorites from "@/hooks/useFavorites";
import Link from "next/link";

const UserProfile = () => {
  const { data: currentUser } = useCurrentUser();
  const { data: favorites = [] } = useFavorites();

  return (
    <div className="w-full h-full flex flex-col justify-between bg-zinc-900 rounded-md shadow-lg p-6">
      <div>
        <div className="flex items-center mb-4 cursor-pointer bg-zinc-800 rounded-md p-4 backdrop-filter backdrop-blur-md bg-opacity-60">
          <img
            className="w-16 h-16 rounded-full"
            src="/images/avtar.png"
            alt="User Avatar"
          />
          <div className="ml-6">
            <p className="text-2xl font-semibold text-white">
              {currentUser?.name}
            </p>
            <p className="text-sm text-white">{currentUser?.email}</p>
          </div>
        </div>
        <hr className="border-t border-gray-200 mb-4" />
        <div className="text-white text-center mt-8">
          <p className="text-lg">Welcome to your profile, {currentUser?.name}!</p>
          <p className="text-base mt-4">
            Here you can manage your favorite movies.
          </p>
        </div>

        <div className="mt-8">
          <MovieList title="My Favorites" data={favorites}  />
        </div>
      </div>
      <div className="text-center mt-4">
        <Link href="/" passHref>
          <button className="bg-gray-700 text-white px-4 py-2 rounded-md text-sm transition duration-300 hover:bg-gray-600 hover:opacity-80">
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default UserProfile;
