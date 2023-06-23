import { createSlice, current } from '@reduxjs/toolkit';
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
};

export const getCountOperations = (title) => (state) => {
  const typeOperation = title === 'Доходы' ? 'profit' : 'expense';
  let length = 0;
  if (state.operations.entities) {
    let arr = [...state.operations.entities].filter((operation) => {
      return operation.typeOperation === typeOperation;
    });
    length = arr.length;
    // console.log(length);
  }
  return length;
};

export const getSumOperations = (title) => (state) => {
  const typeOperation = title === 'Доходы' ? 'profit' : 'expense';
  if (state.operations.entities) {
    let sum = [...state.operations.entities]
      .filter((operation) => {
        return operation.typeOperation === typeOperation;
      })
      .map((operation) => operation.sum)
      .reduce((prevVal, curVal) => prevVal + curVal, 0);

    return sum;
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
