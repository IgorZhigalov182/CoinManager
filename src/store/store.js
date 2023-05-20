import { combineReducers, configureStore } from '@reduxjs/toolkit';
import categoriesReducer from './categories/categories.slice';
import operationReducer from './operations/operations.slice';

const rootReducer = combineReducers({
  categories: categoriesReducer,
  operations: operationReducer,
});

export function createStore() {
  return configureStore({
    reducer: rootReducer,
  });
}
