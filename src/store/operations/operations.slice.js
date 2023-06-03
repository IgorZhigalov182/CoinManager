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
      state.entities = state.entities.filter((obj) => obj.id == action.payload);
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

// export const getOperationById = (id) => (dispatch) => {
//   try {
//     dispatch(operationRecieved(id));
//   } catch (error) {
//     console.log(error);
//   }
// };

export const getOperationById = (id) => (state) => {
  if (state.operations.entities) {
    return state.operations.entities.find((o) => o.id == id);
  }
};

export default operationReducer;
