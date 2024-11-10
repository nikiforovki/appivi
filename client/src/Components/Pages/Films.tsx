import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Card from '../Card';
import { FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Header from '../Layout/Header';

interface Film {
  id: string;
  title: string;
  img: string;
  subscription: boolean;
}

interface FilmsProps {
  searchTerm?: string;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TextStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #ffffff;
  font-size: 24px;
  text-align: center;
  margin-bottom: 40px;
`;

const FilmsContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 900px;
  height: 100%;
  max-height: 100px;
`;

const StyledCloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  border: none;
  font-size: 18px;
  color: white;
  cursor: pointer;
`;

class ErrorBoundary extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Что-то пошло не так</h1>;
    }

    return this.props.children;
  }
}

const Films: React.FC<FilmsProps> = ({ searchTerm }) => {
  const [movies, setMovies] = useState<Film[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('/api/movies', {
          params: {
            page,
            perPage: 10,
          },
        });
        setMovies(response.data.movies);
        setTotalPages(Math.ceil(response.data.totalCount / 20));
      } catch (err) {
        console.error('Error fetching movies:', err);
        setError('Произошла ошибка при загрузке фильмов');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [page]);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>{error}</div>;

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm?.toLowerCase() || ''),
  );

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handleClose = () => {
    navigate('/');
  };

  return (
    <Container>
      <Header />
      <FilmsContainer>
        <TextStyled>Фильмы смотреть онлайн</TextStyled>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {filteredMovies.map((movie) => (
            <Card
              key={movie.id}
              title={movie.title}
              img={movie.img}
              subscription={movie.subscription}
            />
          ))}
        </div>
        <div
          style={{
            marginTop: '20px',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <button onClick={handlePreviousPage} disabled={page === 1}>
            Предыдущая
          </button>
          <span>
            Страница {page} из {totalPages}
          </span>
          <button onClick={handleNextPage} disabled={page >= totalPages}>
            Следующая
          </button>
        </div>
      </FilmsContainer>
    </Container>
  );
};

export default Films;
