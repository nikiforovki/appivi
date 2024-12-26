import React, { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import styled from 'styled-components';
import MoviePagination from '../movie-pagination/MoviePagination';
import { FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { SearchChangeEvent, SearchTermState } from './types';

const queryClient = new QueryClient();

const StyledPageConteiner = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

const StyledSearchInput = styled.input`
  width: 90%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const StyledText = styled.div`
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
  const [searchTerm, setSearchTerm] = useState<SearchTermState>('');
  const navigate = useNavigate();

  const handleSearchChange = (event: SearchChangeEvent) => {
    setSearchTerm(event.target.value);
  };

  const handleClose = () => {
    navigate('/');
  };

  useEffect(() => {}, [searchTerm]);

  return (
    <QueryClientProvider client={queryClient}>
      <StyledPageConteiner>
        <StyledCloseButton onClick={handleClose}>
          <FaTimes />
        </StyledCloseButton>
        <StyledText>
          <h1>Поиск</h1>
        </StyledText>
        <StyledSearchInput
          type="text"
          placeholder="Поиск фильмов..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <StyledText>
          <h1>Возможно, тебя заинтересует</h1>
        </StyledText>
        <MoviePagination searchTerm={searchTerm} />
      </StyledPageConteiner>
    </QueryClientProvider>
  );
};

export default MovieCatalog;
