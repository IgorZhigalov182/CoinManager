import { createSlice } from '@reduxjs/toolkit';
import {
  deleteBankAccount,
  getDataBankAccounts,
  getBankAccount,
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
    bankAccountDeleted: (state, action) => {
      // console.log('state', state.entities);
      // console.log('action', action.payload);
      state.entities = state.entities.filter((bankAccount) => {
        return bankAccount.id !== action.payload;
      });
    },
  },
});

const { reducer: bankAccountsReducer, actions } = bankAccountsSlice;

const { bankAccountsRequested, bankAccountRequested, bankAccountRecieved, bankAccountDeleted } =
  actions;

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
// export const getMembersLoadingStatus = () => (state) => state.members.isLoading;

export const getBankAccountById = (id) => (state) => {
  if (state.bankAccounts.entities) {
    return state.bankAccounts.entities.find((o) => o.id == id);
  }
};

export const deleteBankAccountById = (id) => (dispatch) => {
  try {
    deleteBankAccount(id);
    dispatch(bankAccountDeleted(id));
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
