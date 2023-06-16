export const getDataBankAccounts = async () => {
  try {
    const response = await fetch('http://localhost:3000/bankAccounts');
    const bankAccounts = await response.json();
    return bankAccounts;
  } catch (error) {
    console.log(error);
  }
};

export const addBankAccount = async (bankAccountData) => {
  try {
    await fetch('http://localhost:3000/bankAccounts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(bankAccountData),
    });
  } catch (error) {
    console.log(error);
  }
};

export const resetFavouritesBankAccount = async (bankAccounts) => {
  bankAccounts.forEach(async (bankAccount) => {
    const updatedData = { ...bankAccount, active: false };

    try {
      await fetch(`http://localhost:3000/bankAccounts/${bankAccount.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(updatedData),
      });
    } catch (error) {
      console.log(error);
    }
  });
};

export const doBankAccountFavourite = async (id, bankAccounts) => {
  let favouriteBankAccount = bankAccounts.filter((bankAccount) => bankAccount.id === id)[0];
  favouriteBankAccount = { ...favouriteBankAccount, active: true };

  try {
    await fetch(`http://localhost:3000/bankAccounts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(favouriteBankAccount),
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateBankAccount = async (bankAccountData) => {
  try {
    await fetch(`http://localhost:3000/bankAccounts/${bankAccountData.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(bankAccountData),
    });
  } catch (error) {
    console.log(error);
  }
};

export const getBankAccount = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/bankAccounts/${id}`);
    const bankAccount = await response.json();
    return bankAccount;
  } catch (error) {
    console.log(error);
  }
};

export const deleteBankAccount = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/bankAccounts/${id}`, {
      method: 'DELETE',
    });
  } catch (error) {
    console.log(error);
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
