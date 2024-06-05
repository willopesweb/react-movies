import React from 'react'
import { Link } from 'react-router-dom';

const MovieList = ({ movies }) => {
  return (
    <div>
      {movies.map(movie => (
        <div key={movie.id}>
          <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
        </div>
      ))}
    </div>
  )
}

export default MovieList;