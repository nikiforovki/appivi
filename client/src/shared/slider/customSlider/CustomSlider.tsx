import React from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import { CustomSliderProps, ArrowProps } from './types';

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

const StyledSliderDot = styled.div`
  transform: translateX(-50%);
  z-index: 1;
`;

const StyledArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  color: white;
  cursor: pointer;
  z-index: 10;
  background-color: #00000080;
  border: none;
  padding: 10px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledPrevArrow = styled(StyledArrowButton)`
  left: 10px;
`;

const StyledNextArrow = styled(StyledArrowButton)`
  right: 10px;
`;

const PrevArrowComponent: React.FC<ArrowProps> = ({ onClick }) => {
  return <StyledPrevArrow onClick={onClick}>Prev</StyledPrevArrow>;
};

const NextArrowComponent: React.FC<ArrowProps> = ({ onClick }) => {
  return <StyledNextArrow onClick={onClick}>Next</StyledNextArrow>;
};

const CustomSlider: React.FC<CustomSliderProps> = ({
  movies,
  settings,
  CardComponent,
  isLoading,
  SkeletonComponent,
}) => {
  const [showSkeleton, setShowSkeleton] = React.useState(true);

  React.useEffect(() => {
    if (!isLoading && movies && movies.length > 0) {
      setShowSkeleton(false);
    }
  }, [isLoading, movies]);

  const sliderSettings = {
    ...settings,
    prevArrow: <PrevArrowComponent />,
    nextArrow: <NextArrowComponent />,
  };

  if (isLoading || showSkeleton) {
    return (
      <StyledSliderContainer>
        <StyledSliderInner>
          <Slider {...sliderSettings}>
            {Array.from({ length: 4 }).map((_, index) => (
              <SkeletonComponent key={index} />
            ))}
          </Slider>
          <StyledSliderDot />
        </StyledSliderInner>
      </StyledSliderContainer>
    );
  }

  return (
    <StyledSliderContainer>
      <StyledSliderInner>
        <Slider {...sliderSettings}>
          {movies.map((movie) => (
            <CardComponent key={movie.id} {...movie} />
          ))}
        </Slider>
        <StyledSliderDot />
      </StyledSliderInner>
    </StyledSliderContainer>
  );
};

export default CustomSlider;
