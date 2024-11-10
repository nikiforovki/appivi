import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import styled from 'styled-components';
import MoviePagination from './MoviePagination';
import CategoryInfinityScroll from './CategoryInfinityScroll';
import { FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const queryClient = new QueryClient();

const PageConteiner = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

const SearchInput = styled.input`
  width: 90%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const Styletxt = styled.div`
  color: #f5fffa;
`;

const StyledCloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  border: none;
  font-size: 18px;
  color: white;
  cursor: pointer;
`;

const MovieCatalog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleClose = () => {
    navigate('/'); // Переход на главную страницу
  };

  return (
    <QueryClientProvider client={queryClient}>
      <PageConteiner>
        <StyledCloseButton onClick={handleClose}>
          <FaTimes />
        </StyledCloseButton>
        <Styletxt>
          <h1>Поиск</h1>
        </Styletxt>
        <SearchInput
          type="text"
          placeholder="Поиск фильмов..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <Styletxt>
          <h1>Возможно, тебя заинтересует</h1>
        </Styletxt>
        <MoviePagination searchTerm={searchTerm} />

        <CategoryInfinityScroll />
      </PageConteiner>
    </QueryClientProvider>
  );
};

export default MovieCatalog;
