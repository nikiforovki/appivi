import React from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import { CustomSliderProps } from './types';
import { customSliderSettings } from './sliderSettings';
import { arrowSettings } from '../components/arrows/arrowSettings';

const StyledSliderContainer = styled.div`
  width: 100%;
  cursor: pointer;
  position: relative;
`;

const StyledSliderInner = styled.div`
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
`;

export const CustomSlider: React.FC<CustomSliderProps> = React.memo(
  ({
    movies,
    settings = customSliderSettings,
    CardComponent,
    isLoading,
    SkeletonComponent,
  }) => {
    const sliderSettings = {
      ...settings,
      ...arrowSettings,
    };

    const sliderContent =
      isLoading || !movies || movies.length === 0
        ? Array.from({ length: 4 }).map((_, index) => (
            <SkeletonComponent key={index} />
          ))
        : movies.map((movie) => <CardComponent key={movie.id} {...movie} />);

    return (
      <StyledSliderContainer>
        <StyledSliderInner>
          <Slider {...sliderSettings}>{sliderContent}</Slider>
        </StyledSliderInner>
      </StyledSliderContainer>
    );
  },
);

export default CustomSlider;
