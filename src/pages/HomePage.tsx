import { useState, useEffect } from 'react'
import { fetchMovies } from '../api/movieApi';
import MovieList from '../components/MovieList/MovieList';
import { Movie } from "../types";
import Pagination from '../components/Pagination/Pagination';
import { useSearchParams } from 'react-router-dom';

const HomePage = () => {
  const [queryParams] = useSearchParams();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const currentPage = parseInt(queryParams.get('page') || '1', 10);


  useEffect(() => {
    const getMovies = async () => {
      try {
        const { results, total_pages } = await fetchMovies(currentPage);
        setMovies(results);
        setTotalPages(total_pages);
      } catch (error) {
        console.error('Erro ao buscar filmes:', error);
      }
    }

    getMovies();
  }, [currentPage])

  return (
    <main>
      <header className="l-page__header">
        <h1 className="l-page__title">Filmes populares</h1>
      </header>
      <MovieList movies={movies} />
      {totalPages > 1 && (
        <Pagination totalPages={totalPages} currentPage={currentPage} hideNumbers={true} />
      )}
    </main>
  );
}

export default HomePage