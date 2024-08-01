import React, { Suspense } from 'react';
import MoviePage from './MoviePage';

const MoviePageWrapper = ({ params }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MoviePage params={params} />
    </Suspense>
  );
};

export default MoviePageWrapper;
