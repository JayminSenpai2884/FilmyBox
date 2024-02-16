import React, { useCallback, useState } from "react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

import PlayButton from "@/components/PlayButton";
import useBillboard from "@/hooks/useBillboard";
import useInfoModalStore from "@/hooks/useInfoModalStore";

const Billboard: React.FC = () => {
  const { openModal } = useInfoModalStore();
  const { data } = useBillboard();
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  const handleOpenModal = useCallback(() => {
    openModal(data?.id);
  }, [openModal, data?.id]);

  return (
    <div className="relative h-[42.25vw] overflow-hidden rounded-md">
      <video
        poster={data?.thumbnailUrl}
        className="w-full h-[42.25vw] object-cover brightness-[60%] transition duration-500"
        autoPlay
        muted
        loop
        src={data?.videoUrl}
      ></video>
      <div className="absolute top-[30%] md:top-[40%] ml-4 md:ml-16  ">
        <p className="text-white text-1xl md:text-5xl h-full w-[50%] lg:text-6xl font-bold drop-shadow-xl">
          {data?.title}
        </p>
        <p className="text-white text-[8px] md:text-lg mt-3 md:mt-8 w-[90%] md:w-[80%] lg:w-[50%] drop-shadow-xl">
          {data?.description}
        </p>
        <div className="flex flex-row items-center mt-3 md:mt-4 gap-3">
          <PlayButton movieId={data?.id} />
          <button
            onClick={handleOpenModal}
            className={`
        bg-gradient-to-r from-blue-200 to-cyan-200
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
        ${isButtonHovered ? "bg-opacity-20" : ""}
      `}
            onMouseEnter={() => setIsButtonHovered(true)}
            onMouseLeave={() => setIsButtonHovered(false)}
          >
            <InformationCircleIcon className="w-4 md:w-7 mr-2" />
            More Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default Billboard;
