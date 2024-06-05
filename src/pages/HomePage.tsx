import { useState, useEffect } from 'react'
import { fetchMovies } from '../api/movieApi';
import MovieList from '../components/MovieList';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const getMovies = async () => {
      const movies = await fetchMovies();
      setMovies(movies);
    }

    getMovies();
  })

  return (
    <MovieList movies={movies} />
  )
}

export default HomePage