import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  username: string | null;
  userId: string | null;
  sessionId: string | null;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  username: null,
  userId: null,
  sessionId: null,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ username: string; userId: string; sessionId: string }>) {
      state.username = action.payload.username;
      state.userId = action.payload.userId;
      state.sessionId = action.payload.sessionId;
      state.isAuthenticated = true;
    },
    logout(state) {
      state.username = null;
      state.userId = null;
      state.sessionId = null;
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;