import React, { useState } from 'react';
import Card from '@/shared/slider/card/Card2';
import { useNavigate } from 'react-router-dom';
import Header from '@/widgets/layout/header/Header';
import { Skeleton2 } from '@/shared/skeleton/Skeleton';
import { FilmsProps } from './types';
import { useGetMoviesQuery } from '@/app/redux/api/movieApi';
import {
  StyledContainer,
  StyledTitle,
  StyledFilmsContainer,
  StyledCardsContainer,
  StyledPaginationContainer,
  StyledPaginationButton,
  StyledPaginationText,
} from './filmsList.styled';

const FilmsList: React.FC<FilmsProps> = ({ searchTerm }) => {
  const [page, setPage] = useState<number>(1);
  const [perPage] = useState<number>(10);
  const navigate = useNavigate();

  const { data: moviesData, isLoading, isError, error } = useGetMoviesQuery();

  const movies = moviesData?.movies || [];

  if (isLoading) {
    return (
      <StyledContainer>
        <Header />
        <StyledFilmsContainer>
          <StyledTitle>Фильмы смотреть онлайн</StyledTitle>
          <StyledCardsContainer>
            {[...Array(10)].map((_, index) => (
              <Skeleton2 key={index} />
            ))}
          </StyledCardsContainer>
        </StyledFilmsContainer>
      </StyledContainer>
    );
  }

  if (isError) {
    return <div>Произошла ошибка: {JSON.stringify(error)}</div>;
  }

  if (!Array.isArray(movies)) {
    return <div>Ошибка: данные не являются массивом</div>;
  }

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm?.toLowerCase() || ''),
  );

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    const totalPages = Math.ceil(filteredMovies.length / perPage);
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const paginatedMovies = filteredMovies.slice(
    (page - 1) * perPage,
    page * perPage,
  );

  return (
    <StyledContainer>
      <Header />
      <StyledFilmsContainer>
        <StyledTitle>Фильмы смотреть онлайн</StyledTitle>
        <StyledCardsContainer>
          {paginatedMovies.map((movie) => (
            <Card
              key={movie.id}
              title={movie.title}
              img={movie.img}
              subscription={movie.subscription}
            />
          ))}
        </StyledCardsContainer>
        <StyledPaginationContainer>
          <StyledPaginationButton
            onClick={handlePreviousPage}
            disabled={page === 1}
          >
            Предыдущая
          </StyledPaginationButton>
          <StyledPaginationText>
            Страница {page} из {Math.ceil(filteredMovies.length / perPage)}
          </StyledPaginationText>
          <StyledPaginationButton
            onClick={handleNextPage}
            disabled={page >= Math.ceil(filteredMovies.length / perPage)}
          >
            Следующая
          </StyledPaginationButton>
        </StyledPaginationContainer>
      </StyledFilmsContainer>
    </StyledContainer>
  );
};

export default FilmsList;
