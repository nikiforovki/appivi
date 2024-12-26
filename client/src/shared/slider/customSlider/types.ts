export interface CustomSliderProps {
  movies: any[];
  settings: any;
  CardComponent: React.FC<any>;
  isLoading: boolean;
  SkeletonComponent: React.FC<any>;
}

export interface ArrowProps {
  onClick?: () => void;
}
