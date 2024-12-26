export type Movie = {
  id: string;
  title: string;
  img: string;
  subscription: string;
};

export type AnimatedSeriesResponse = {
  animatedSeries: Movie[];
};

export interface MoviesResponse {
  movies: Movie[];
}

export interface AmediatekaSeriesResponse {
  amediatekaSeries: Movie[];
}

export interface SubscriptionRequest {
  email: string;
  token: string;
  id: string;
  subscription: string;
  status: string;
  error: string | null;
}
