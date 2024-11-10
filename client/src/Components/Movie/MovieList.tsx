import React from 'react';
import { useGetMoviesQuery } from '../../api/movieApi';

function MovieList() {
  const { data: movies, error, isLoading } = useGetMoviesQuery({});

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <ul>
      {movies?.map((movie) => (
        <li key={movie.id}>
          {movie.title} ({movie.year})
        </li>
      ))}
    </ul>
  );
}

export default MovieList;
