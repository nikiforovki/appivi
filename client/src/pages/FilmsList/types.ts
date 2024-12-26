export interface Film {
  id: string;
  title: string;
  img: string;
  subscription: string;
}

export interface FilmsProps {
  searchTerm?: string;
}
