import httpService from './http.services';

const bankAccountEndpoint = '/bankAccount';

const bankAccountService = {
  createBankAccount: async (payload) => {
    const { data } = await httpService.post(bankAccountEndpoint, payload);
    return data;
  },
  getBankAccounts: async (userId) => {
    const { data } = await httpService.get(bankAccountEndpoint, {
      params: {
        orderBy: 'userId',
        equalTo: `${userId}`
      }
    });
    return data;
  },
  removeBankAccount: async (bankAccountId) => {
    const { data } = await httpService.delete(bankAccountEndpoint + '/' + bankAccountId);
    return data;
  },
  updateBankAccount: async (bankAccountData) => {
    const { data } = await httpService.patch(
      bankAccountEndpoint + '/' + bankAccountData._id,
      bankAccountData
    );
    return data;
  },
  resetFavouritesBankAccount: async (bankAccounts) => {
    const activeBankAccount = bankAccounts.filter((bankAccount) => bankAccount.active)[0];

    try {
      await bankAccountService.updateBankAccount({ ...activeBankAccount, active: false });
    } catch (error) {
      console.log(error);
    }
  },
  doBankAccountFavourite: async (id, bankAccounts) => {
    let favouriteBankAccount = bankAccounts.filter((bankAccount) => bankAccount._id === id)[0];
    favouriteBankAccount = { ...favouriteBankAccount, active: true };

    try {
      bankAccountService.updateBankAccount(favouriteBankAccount);
    } catch (error) {
      console.log(error);
    }
  }
};

export const setTitileTypeBankAccount = (title) => {
  let titleInTag = '';
  switch (title) {
    case 'current':
      titleInTag = 'Текущий';
      break;
    case 'credit':
      titleInTag = 'Кредитный';
      break;
    case 'estimated':
      titleInTag = 'Расчётный (для ИП)';
      break;
    default:
      titleInTag = '';
      break;
  }

  return titleInTag;
};

export const checkRemoveBankAccountForFavourite = (id, bankAccounts) => {
  let state = '';
  bankAccounts.forEach((bankAccount) => {
    if (bankAccount.id === id) {
      state = bankAccount.active;
    }
  });
  return state;
};

export const getMostUsedBankAccount = (operations) => {
  const counts = {};

  if (operations) {
    for (let i = 0; i < operations.length; i++) {
      const item = operations[i].idBankAccount;
      counts[item] = counts[item] ? counts[item] + 1 : 1;
    }

    const pairs = Object.entries(counts);
    const mostUsedBankAccountId = pairs.sort((a, b) => b[1] - a[1]).slice(0, 3);
    return mostUsedBankAccountId;
  }
};

export default bankAccountService;
