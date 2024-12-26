import React, { useState } from 'react';
import Card from '@/shared/slider/card/Card2';
import Header from '@/widgets/layout/header/Header';
import { Skeleton2 } from '@/shared/skeleton/Skeleton';
import { useGetAmediatekaSeriesQuery } from '@/app/redux/api/movieApi';
import { Movie } from './types';
import {
  StyledContainer,
  StyledTitle,
  StyledSerialsContainer,
  StyledCardsContainer,
  StyledPaginationContainer,
  StyledPaginationButton,
  StyledPaginationText,
} from './serialsList.styled';

const SerialsList: React.FC<{ searchTerm?: string }> = ({ searchTerm }) => {
  const [page, setPage] = useState<number>(1);
  const [perPage] = useState<number>(8);

  const { data: series, isLoading, isError } = useGetAmediatekaSeriesQuery();

  if (isLoading) {
    return (
      <StyledContainer>
        <Header />
        <StyledSerialsContainer>
          <StyledTitle>Сериалы смотреть онлайн</StyledTitle>
          <StyledCardsContainer>
            {Array.from({ length: 8 }).map((_, index) => (
              <Skeleton2 key={index} />
            ))}
          </StyledCardsContainer>
        </StyledSerialsContainer>
      </StyledContainer>
    );
  }

  if (isError) return <div>Произошла ошибка при загрузке сериалов</div>;

  const seriesArray = series?.amediatekaSeries || [];

  const filteredSeries = seriesArray.filter((serial: Movie) =>
    serial.title.toLowerCase().includes(searchTerm?.toLowerCase() || ''),
  );

  console.log('Filtered series:', filteredSeries);

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
      <StyledSerialsContainer>
        <StyledTitle>Сериалы смотреть онлайн</StyledTitle>
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
      </StyledSerialsContainer>
    </StyledContainer>
  );
};

export default SerialsList;
