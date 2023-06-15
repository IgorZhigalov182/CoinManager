import React from 'react';
import Button from './common/Button';

const CardBankAccount = ({ name, typeAccount, userId, bank, active }) => {
  return (
    <>
      <div
        className="card text-bg-info mb-3 me-3"
        style={{ maxWidth: '22rem', maxHeight: '30rem' }}>
        {/* <div className="card-header"> */}
        {/* {name} */}
        {active ? (
          <div className="position-absolute top-0 end-0">
            <Button className={'btn btn-success'} title={<i class="fa-solid fa-star"></i>} />
          </div>
        ) : (
          <div className="position-absolute top-0 end-0">
            <Button className={'btn btn-secondary'} title={<i class="fa-regular fa-star"></i>} />
          </div>
        )}
        {/* </div> */}

        <div className="card-body">
          <h5 className="card-title w-75">{name}</h5>

          <h5 className="card-title">{typeAccount}</h5>
          <h5 className="card-title">{bank}</h5>
          {/* <p className="card-text">
            Some quick example text to build on the card title and make up the bulk of the card's
            content.
          </p> */}
          <div>
            <Button
              className={'btn btn-secondary position-absolute bottom-0 end-0'}
              title={<i class="fa-solid fa-gear"></i>}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CardBankAccount;
