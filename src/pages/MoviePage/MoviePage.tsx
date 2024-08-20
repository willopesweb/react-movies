import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieDetails } from '../../api/movieApi';
import { Movie, baseImageUrl } from '../../types';
import Image from '../../components/Image/Image';
import "./MoviePage.scss";

const MoviePage = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const movieDetails = await fetchMovieDetails(id!);
        setMovie(movieDetails);
      } catch (error) {
        console.error('Erro ao buscar detalhes do filme:', error);
      }
    };

    getMovieDetails();
  }, [id]);

  return (
    <main className="l-movie">

      {movie ? (
        <div className="l-movie__content">
          <div className="l-movie__poster">
            <Image src={`${baseImageUrl}${movie.poster_path}`} alt={movie.title} />
          </div>
          <div className="l-movie__info">
            <h1>{movie.title}</h1>
            <p>{movie.overview}</p>
            <ul className="l-movie__genres">
              <ul className="l-movie__genres">
                {movie.genres && movie.genres.map((genre) => (
                  <li key={genre.id}>{genre.name}</li>
                ))}
              </ul>
            </ul>
          </div>

        </div>
      ) : (
        <p>Carregando...</p>
      )}

    </main>
  );
};

export default MoviePage;