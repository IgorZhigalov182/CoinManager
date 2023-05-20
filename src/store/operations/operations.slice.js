import { createSlice } from '@reduxjs/toolkit';
import { getDataOperations, getOperation } from '../../services/operations.services';

export const operationsSlice = createSlice({
  name: 'operations',
  initialState: {
    entities: null,
    isLoading: false,
    error: null,
    lastFetch: null,
  },

  reducers: {
    operationsRequested: (state) => {
      state.isLoading = false;
    },
    operationRequested: (state) => {
      state.isLoading = false;
    },
    operationsRecieved: (state, action) => {
      state.entities = action.payload;
      state.isLoading = true;
    },
    operationRecieved: (state, action) => {
      state.entities = action.payload;
      state.isLoading = true;
    },
  },
});

const { reducer: operationReducer, actions } = operationsSlice;

const { operationsRequested, operationRequested, operationsRecieved, operationRecieved } = actions;

export const loadOperationList = () => async (dispatch) => {
  dispatch(operationsRequested());

  try {
    const operations = await getDataOperations();
    dispatch(operationsRecieved(operations));
  } catch (error) {
    console.log(error);
  }
};

export const getOperationList = () => (state) => state.operations.entities;

export const getOperationById = (id) => async (dispatch) => {
  dispatch(operationRequested());

  try {
    const operation = await getOperation(id);
    dispatch(operationRecieved(operation));
  } catch (error) {
    console.log(error);
  }
};

export const getOperationU = () => (state) => state.operations.entities;

export default operationReducer;
