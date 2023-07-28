import React from 'react';
import Button from './common/button/Button';
import PropTypes from 'prop-types';
import { setTitileTypeBankAccount } from '../../services/bankAccount.services';

const CardBankAccount = ({
  setModalActive,
  name,
  typeAccount,
  bank,
  active,
  _id,
  toggleFavourite,
}) => {
  return (
    <>
      <div
        className="card text-bg-info mb-3 me-3"
        style={{ maxWidth: '22rem', maxHeight: '30rem' }}>
        {active ? (
          <div className="position-absolute top-0 end-0">
            <Button
              handler={() => toggleFavourite(_id)}
              className={'btn btn-success'}
              title={<i className="fa-solid fa-star"></i>}
            />
          </div>
        ) : (
          <div className="position-absolute top-0 end-0">
            <Button
              handler={() => toggleFavourite(_id)}
              className={'btn btn-secondary'}
              title={<i className="fa-regular fa-star"></i>}
            />
          </div>
        )}

        <div className="card-body">
          <h3 className="card-title w-75">{name}</h3>
          <h5 className="card-title">
            <i className="fa-solid fa-building-columns me-2"></i>
            {bank}
          </h5>
          <h5 className="card-title">
            <i className="fa-solid fa-font-awesome me-2"></i>
            {setTitileTypeBankAccount(typeAccount)}
          </h5>
          <div>
            <Button
              className={'btn btn-secondary position-absolute bottom-0 end-0'}
              title={<i className="fa-solid fa-gear"></i>}
              handler={() => setModalActive(_id)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CardBankAccount;

CardBankAccount.propTypes = {
  setModalActive: PropTypes.func,
  name: PropTypes.string,
  typeAccount: PropTypes.string,
  bank: PropTypes.string,
  active: PropTypes.bool,
  _id: PropTypes.string,
  toggleFavourite: PropTypes.func,
};
