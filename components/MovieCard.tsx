import React, { useCallback } from "react";
import { useRouter } from "next/router";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { PlayIcon } from "@heroicons/react/24/solid";
import { IoMdInformationCircle } from "react-icons/io";

import { MovieInterface } from "@/types";
import FavoriteButton from "@/components/FavoriteButton";
import useInfoModalStore from "@/hooks/useInfoModalStore";

interface MovieCardProps {
  data: MovieInterface;
}

const MovieCard: React.FC<MovieCardProps> = ({ data }) => {
  const router = useRouter();
  const { openModal } = useInfoModalStore();

  const redirectToWatch = useCallback(
    () => router.push(`/watch/${data.id}`),
    [router, data.id]
  );

  return (
    <div className="group relative  rounded-md hover:shadow-xl transition-shadow duration-300">
      <img
        onClick={redirectToWatch}
        src={data.thumbnailUrl}
        alt="Movie"
        draggable={false}
        className="cursor-pointer object-cover transition-all duration-300 rounded-md group-hover:opacity-90 group-hover:scale-95 group-hover:-translate-y-1 sm:group-hover:opacity-0 sm:delay-300 w-full h-[12vw]"
      />
      <div className="opacity-0 absolute top-0 transition-all duration-200 z-10 invisible sm:visible sm:delay-300 w-full scale-0 group-hover:scale-100 group-hover:-translate-y-0 group-hover:opacity-100">
        <img
          onClick={redirectToWatch}
          src={data.thumbnailUrl}
          alt="Movie"
          draggable={false}
          className="cursor-pointer object-cover transition-all duration-300 rounded-t-md w-full h-[12vw]"
        />
        <div className="z-10 bg-gray-900 p-4 absolute w-full transition-all shadow-md rounded-b-md">
          <div className="flex items-center gap-3">
            <div
              onClick={redirectToWatch}
              className="cursor-pointer w-12 h-12 bg-white rounded-full flex justify-center items-center transition-all transform hover:scale-105"
            >
              <PlayIcon className="text-black w-6" />
            </div>
            <div
              onClick={() => openModal(data?.id)}
              className="cursor-pointer w-12 h-12 border-white border-2 rounded-full flex justify-center items-center transition-all transform hover:scale-105"
            >
              <IoMdInformationCircle className="text-white w-12 h-12" />
            </div>
            <FavoriteButton movieId={data.id} />
          </div>
          <p className="text-white font-semibold mt-4 text-xl lg:text-3xl">
            {data.title}
          </p>
          <div className="flex items-center mt-2 text-gray-400">
            <p className="mr-4">{data.duration}</p>
            <p>{data.genre}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
