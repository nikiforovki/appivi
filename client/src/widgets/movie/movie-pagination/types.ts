export interface Movie {
  id: number;
  title: string;
  img: string;
  subscription: string;
}

export interface MoviePaginationProps {
  searchTerm: string;
}
