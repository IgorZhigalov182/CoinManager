import { createAction, createSlice } from '@reduxjs/toolkit';

export const operationsSlice = createSlice({
  name: 'operations',
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    lastFetch: null,
  },

  reducers: {
    operationsRequested: (state) => {
      state.isLoading = true;
    },
    // addCategories: (state, { payload: category }) => {
    //   const isExist = state.some((cat) => cat.id === category.id);

    //   if (isExist) return;

    //   state.push(category);
    // },
    // categoriesRequested: (state) => {
    //   state.isLoading = true;
    // },
    // categoriesReceived: (state, action) => {
    //   state.entities = action.payload;
    //   state.isLoading = false;
    //   state.lastFetch = Date.now();
    // },
    // categoriesRequestFailed: (state, action) => {
    //   state.error = action.payload;
    //   state.isLoading = false;
    // },
  },
});

const { reducer: operationReducer, actions } = operationsSlice;

const { operationsRequested } = actions;

const operationCreateRequested = createAction('operations/operationsCreateRequested');

export const getOpetations = () => (state, action) => state;
