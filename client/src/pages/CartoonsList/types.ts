export interface Movie {
  id: string;
  title: string;
  img: string;
  subscription: string;
  data?: Movie[];
}

export interface AnimatedSeriesResponse {
  animatedSeries: Movie[];
}

export interface CartoonsProps {
  searchTerm?: string;
}
