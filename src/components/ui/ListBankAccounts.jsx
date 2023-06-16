import React from 'react';
import CardBankAccount from './CardBankAccount';
import Button from './common/Button';

const ListBankAccounts = ({ bankAccounts, setModalActive, toggleFavourite }) => {
  return (
    <>
      <div className="container">
        {/* <div className="container text-center"> */}
        <div className="row row-cols-3">
          {bankAccounts &&
            bankAccounts.map((bankData) => {
              return (
                <CardBankAccount
                  toggleFavourite={toggleFavourite}
                  key={bankData.id}
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
