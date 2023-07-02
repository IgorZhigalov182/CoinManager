import { createSlice } from '@reduxjs/toolkit';
import bankAccountService, {
  checkRemoveBankAccountForFavourite,
} from '../../services/bankAccount.services'; // checkRemoveBankAccountForFavourite,

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
      const index = state.entities.findIndex(
        (bankAccount) => bankAccount._id === action.payload._id,
      );
      state.entities[index] = action.payload;
    },
    bankAccountCreated: (state, action) => {
      // console.log(state.entities); null
      state.entities.push(action.payload);
    },
    bankAccountFavourited: (state, action) => {
      state.entities = [...state.entities].map((bankAccount) => {
        if (bankAccount._id === action.payload) {
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
  bankAccountRecieved,
  bankAccountDeleted,
  bankAccountUpdated,
  bankAccountFavourited,
  resetBankAccountFavourite,
  bankAccountCreated,
} = actions;

export const loadBankAccountList = (userId) => async (dispatch) => {
  dispatch(bankAccountsRequested());

  try {
    const { content } = await bankAccountService.getBankAccounts(userId);
    dispatch(bankAccountRecieved(content));
  } catch (error) {
    console.log(error);
  }
};

export const createBankAccount = (data, bankAccounts) => async (dispatch) => {
  try {
    if (data.active) {
      dispatch(resetBankAccountFavourite(bankAccounts));
      bankAccountService.resetFavouritesBankAccount(bankAccounts);
    }
    const response = await bankAccountService.createBankAccount(data);
    if (response) {
      return dispatch(bankAccountCreated(data));
    }
  } catch (error) {
    console.log(error);
  }
};

export const getBankAccountList = () => (state) => state.bankAccounts.entities;

// export const sortBankAccounts = () => (state) => {
//   console.log(state.bankAccounts.entities);
// };

export const getBankAccountsLoadingStatus = () => (state) => state.bankAccounts.isLoading;

export const getBankAccountById = (id) => (state) => {
  if (state.bankAccounts.entities) {
    return state.bankAccounts.entities.find((o) => o.id == id);
  }
};

export const updatedBankAccountById = (data, bankAccounts) => async (dispatch) => {
  console.log(data);
  try {
    if (data.active) {
      dispatch(resetBankAccountFavourite(bankAccounts));
      bankAccountService.resetFavouritesBankAccount(bankAccounts);
    }

    await bankAccountService.updateBankAccount(data);
    return dispatch(bankAccountUpdated(data));
  } catch (error) {
    console.log(error);
  }
};

export const favouritedBankAccountById = (id) => async (dispatch) => {
  try {
    return dispatch(bankAccountFavourited(id));
  } catch (error) {
    console.log(error);
  }
};

export const deleteBankAccountById = (id, bankAccounts) => async (dispatch) => {
  try {
    await bankAccountService.removeBankAccount(id);
    dispatch(bankAccountDeleted(id));

    if (checkRemoveBankAccountForFavourite(id, bankAccounts)) {
      const arrWithoutRemovedFavouriteBankAccount = [...bankAccounts].filter((bankAccount) => {
        return bankAccount._id !== id;
      });

      const anotherId = arrWithoutRemovedFavouriteBankAccount[0].id;
      dispatch(bankAccountFavourited(anotherId));
    }
  } catch (error) {
    console.log(error);
  }
};

export const getActiveBankAccount = () => (state) => {
  if (state.bankAccounts.entities && state.bankAccounts.entities.length != 0) {
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

export const filterTypeBankAccounts = (type) => (state) => {
  if (type === 'Все') {
    return state.bankAccounts.entities;
  }

  if (state.bankAccounts.entities) {
    return state.bankAccounts.entities.filter((o) => o.type === type);
  }
};

export default bankAccountsReducer;
