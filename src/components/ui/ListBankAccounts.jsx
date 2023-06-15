import React from 'react';
import CardBankAccount from './CardBankAccount';

const ListBankAccounts = ({ bankAccounts }) => {
  return (
    <div className="container">
      {/* <div className="container text-center"> */}
      <div className="row row-cols-3">
        {bankAccounts &&
          bankAccounts.map((bankData) => {
            return <CardBankAccount {...bankData} key={bankData.id} />;
          })}
      </div>
    </div>
  );
};

export default ListBankAccounts;
