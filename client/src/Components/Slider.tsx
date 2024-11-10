import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';
import ImageWebp from 'react-image-webp';

const SliderStyle = styled.div`
  width: 100%;
`;

const Image = styled.img`
  width: 1200px;
  height: 400px;
  object-fit: cover;
  border-radius: 20px;
`;

const Carousel: React.FC<{ movies: any[] }> = ({ movies }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    centerMode: true,
  };

  return (
    <SliderStyle>
      <Slider {...settings}>
        {movies.map((movie) => (
          <div key={movie.id}>
            <Image src={movie.img} alt={movie.title} />
          </div>
        ))}
      </Slider>
    </SliderStyle>
  );
};

export default Carousel;
