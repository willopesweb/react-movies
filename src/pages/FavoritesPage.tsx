import { useState, useEffect } from 'react'
import { fetchFavoriteMovies } from '../api/movieApi';
import MovieList from '../components/MovieList/MovieList';
import { Movie } from "../types";
import Pagination from '../components/Pagination/Pagination';
import Notification from '../components/Notification/Notification';
import { useSearchParams } from 'react-router-dom';
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';


const FavoritesPage = () => {
  const [queryParams] = useSearchParams();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const currentPage = parseInt(queryParams.get('page') || '1', 10);

  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
  const userId = useSelector((state: RootState) => state.user.userId);



  useEffect(() => {
    const getMovies = async () => {
      try {
        const { results, total_pages } = await fetchFavoriteMovies(userId, currentPage);
        setMovies(results);
        setTotalPages(total_pages);
      } catch (error) {
        console.error('Erro ao buscar filmes:', error);
      }
    }

    getMovies();
  }, [currentPage])

  if (isAuthenticated) {
    return (
      <main>
        <header className="l-page__header">
          <h1 className="l-page__title">Meus favoritos</h1>
        </header>
        <MovieList movies={movies} />
        {totalPages > 1 && (
          <Pagination totalPages={totalPages} currentPage={currentPage} hideNumbers={true} />
        )}
      </main>
    );
  } else {
    return (
      <Notification message='Você precisa estar logado para ver seus favoritos' type='warning' />
    )
  }
}

export default FavoritesPage