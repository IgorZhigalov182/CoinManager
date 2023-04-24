import { combineReducers, configureStore } from '@reduxjs/toolkit';
import categoriesReducer from './categories/categories.slice';

// const reducers = combineReducers({
//   categories: reducer,
// });
const rootReducer = combineReducers({ categories: categoriesReducer });

// export const store = configureStore({
//   reducer: rootReducer,
//   devTools: true,
// });

export function createStore() {
  return configureStore({
    reducer: rootReducer,
  });
}
