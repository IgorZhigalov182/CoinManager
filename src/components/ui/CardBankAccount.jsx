import React from 'react';
import Button from './common/Button';

const CardBankAccount = ({ name, typeAccount, userId, bank, active }) => {
  return (
    <>
      <div className="card text-bg-info mb-3" style={{ maxWidth: '18rem' }}>
        <div className="card-header">
          {name}
          {active ? <p>Основной!</p> : ''}
        </div>
        <div className="card-body">
          <h5 className="card-title">{typeAccount}</h5>
          <h5 className="card-title">{bank}</h5>
          {/* <p className="card-text">
            Some quick example text to build on the card title and make up the bulk of the card's
            content.
          </p> */}
          <Button title={'Изменить'} />
        </div>
      </div>
    </>
  );
};

export default CardBankAccount;
