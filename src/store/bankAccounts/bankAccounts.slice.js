import { createSlice } from '@reduxjs/toolkit';
import {
  deleteBankAccount,
  getDataBankAccounts,
  updateBankAccount,
  resetFavouritesBankAccount,
  addBankAccount,
  checkRemoveBankAccountForFavourite,
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
    },
    bankAccountUpdated: (state, action) => {
      const index = state.entities.findIndex((bankAccount) => bankAccount.id === action.payload.id);
      state.entities[index] = action.payload;
    },
    bankAccountCreated: (state, action) => {
      state.entities.push(action.payload);
    },
    bankAccountFavourited: (state, action) => {
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
  bankAccountFavourited,
  resetBankAccountFavourite,
  bankAccountCreated,
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

export const createBankAccount = (data, bankAccounts) => async (dispatch) => {
  try {
    if (data.active) {
      dispatch(resetBankAccountFavourite(bankAccounts));
      resetFavouritesBankAccount(bankAccounts);
    }
    addBankAccount(data);
    return dispatch(bankAccountCreated(data));
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
    return dispatch(bankAccountFavourited(id));
  } catch (error) {
    console.log(error);
  }
};

export const deleteBankAccountById = (id, bankAccounts) => (dispatch) => {
  try {
    deleteBankAccount(id);
    dispatch(bankAccountDeleted(id));

    if (checkRemoveBankAccountForFavourite(id, bankAccounts)) {
      const arrWithoutRemovedFavouriteBankAccount = [...bankAccounts].filter((bankAccount) => {
        return bankAccount.id !== id;
      });

      const anotherId = arrWithoutRemovedFavouriteBankAccount[0].id;
      dispatch(bankAccountFavourited(anotherId));
    }
  } catch (error) {
    console.log(error);
  }
};

export const getActiveBankAccount = () => (state) => {
  if (state.bankAccounts.entities) {
    return state.bankAccounts.entities.filter((bankAccount) => bankAccount.active === true)[0].id;
  }
};

export const getBankAccountDisplayNameById = (id) => (state) => {
  let name = '';
  if (state.bankAccounts.entities) {
    state.bankAccounts.entities.filter((bankAccount) => {
      if (bankAccount.id == id) {
        name = bankAccount.name;
      }
    });
  }
  return name;
};

// export const filterTypeBankAccounts = (type) => (state) => {
//   if (type === 'Все') {
//     return state.bankAccounts.entities;
//   }

//   if (state.bankAccounts.entities) {
//     return state.bankAccounts.entities.filter((o) => o.type === type);
//   }
// };

export default bankAccountsReducer;
