import React from 'react';
import CardBankAccount from './CardBankAccount';

const ListBankAccounts = ({ bankAccounts, setModalActive, toggleFavourite }) => {
  return (
    <>
      <div className="container">
        <div className="row row-cols-3">
          {bankAccounts &&
            bankAccounts.map((bankData) => {
              return (
                <CardBankAccount
                  toggleFavourite={toggleFavourite}
                  key={bankData._id}
                  setModalActive={setModalActive}
                  {...bankData}
                />
              );
            })}
        </div>
      </div>
    </>
  );
};

export default ListBankAccounts;
