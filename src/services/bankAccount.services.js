import axios from 'axios';
import config from '../config.json';
import httpService from './http.services';

// const httpAuth = axios.create({
//   baseURL: config.apiEndpoint + '/bankAccount',
// });

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
        equalTo: `${userId}`,
      },
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
      bankAccountData,
    );
    return data;
  },
  resetFavouritesBankAccount: async (bankAccounts) => {
    bankAccounts.forEach(async (bankAccount) => {
      const updatedData = { ...bankAccount, active: false };

      try {
        await bankAccountService.updateBankAccount(updatedData);
      } catch (error) {
        console.log(error);
      }
    });
  },
  doBankAccountFavourite: async (id, bankAccounts) => {
    let favouriteBankAccount = bankAccounts.filter((bankAccount) => bankAccount._id === id)[0];
    favouriteBankAccount = { ...favouriteBankAccount, active: true };

    try {
      bankAccountService.updateBankAccount(favouriteBankAccount);
    } catch (error) {
      console.log(error);
    }
  },
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
    console.log(operations);
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

/*****for JSON-server******/

// export const doBankAccountFavourite = async (id, bankAccounts) => {
//   let favouriteBankAccount = bankAccounts.filter((bankAccount) => bankAccount.id === id)[0];
//   favouriteBankAccount = { ...favouriteBankAccount, active: true };

//   try {
//     await fetch(`http://localhost:3000/bankAccounts/${id}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json;charset=utf-8',
//       },
//       body: JSON.stringify(favouriteBankAccount),
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const resetFavouritesBankAccount = async (bankAccounts) => {
//   bankAccounts.forEach(async (bankAccount) => {
//     const updatedData = { ...bankAccount, active: false };

//     try {
//       await fetch(`http://localhost:3000/bankAccounts/${bankAccount.id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json;charset=utf-8',
//         },
//         body: JSON.stringify(updatedData),
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   });
// };

// export const updateBankAccount = async (bankAccountData) => {
//   try {
//     await fetch(`http://localhost:3000/bankAccounts/${bankAccountData.id}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json;charset=utf-8',
//       },
//       body: JSON.stringify(bankAccountData),
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const deleteBankAccount = async (id) => {
//   try {
//     const response = await fetch(`http://localhost:3000/bankAccounts/${id}`, {
//       method: 'DELETE',
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const getDataBankAccounts = async () => {
//   try {
//     const response = await fetch('http://localhost:3000/bankAccounts');
//     const bankAccounts = await response.json();
//     return bankAccounts;
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const addBankAccount = async (bankAccountData) => {
//   try {
//     await fetch('http://localhost:3000/bankAccounts', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json;charset=utf-8',
//       },
//       body: JSON.stringify(bankAccountData),
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

export const getBankAccount = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/bankAccounts/${id}`);
    const bankAccount = await response.json();
    return bankAccount;
  } catch (error) {
    console.log(error);
  }
};
