import { AppDispatch } from "./redux/store";
import { User } from "./types";
import { login, logout } from './redux/slices/userSlice';
import { fetchAccountData } from './api/authApi';
import { fetchAndSetFavoriteMovies, clearFavorites } from './redux/slices/favoriteSlice';

export const checkSession = async (dispatch: AppDispatch) => {
  const sessionId = localStorage.getItem('session_id');

  if (sessionId) {
    try {
      const userData: User | null = await fetchAccountData(sessionId);
      if (userData) {
        dispatch(login({ username: userData.username, userId: userData.id, sessionId }));
        dispatch(fetchAndSetFavoriteMovies({ accountId: userData.id }));
      } else {
        localStorage.removeItem('session_id');
        dispatch(logout());
      }
    } catch (error) {
      logoutUser(dispatch);
    }
  }
};

export const logoutUser = (dispatch: AppDispatch) => {
  localStorage.removeItem('session_id');
  dispatch(clearFavorites());
  dispatch(logout());
}
