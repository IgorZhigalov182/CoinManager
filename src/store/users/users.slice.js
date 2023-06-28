import { createSlice } from '@reduxjs/toolkit';
import userService from '../../services/user.services';

export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    lastFetch: null,
    // auth: { userId: localStorageService.getUserId() },
    // isLoggedIn: true,
  },

  reducers: {},
});

const { reducer: usersReducer, actions } = usersSlice;
const { categoriesCreated } = actions;

export default usersReducer;
