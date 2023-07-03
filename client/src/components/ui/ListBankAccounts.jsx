import React from 'react';
import PropTypes from 'prop-types';
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

ListBankAccounts.propTypes = {
  bankAccounts: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  setModalActive: PropTypes.func,
  toggleFavourite: PropTypes.func,
};

export default ListBankAccounts;
