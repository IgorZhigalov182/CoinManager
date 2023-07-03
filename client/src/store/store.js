import { applyMiddleware, combineReducers, configureStore } from '@reduxjs/toolkit';
import categoriesReducer from './categories/categories.slice';
import operationReducer from './operations/operations.slice';
import bankAccountsReducer from './bankAccounts/bankAccounts.slice';
import usersReducer from './users/users.slice';

const rootReducer = combineReducers({
  categories: categoriesReducer,
  operations: operationReducer,
  bankAccounts: bankAccountsReducer,
  users: usersReducer,
});

export function createStore() {
  return configureStore({
    reducer: rootReducer,
  });
}
