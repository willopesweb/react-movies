import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MoviePage from './pages/MoviePage';
import FavoritesPage from './pages/FavoritesPage';
import Header from './components/Header/Header';
import './assets/scss/styles.scss';

function App() {


  return (
    <Header>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movie/:id" element={<MoviePage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
      </BrowserRouter>
    </Header>
  )
}

export default App
