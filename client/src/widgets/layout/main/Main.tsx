import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import CustomSlider from '@/shared/slider/customSlider/CustomSlider';
import Card from '@/shared/slider/card/Card';
import Card2 from '@/shared/slider/card/Card2';
import Footer from '../footer/Footer';
import { Skeleton1, Skeleton2 } from '../../../shared/skeleton/Skeleton';
import { Movie } from './types';
import {
  mainSliderSettings,
  customSliderSettings,
} from '@/shared/slider/customSlider/sliderSettings';
import FreeTrialButton from '@/shared/ui/free-Trial-Button/FreeTrialButton';

const StyledMainContainer = styled.div`
  flex-direction: column;
  align-items: center;
  max-width: 1320px;
  height: 500px;
  color: white;
`;

const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledNameChapter = styled.div`
  font-size: 24px;
  font-weight: 700;
  line-height: 28px;
  margin: 20px 0 20px 20px;
`;

const Main: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [newmovie, setNewMovies] = useState<Movie[]>([]);
  const [amediatekaSeries, setAmediatekaSeries] = useState<Movie[]>([]);
  const [animatedSeries, setAnimatedSeries] = useState<Movie[]>([]);
  const [watchingNow, setWatchingNow] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          moviesResponse,
          newMoviesResponse,
          amediatekaSeriesResponse,
          animatedSeriesResponse,
          watchingNowResponse,
        ] = await Promise.all([
          fetch('/api/movies').then((response) => response.json()),
          fetch('/api/newmovies').then((response) => response.json()),
          fetch('/api/amediatekaSeries').then((response) => response.json()),
          fetch('/api/animatedSeries').then((response) => response.json()),
          fetch('/api/watchingNow').then((response) => response.json()),
        ]);

        setMovies(moviesResponse.movies);
        setNewMovies(newMoviesResponse.newmovies);
        setAmediatekaSeries(amediatekaSeriesResponse.amediatekaSeries);
        setAnimatedSeries(animatedSeriesResponse.animatedSeries);
        setWatchingNow(watchingNowResponse.watchingNow);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleNavigateToSingUp = () => {
    navigate('/singup');
  };

  return (
    <StyledMainContainer>
      <CustomSlider
        movies={movies}
        settings={mainSliderSettings}
        CardComponent={Card}
        isLoading={isLoading}
        SkeletonComponent={Skeleton1}
      />
      <StyledButtonContainer>
        <FreeTrialButton hideOnMobile={true} onClick={handleNavigateToSingUp} />
      </StyledButtonContainer>
      <StyledNameChapter>Фильмы новинки</StyledNameChapter>
      <CustomSlider
        movies={newmovie}
        settings={customSliderSettings}
        CardComponent={Card2}
        isLoading={isLoading}
        SkeletonComponent={Skeleton2}
      />
      <StyledNameChapter>Сериалы Amediateka</StyledNameChapter>
      <CustomSlider
        movies={amediatekaSeries}
        settings={customSliderSettings}
        CardComponent={Card2}
        isLoading={isLoading}
        SkeletonComponent={Skeleton2}
      />
      <StyledNameChapter>Анимационные сериалы</StyledNameChapter>
      <CustomSlider
        movies={animatedSeries}
        settings={customSliderSettings}
        CardComponent={Card2}
        isLoading={isLoading}
        SkeletonComponent={Skeleton2}
      />
      <Footer />
    </StyledMainContainer>
  );
};

export default Main;
