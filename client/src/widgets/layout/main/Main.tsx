import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import CustomSlider from '@shared/custom-slider';
import Card from '@entities/card';
import Card2 from '@entities/card2';
import Footer from '../footer/Footer';
import { Skeleton1, Skeleton2 } from '@shared/skeleton';
import {
  mainSliderSettings,
  customSliderSettings,
} from '@shared/slider-settings';
import FreeTrialButton from '@shared/free-trial-button';
import {
  useGetMoviesQuery,
  useGetAmediatekaSeriesQuery,
  useGetAnimatedSeriesQuery,
} from '@app/api-hooks';

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
  const navigate = useNavigate();

  const {
    data: moviesResponse,
    isLoading: isMoviesLoading,
    error: moviesError,
  } = useGetMoviesQuery();

  const {
    data: amediatekaSeriesResponse,
    isLoading: isAmediatekaSeriesLoading,
    error: amediatekaSeriesError,
  } = useGetAmediatekaSeriesQuery();

  const {
    data: animatedSeriesResponse,
    isLoading: isAnimatedSeriesLoading,
    error: animatedSeriesError,
  } = useGetAnimatedSeriesQuery();

  const isLoading =
    isMoviesLoading || isAmediatekaSeriesLoading || isAnimatedSeriesLoading;

  const handleNavigateToSingUp = () => {
    navigate('/singup');
  };

  if (moviesError || amediatekaSeriesError || animatedSeriesError) {
    return <div>Error loading data</div>;
  }

  return (
    <StyledMainContainer>
      <CustomSlider
        movies={moviesResponse?.movies || []}
        settings={mainSliderSettings}
        CardComponent={Card}
        isLoading={isLoading}
        SkeletonComponent={Skeleton1}
      />
      <StyledButtonContainer>
        <FreeTrialButton hideOnMobile={true} onClick={handleNavigateToSingUp} />
      </StyledButtonContainer>

      <StyledNameChapter>Сериалы Amediateka</StyledNameChapter>
      <CustomSlider
        movies={amediatekaSeriesResponse?.amediatekaSeries || []}
        settings={customSliderSettings}
        CardComponent={Card2}
        isLoading={isLoading}
        SkeletonComponent={Skeleton2}
      />
      <StyledNameChapter>Анимационные сериалы</StyledNameChapter>
      <CustomSlider
        movies={animatedSeriesResponse?.animatedSeries || []}
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
