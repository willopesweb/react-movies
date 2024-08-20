import { Movie, baseImageUrl } from "../../types";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import Icon from '../Icon';
import "./MovieCard.scss";
import { useState } from "react";
import Image from "../Image/Image";
import { toggleFavoriteMovie } from "../../api/movieApi";
import { addFavorite, removeFavorite } from '../../redux/slices/favoriteSlice';


interface MovieCardProps {
  movie: Movie;
  favorite: boolean;
}

const MovieCard = ({ movie, favorite }: MovieCardProps) => {
  const [isFavorite, setIsFavorite] = useState(favorite);
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
  const userId = useSelector((state: RootState) => state.user.userId);

  const dispatch = useDispatch();

  const handleFavorite = async () => {
    if (isAuthenticated) {
      try {
        await toggleFavoriteMovie(userId, movie.id, !isFavorite);
        if (isFavorite) {
          dispatch(removeFavorite(movie.id));
        } else {
          dispatch(addFavorite(movie));
        }
        setIsFavorite(!isFavorite);
      } catch (error) {
        console.error('Erro ao adicionar/remover favorito:', error);
      }
    } else {
      alert('Você precisa estar logado para adicionar favoritos.');
    }
  }

  return (
    <article className="c-movie">
      {isAuthenticated && (
        <div className="c-movie__favorite" onClick={handleFavorite}>
          {isFavorite ? <Icon size={40} icon="star" /> : <Icon size={40} icon="star_outline" />}
        </div>
      )}

      <Link to={`/movie/${movie.id}`}>

        <div className="c-movie__image">
          <Image height="330" width="220" src={`${baseImageUrl}${movie.poster_path}`} alt={movie.title} title={movie.title} loading="lazy" />
        </div>
        <h1 className="c-movie__title">{movie.title}</h1>
      </Link>
    </article>
  )
}

export default MovieCard