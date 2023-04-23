import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { reducer } from './categories/categories.slice';

const reducers = combineReducers({
  categories: reducer,
});

export const store = configureStore({
  reducer: reducers,
  devTools: true,
});
