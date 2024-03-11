import React from "react";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";

import AccessibilityDB from "@/components/AccessibilityDB";
import Navbar from "@/components/Navbar";
import Billboard from "@/components/Billboard";
import MovieList from "@/components/MovieList";
import InfoModal from "@/components/InfoModal";
import useMovieList from "@/hooks/useMovieList";
import useFavorites from "@/hooks/useFavorites";
import useInfoModalStore from "@/hooks/useInfoModalStore";
import MoviesDB from "@/components/MoviesDB";
import AccessibilityList from "@/components/AccessbilityList"
import useAccessibilityMovie from "@/hooks/useAccessibilityMovieList";
export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

const Movies = () => {
  const { isOpen, closeModal } = useInfoModalStore();
  const { data: moviesA= [] } = useAccessibilityMovie();

  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar />
      <div className="pb-40">
        <AccessibilityDB></AccessibilityDB>
        {/* <AccessibilityList title="Accessibility List" data={moviesA}></AccessibilityList> */}
      </div>
    </>
  );
};

export default Movies;
