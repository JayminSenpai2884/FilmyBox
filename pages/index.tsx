import React from "react";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";

import Navbar from "@/components/Navbar";
import Billboard from "@/components/Billboard";
import MovieList from "@/components/MovieList";
import InfoModal from "@/components/InfoModal";
import useMovieList from "@/hooks/useMovieList";
import useFavorites from "@/hooks/useFavorites";
import useInfoModalStore from "@/hooks/useInfoModalStore";
import index from "@/pages/index";
import movies from "@/pages/movies";
import series from "@/pages/series";
import MoviesDB from "@/components/MoviesDB";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

const Home = () => {
  const { data: movies = [] } = useMovieList();
  const { data: favorites = [] } = useFavorites();
  const { isOpen, closeModal } = useInfoModalStore();

  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar></Navbar>
      <Billboard />
      <div className="pb-40">
        <MovieList title="Populer Now 🔥" data={movies} />
        <MovieList title="My Favorites 🥰" data={favorites} />
      </div>
    </>
  );
};

export default Home;
