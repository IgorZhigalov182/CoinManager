import { createSlice } from '@reduxjs/toolkit';
import { getDataOperations, getOperation } from '../../services/operations.services';

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
    operationRequested: (state) => {
      state.isLoading = true;
    },
    operationsRecieved: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    operationRecieved: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
      // state.entities = state.entities.filter((obj) => obj.id == action.payload);
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

export const getOperationList = (id) => (state) => state.operations.entities;

export const sortOperations = () => (state) => {
  console.log(state.operations.entities);
};

export const getOperationsLoadingStatus = () => (state) => state.operations.isLoading;
// export const getMembersLoadingStatus = () => (state) => state.members.isLoading;

export const getOperationById = (id) => (state) => {
  if (state.operations.entities) {
    return state.operations.entities.find((o) => o.id == id);
  }
};

export default operationReducer;
