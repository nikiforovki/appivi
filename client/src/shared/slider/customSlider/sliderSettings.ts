export const mainSliderSettings = {
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: false,
  autoplaySpeed: 2000,
  arrows: true,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        centerMode: false,
        slidesToShow: 1,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

export const customSliderSettings = {
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: false,
  autoplaySpeed: 2000,
  centerMode: true,
  centerPadding: '100px',
  responsive: [
    {
      breakpoint: 1920,
      settings: {
        slidesToShow: 6,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: '100px',
      },
    },
    {
      breakpoint: 1280,
      settings: {
        slidesToShow: 6,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: '80px',
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: '60px',
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: '100px',
      },
    },
    {
      breakpoint: 375,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: '100px',
      },
    },
  ],
};
