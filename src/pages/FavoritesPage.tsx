import React from 'react';
import { useSelector } from 'react-redux';
import MovieList from '../components/MovieList';

const FavoritesPage = () => {
  const favorites = useSelector(state => state.favorites);
  return (
    <div>
      <h1>Favoritos</h1>
      <MovieList movies={favorites} />
    </div>
  )
}

export default FavoritesPage