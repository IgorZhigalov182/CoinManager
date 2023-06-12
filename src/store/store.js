import { combineReducers, configureStore } from '@reduxjs/toolkit';
import categoriesReducer from './categories/categories.slice';
import operationReducer from './operations/operations.slice';
import bankAccountsReducer from './bankAccounts/bankAccounts.slice';

const rootReducer = combineReducers({
  categories: categoriesReducer,
  operations: operationReducer,
  bankAccounts: bankAccountsReducer,
});

export function createStore() {
  return configureStore({
    reducer: rootReducer,
  });
}
