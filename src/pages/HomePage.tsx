import { useState, useEffect } from 'react'
import { fetchMovies } from '../api/movieApi';
import MovieList from '../components/MovieList/MovieList';
import { Movie } from "../types";

const HomePage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  useEffect(() => {
    const getMovies = async () => {
      try {
        const movies = await fetchMovies();
        setMovies(movies);
      } catch (error) {
        console.error('Erro ao buscar filmes:', error);
      }
    }

    getMovies();
  }, [])

  return (
    <main>
      <MovieList movies={movies} />
    </main>
  );
}

export default HomePage