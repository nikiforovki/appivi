import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Card from '@/shared/slider/card/Card3';
import { Skeleton2 } from '@/shared/skeleton/Skeleton';
import styled from 'styled-components';
import { Movie, MoviePaginationProps } from './types';

const StyledPaginationButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  margin: 0 10px;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:first-child {
    margin-right: 10px;
  }
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const StyledContentWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const MoviePagination: React.FC<MoviePaginationProps> = ({ searchTerm }) => {
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

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['movies', page],
    queryFn: fetchMovies,
  });

  useEffect(() => {
    setPage(1);
    refetch();
  }, [searchTerm, refetch]);

  useEffect(() => {
    if (isLoading) {
      console.log('Loading movies...');
    } else {
      console.log('Movies loaded:', data?.movies);
    }
  }, [isLoading, data]);

  if (isError) return <div>Ошибка загрузки фильмов</div>;

  const filteredMovies =
    data?.movies?.filter((movie: Movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase()),
    ) || [];

  const handleNextPage = () => {
    if (data?.nextPage) {
      setPage(data.nextPage);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  console.log('isLoading:', isLoading);
  console.log('filteredMovies:', filteredMovies);

  return (
    <StyledContainer>
      {isLoading ? (
        <StyledContentWrapper>
          {[...Array(10)].map((_, index) => (
            <Skeleton2 key={index} />
          ))}
        </StyledContentWrapper>
      ) : (
        <StyledContentWrapper>
          {filteredMovies.map((movie: Movie) => (
            <Card
              key={movie.id}
              title={movie.title}
              img={movie.img}
              subscription={movie.subscription}
            />
          ))}
        </StyledContentWrapper>
      )}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <StyledPaginationButton onClick={handlePrevPage} disabled={page === 1}>
          Предыдущая
        </StyledPaginationButton>
        <StyledPaginationButton
          onClick={handleNextPage}
          disabled={!data?.nextPage}
        >
          Следующая
        </StyledPaginationButton>
      </div>
    </StyledContainer>
  );
};

export default MoviePagination;
