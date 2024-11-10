import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';
import ImageWebp from 'react-image-webp';
import Card from '../Card';

const SliderStyle = styled.div`
  width: 100%;
  cursor: pointer;
`;

const SliderWrapper = styled.div`
  position: relative;
`;

const SliderDot = styled.div`
  transform: translateX(-50%);
  z-index: 1;
`;

const SlideranimatedSeries: React.FC<{ movies: any[] }> = ({ movies }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    centerMode: false,
    arrows: true,
    responsive: [
      {
        breakpoint: 1920,
        settings: {
          slidesToShow: 8,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <SliderStyle>
      <SliderWrapper>
        <Slider {...settings}>
          {movies.map((animatedSeries) => (
            <div key={animatedSeries.id} className="custom-slide">
              <Card title={animatedSeries.title} img={animatedSeries.img} />
            </div>
          ))}
        </Slider>
        <SliderDot></SliderDot>
      </SliderWrapper>
    </SliderStyle>
  );
};

export default SlideranimatedSeries;
