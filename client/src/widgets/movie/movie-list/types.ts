export interface Movie {
  id: number;
  title: string;
  year: number;
}

export interface MovieListProps {}

export interface MovieListState {
  movies?: Movie[];
  error?: Error | null;
  isLoading: boolean;
}

export type GetMoviesResult = {
  data?: Movie[];
  error?: Error | null;
  isLoading: boolean;
};
