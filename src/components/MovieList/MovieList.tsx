import MovieCard from '../MovieCard/MovieCard';
import { Movie } from '../../types';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import "./MovieList.scss"

interface MovieListProps {
  movies: Movie[];
}

const MovieList = ({ movies }: MovieListProps) => {
  const favoriteMovies = useSelector((state: RootState) => state.favorite.movies);
  const isFavorite = (movieId: number) => favoriteMovies.some(favMovie => favMovie.id === movieId);

  return (
    <div className="c-movies">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} favorite={isFavorite(movie.id)} />
      ))}
    </div>
  )
}

export default MovieList;