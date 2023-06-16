import { createSlice } from '@reduxjs/toolkit';
import {
  deleteBankAccount,
  getDataBankAccounts,
  getBankAccount,
  updateBankAccount,
  resetFavouritesBankAccount,
} from '../../services/bankAccount.services';

export const bankAccountsSlice = createSlice({
  name: 'bankAccounts',
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    lastFetch: null,
  },

  reducers: {
    bankAccountsRequested: (state) => {
      state.isLoading = true;
    },
    bankAccountRequested: (state) => {
      state.isLoading = true;
    },
    bankAccountsRecieved: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    bankAccountRecieved: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
      // state.entities = state.entities.filter((obj) => obj.id == action.payload);
    },
    bankAccountUpdated: (state, action) => {
      const index = state.entities.findIndex((bankAccount) => bankAccount.id === action.payload.id);
      state.entities[index] = action.payload;
    },
    bankAccountFavourite: (state, action) => {
      state.entities = [...state.entities].map((bankAccount) => {
        if (bankAccount.id === action.payload) {
          return { ...bankAccount, active: true };
        }
        return { ...bankAccount, active: false };
      });
    },
    resetBankAccountFavourite: (state, action) => {
      state.entities = [...state.entities].map((bankAccount) => {
        return { ...bankAccount, active: false };
      });
    },
    bankAccountDeleted: (state, action) => {
      // console.log('state', state.entities);
      // console.log('action', action.payload);
      state.entities = [...state.entities].filter((bankAccount) => {
        return bankAccount.id !== action.payload;
      });
    },
  },
});

const { reducer: bankAccountsReducer, actions } = bankAccountsSlice;

const {
  bankAccountsRequested,
  bankAccountRequested,
  bankAccountRecieved,
  bankAccountDeleted,
  bankAccountUpdated,
  bankAccountFavourite,
  resetBankAccountFavourite,
} = actions;

export const loadBankAccountList = () => async (dispatch) => {
  dispatch(bankAccountsRequested());

  try {
    const bankAccounts = await getDataBankAccounts();
    dispatch(bankAccountRecieved(bankAccounts));
  } catch (error) {
    console.log(error);
  }
};

export const getBankAccountList = (id) => (state) => state.bankAccounts.entities;

export const sortBankAccounts = () => (state) => {
  console.log(state.bankAccounts.entities);
};

export const getBankAccountsLoadingStatus = () => (state) => state.bankAccounts.isLoading;

export const getBankAccountById = (id) => (state) => {
  console.log(id);
  if (state.bankAccounts.entities) {
    return state.bankAccounts.entities.find((o) => o.id == id);
  }
};

export const updatedBankAccountById = (data, bankAccounts) => (dispatch) => {
  try {
    if (data.active) {
      dispatch(resetBankAccountFavourite(bankAccounts));
      resetFavouritesBankAccount(bankAccounts);
    }
    updateBankAccount(data);
    return dispatch(bankAccountUpdated(data));
  } catch (error) {
    console.log(error);
  }
};

export const favouritedBankAccountById = (id) => (dispatch) => {
  try {
    // updateBankAccount(data);
    return dispatch(bankAccountFavourite(id));
  } catch (error) {
    console.log(error);
  }
};

export const deleteBankAccountById = (id) => (dispatch) => {
  try {
    deleteBankAccount(id);
    return dispatch(bankAccountDeleted(id));
  } catch (error) {
    console.log(error);
  }
};

export const filterTypeBankAccounts = (type) => (state) => {
  if (type === 'Все') {
    return state.bankAccounts.entities;
  }

  if (state.bankAccounts.entities) {
    return state.bankAccounts.entities.filter((o) => o.type === type);
  }
};

export default bankAccountsReducer;
