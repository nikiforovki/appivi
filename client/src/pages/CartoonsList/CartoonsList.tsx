import React, { useState, useMemo } from 'react';
import Card from '@/shared/slider/card/Card2';
import { useNavigate } from 'react-router-dom';
import Header from '@/widgets/layout/header/Header';
import { Skeleton2 } from '@/shared/skeleton/Skeleton';
import { useGetAnimatedSeriesQuery } from '@/app/redux/api/movieApi';
import { Movie } from './types';
import {
  StyledContainer,
  StyledText,
  StyledCartoonsContainer,
  StyledCardsContainer,
  StyledPaginationContainer,
  StyledPaginationButton,
  StyledPaginationText,
} from './cartoonsList.styled';

const CartoonsList: React.FC<{ searchTerm?: string }> = ({ searchTerm }) => {
  const [page, setPage] = useState<number>(1);
  const [perPage] = useState<number>(8);

  const {
    data: animatedSeries,
    isLoading,
    isError,
    error,
  } = useGetAnimatedSeriesQuery();

  const seriesArray = useMemo(() => {
    if (!animatedSeries) return [];
    if (!Array.isArray(animatedSeries.animatedSeries)) {
      console.error(
        'Ошибка: animatedSeries не является массивом',
        animatedSeries,
      );
      return [];
    }
    return animatedSeries.animatedSeries;
  }, [animatedSeries]);

  if (isLoading) {
    return (
      <StyledContainer>
        <Header />
        <StyledCartoonsContainer>
          <StyledText>Мультфильмы смотреть онлайн</StyledText>
          <StyledCardsContainer>
            {Array.from({ length: 8 }).map((_, index) => (
              <Skeleton2 key={index} />
            ))}
          </StyledCardsContainer>
        </StyledCartoonsContainer>
      </StyledContainer>
    );
  }

  if (isError) {
    if ('status' in error) {
      return <div>Произошла ошибка: {JSON.stringify(error.data)}</div>;
    } else {
      return (
        <div>Произошла ошибка: {error.message || 'Неизвестная ошибка'}</div>
      );
    }
  }

  const filteredSeries = seriesArray.filter((serial: Movie) =>
    serial.title.toLowerCase().includes(searchTerm?.toLowerCase() || ''),
  );

  const paginatedSeries = filteredSeries.slice(
    (page - 1) * perPage,
    page * perPage,
  );

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    const totalPages = Math.ceil(filteredSeries.length / perPage);
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  return (
    <StyledContainer>
      <Header />
      <StyledCartoonsContainer>
        <StyledText>Мультфильмы смотреть онлайн</StyledText>
        <StyledCardsContainer>
          {paginatedSeries.map((serial: Movie) => (
            <Card
              key={serial.id}
              title={serial.title}
              img={serial.img}
              subscription={serial.subscription}
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
            Страница {page} из {Math.ceil(filteredSeries.length / perPage)}
          </StyledPaginationText>
          <StyledPaginationButton
            onClick={handleNextPage}
            disabled={page >= Math.ceil(filteredSeries.length / perPage)}
          >
            Следующая
          </StyledPaginationButton>
        </StyledPaginationContainer>
      </StyledCartoonsContainer>
    </StyledContainer>
  );
};

export default CartoonsList;
