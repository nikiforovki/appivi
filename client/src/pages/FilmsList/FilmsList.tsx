import React, { useState } from 'react';
import Card2 from '@entities/card2';
import Header from '@widgets/header';
import { Skeleton2 } from '@shared/skeleton';
import { FilmsProps } from './types';
import { useGetMoviesQuery } from '@app/use-get-movies-query';
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
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);

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
            <Card2
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
