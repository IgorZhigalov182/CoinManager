import { createSlice } from '@reduxjs/toolkit';
import {
  addOperation,
  deleteOperation,
  getDataOperations,
  getOperation,
} from '../../services/operations.services';

export const operationsSlice = createSlice({
  name: 'operations',
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    lastFetch: null,
    sort: null,
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
    operationCreated: (state, action) => {
      state.entities.push(action.payload);
    },
    operationCount: (state, action) => {
      // console.log('state', state.entities);
      // console.log('action', action.payload);
      //   state.entities = state.entities.filter(
      //     (c) => c._id !== action.payload
      // );
      if (state.entities.operations) {
        let arr = state.entities.operations.filter((operation) => {
          operation.typeOperation === action.payload;
        });
        return arr.length;
      }
      // state.entities.filter((operation) => {
      //   operation.typeOperation === action.payload;
      // });

      // if (arr) {
      //   return arr.length;
      // }
    },
    operationSorted: (state) => {
      if (!state.sort || state.sort === 'asc') {
        state.entities.sort((a, b) => {
          if (+a.sum < +b.sum) {
            return 1;
          } else {
            return -1;
          }
        });
        state.sort = 'desc';
      } else {
        state.entities.sort((a, b) => {
          if (+a.sum < +b.sum) {
            return -1;
          } else {
            return 1;
          }
        });
        state.sort = 'asc';
      }
    },
    operationDeleted: (state, action) => {
      // console.log('state', state.entities);
      // console.log('action', action.payload);
      state.entities = state.entities.filter((operation) => {
        return operation.id !== action.payload;
      });
    },
  },
});

const { reducer: operationReducer, actions } = operationsSlice;

const {
  operationsRequested,
  operationRequested,
  operationsRecieved,
  operationRecieved,
  operationCreated,
  operationDeleted,
  operationSorted,
  operationCount,
} = actions;

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

export const sortOperations = () => (dispatch) => {
  dispatch(operationSorted());
  // console.log(state.operations.entities);
};

export const getCountOperations = (title) => (dispatch) => {
  if (title === 'Доходы') {
    // console.log(dispatch(operationCount(title)));
    dispatch(operationCount(title));
  } else {
    // console.log(dispatch(operationCount(title)));
    dispatch(operationCount(title));
  }
};

export const getOperationsLoadingStatus = () => (state) => state.operations.isLoading;
// export const getMembersLoadingStatus = () => (state) => state.members.isLoading;

export const getOperationById = (id) => (state) => {
  if (state.operations.entities) {
    return state.operations.entities.find((o) => o.id == id);
  }
};

export const createOperation = (data) => async (dispatch) => {
  try {
    await addOperation(data);
    dispatch(operationCreated(data));
  } catch (error) {
    console.log(error);
  }
};

export const deleteOperationById = (id) => (dispatch) => {
  try {
    deleteOperation(id);
    dispatch(operationDeleted(id));
  } catch (error) {
    console.log(error);
  }
};

export const filterTypeOperations = (type) => (state) => {
  if (type === 'Все') {
    return state.operations.entities;
  }

  if (state.operations.entities) {
    return state.operations.entities.filter((o) => o.typeOperation === type);
  }
};

export default operationReducer;
