import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom';
import { fetchMoviesBySearch } from '../api/movieApi';
import MovieList from '../components/MovieList/MovieList';
import { Movie } from "../types";
import Pagination from '../components/Pagination/Pagination';

const SearchPage = () => {
  const [queryParams] = useSearchParams();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const currentPage = parseInt(queryParams.get('page') || '1', 10);
  const query = queryParams.get('query');

  useEffect(() => {
    const searchMovies = async () => {
      if (query) {
        const { results, total_pages } = await fetchMoviesBySearch(query, currentPage);
        setMovies(results);
        setTotalPages(total_pages);
      }
    };

    searchMovies();
  }, [query, currentPage]);

  return (
    <main>
      <header className="l-page__header">
        <h1 className="l-page__title">Resultados para: {query}</h1>
      </header>
      <MovieList movies={movies} />
      {totalPages > 1 && (
        <Pagination query={query as string} totalPages={totalPages} currentPage={currentPage} />
      )}
    </main>
  );
}

export default SearchPage