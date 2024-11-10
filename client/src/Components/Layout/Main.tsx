import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Carousel from '@/Components/Slider';
import Slidernew from '../../Components/Slider/Slidernew';
import Sliderwatchingnow from '../../Components/Slider/Sliderwatchingnow';
import Footer from './Footer';

interface Movie {
  id: number;
  img: string;
  title: string;
}
interface NewMovie {
  id: number;
  img: string;
  title: string;
}

const MainContainer = styled.div`
  flex-direction: column;
  align-items: center;
  max-width: 1320px;
  height: 500px;
  color: white;
`;

const BtnFree60 = styled.button`
  width: 100%;
  height: 40px;
  border-radius: 10px;
  background-color: #f30745;
  color: white;
  margin-top: 30px;
  cursor: pointer;
  font-family: 'HelveticaNeue', sans-serif;
`;

const NameChapter = styled.div`
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 28px;
  margin-right: auto;
  margin-top: 20px;
  margin-bottom: 10px;
`;

const Main: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [newmovie, setNewMovies] = useState<NewMovie[]>([]);
  const [amediatekaSeries, setAmediatekaSeries] = useState<NewMovie[]>([]);
  const [animatedSeries, setAnimatedSeries] = useState<NewMovie[]>([]);
  const [watchingNow, setWatchingNow] = useState<NewMovie[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/movies')
      .then((response) => {
        console.log('Response:', response);
        return response.json();
      })
      .then((data) => {
        console.log('Data from server:', data);
        console.log('Movies from server:', data.movies);
        setMovies(data.movies);
        console.log('Movies after setMovies:', data.movies);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    fetch('/api/newmovies')
      .then((response) => {
        console.log('Response:', response);
        return response.json();
      })
      .then((data) => {
        console.log('Data from server:', data);
        console.log('New Movies from server:', data);
        setNewMovies(data.newmovies);
        console.log('New Movies after setNewMovies:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    fetch('/api/amediatekaSeries')
      .then((response) => {
        console.log('Response:', response);
        return response.json();
      })
      .then((data) => {
        console.log('Data from server:', data);
        console.log('New Movies from server:', data);
        setAmediatekaSeries(data.amediatekaSeries);
        console.log('New Movies after setNewMovies:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    fetch('/api/animatedSeries')
      .then((response) => {
        console.log('Response:', response);
        return response.json();
      })
      .then((data) => {
        console.log('Data from server:', data);
        console.log('New Movies from server:', data);
        setAnimatedSeries(data.animatedSeries);
        console.log('New Movies after setNewMovies:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    fetch('/api/watchingNow')
      .then((response) => {
        console.log('Response:', response);
        return response.json();
      })
      .then((data) => {
        console.log('Data from server:', data);
        console.log('New Movies from server:', data);
        setWatchingNow(data.watchingNow);
        console.log('New Movies after setNewMovies:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  const handleNavigateToSingUp = () => {
    navigate('/singup');
  };

  return (
    <MainContainer>
      <Carousel movies={movies} />
      <BtnFree60 onClick={handleNavigateToSingUp}>
        60 дней подписки бесплатно
      </BtnFree60>
      <NameChapter>Фильмы новинки</NameChapter>
      <Slidernew movies={newmovie} />
      <NameChapter>Сериалы Amediateka</NameChapter>
      <Sliderwatchingnow movies={amediatekaSeries} />
      <Footer />
    </MainContainer>
  );
};

export default Main;
