import React from 'react';
import { PlayIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/router';

interface PlayButtonProps {
  movieId: string;
}

const PlayButton: React.FC<PlayButtonProps> = ({ movieId }) => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(`/watch/${movieId}`)}
      className="
        bg-gradient-to-r from-zinc-500 to-zinc-500 
        text-white 
        rounded-full 
        py-2 px-6 
        text-sm md:text-base 
        font-semibold 
        flex 
        items-center 
        hover:opacity-80 
        transition-all 
        focus:outline-none 
        focus:ring focus:border-blue-300
      "
    >
      <PlayIcon className="w-5 md:w-8 text-white mr-2" />
      Watch Now
    </button>
  );
}

export default PlayButton;
