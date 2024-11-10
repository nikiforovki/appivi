import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Card from '../Card';

const MoviePagination = ({ searchTerm }) => {
  const [page, setPage] = useState(1);

  const fetchMovies = async () => {
    console.log('Fetching movies from /api/movies...');
    try {
      const response = await axios.get('/api/movies', {
        params: {
          page,
          perPage: 10,
        },
      });
      console.log('Response data:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching movies:', error);
      throw error;
    }
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ['movies', page],
    queryFn: fetchMovies,
  });

  if (isLoading) return <div>Загрузка...</div>;
  if (isError) return <div>Ошибка загрузки фильмов</div>;

  const filteredMovies = data.movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleNextPage = () => {
    if (data.nextPage) {
      setPage(data.nextPage);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {filteredMovies.map((movie) => (
          <Card
            key={movie.id}
            title={movie.title}
            img={movie.img}
            subscription={movie.subscription}
          />
        ))}
      </div>
      <div
        style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}
      >
        <button onClick={handlePrevPage} disabled={page === 1}>
          Предыдущая
        </button>
        <button onClick={handleNextPage} disabled={!data.nextPage}>
          Следующая
        </button>
      </div>
    </div>
  );
};

export default MoviePagination;
