import React from 'react';
import Button from './common/Button';
import { setTitileTypeBankAccount } from '../../services/bankAccount.services';
import { useDispatch } from 'react-redux';
import { favouritedBankAccountById } from '../../store/bankAccounts/bankAccounts.slice';

const CardBankAccount = ({
  setModalActive,
  name,
  typeAccount,
  userId,
  bank,
  active,
  comment,
  id,
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
              handler={() => toggleFavourite(id)}
              className={'btn btn-success'}
              title={<i className="fa-solid fa-star"></i>}
            />
          </div>
        ) : (
          <div className="position-absolute top-0 end-0">
            <Button
              handler={() => toggleFavourite(id)}
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

          {/* {comment ? (
            <h6 className="card-title">
              <i class="fa-regular fa-comment me-2"></i>
              {comment}
            </h6>
          ) : (
            ''
          )} */}
          <div>
            <Button
              className={'btn btn-secondary position-absolute bottom-0 end-0'}
              title={<i className="fa-solid fa-gear"></i>}
              handler={() => setModalActive(id)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CardBankAccount;
