// favoriteSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchFavoriteMovies } from '../../api/movieApi'; // Importar a função correta
import { Movie } from '../../types';

interface FavoriteState {
  movies: Movie[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  totalPages: number;
  currentPage: number;
}

const initialState: FavoriteState = {
  movies: [],
  status: 'idle',
  error: null,
  totalPages: 0,
  currentPage: 0,
};

// Thunk para buscar e armazenar todas as páginas de filmes favoritos
export const fetchAndSetFavoriteMovies = createAsyncThunk(
  'favorite/fetchAndSetFavoriteMovies',
  async ({ accountId }: { accountId: string | null }, { rejectWithValue }) => {
    let currentPage = 1;
    let totalPages = 1;
    let allMovies: Movie[] = [];

    while (currentPage <= totalPages) {
      try {
        const response = await fetchFavoriteMovies(accountId, currentPage);
        allMovies = [...allMovies, ...response.results];
        totalPages = response.total_pages;
        currentPage++;
      } catch (error: any) {
        return rejectWithValue(error.response.data);
      }
    }

    return { movies: allMovies, totalPages };
  }
);

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    setFavoriteMovies: (state, action: PayloadAction<{ movies: Movie[]; totalPages: number }>) => {
      state.movies = action.payload.movies;
      state.totalPages = action.payload.totalPages;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    clearFavorites: (state) => {
      state.movies = [];
      state.totalPages = 0;
      state.currentPage = 0;
    },
    addFavorite: (state, action: PayloadAction<Movie>) => {
      const movie = action.payload;
      if (!state.movies.some(favMovie => favMovie.id === movie.id)) {
        state.movies.push(movie);
      }
    },
    removeFavorite: (state, action: PayloadAction<number>) => {
      state.movies = state.movies.filter(movie => movie.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAndSetFavoriteMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAndSetFavoriteMovies.fulfilled, (state, action) => {
        state.movies = action.payload.movies;
        state.totalPages = action.payload.totalPages;
        state.status = 'succeeded';
      })
      .addCase(fetchAndSetFavoriteMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { setFavoriteMovies, setCurrentPage, clearFavorites, addFavorite, removeFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;
