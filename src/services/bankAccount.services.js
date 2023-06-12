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
  fetch('http://localhost:3000/bankAccounts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(bankAccountData),
  });
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
