import React from 'react';
import { useGetMoviesQuery } from '@app/use-get-movies-query';
import { Movie, MovieListState, GetMoviesResult } from './types';

function MovieList(): React.ReactElement {
  const {
    data: movies,
    error,
    isLoading,
  } = useGetMoviesQuery<GetMoviesResult>();

  const state: MovieListState = {
    movies,
    error,
    isLoading,
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <ul>
      {state.movies?.map((movie: Movie) => (
        <li key={movie.id}>
          {movie.title} ({movie.year})
        </li>
      ))}
    </ul>
  );
}

export default MovieList;
