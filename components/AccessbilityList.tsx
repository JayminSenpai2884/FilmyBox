import React from 'react';
import { AccessibilityMovieInterface } from "@/types"; 

import MovieCard from '@/components/MovieCard';
import { isEmpty } from 'lodash';
import AccessibilityMovieCard from './AccessbilityMovieCard'; // Corrected import path

interface MovieListProps {
  data: AccessibilityMovieInterface[];
  title: string;
}

const MovieList: React.FC<MovieListProps> = ({ data, title }) => {
  if (isEmpty(data)) {
    return null;
  }

  return (
    <div className="px-4 md:px-12 mt-8">
      <p className="text-white text-xl md:text-2xl lg:text-3xl font-bold mb-6">{title}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
        {data.map((movieA, index) => (
          <AccessibilityMovieCard key={index} data={movieA} /> // Added key prop
        ))}
      </div>
    </div>
  );
};

export default MovieList;
