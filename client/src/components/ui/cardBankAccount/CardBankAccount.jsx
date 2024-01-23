import React from 'react';
import Button from '../common/button/Button';
import PropTypes from 'prop-types';
import { setTitileTypeBankAccount } from '../../../services/bankAccount.services';
import style from './cardBankAccount.module.scss';
import classNames from 'classnames';
import Badge from '../common/badge/Badge';

const CardBankAccount = ({
  setModalActive,
  name,
  typeAccount,
  bank,
  active,
  _id,
  toggleFavourite
}) => {
  const buttonFavouriteStyle = classNames(
    active ? style.btnFavouriteActive : style.btnFavouriteActive
  );

  return (
    <>
      <div className={style.card_wrapper}>
        <h1>
          {name}
          {active ? <Badge title={`Активный`} className={style.profitBadge} /> : ''}
        </h1>
        <h5 className={style.cardTitle}>
          <i className={`fa-solid fa-building-columns me-2 fa-xl`}></i>
          <p>{bank}</p>
        </h5>
        <h5 className={style.cardTitle}>
          <i className="fa-solid fa-font-awesome me-2 fa-xl"></i>
          <p>{setTitileTypeBankAccount(typeAccount)}</p>
        </h5>
        <div className={style.btnWrapper}>
          <Button
            className={style.btnFavouriteActive}
            spanStyle={style.spanButtonFavourite}
            title={<i className="fa-solid fa-gear"></i>}
            handler={() => setModalActive(_id)}
          />
          {!active && (
            <Button
              handler={() => toggleFavourite(_id)}
              className={style.btnFavouriteActive}
              spanStyle={style.spanButtonFavourite}
              title={
                active ? (
                  <i className="fa-solid fa-star"></i>
                ) : (
                  <i className="fa-regular fa-star"></i>
                )
              }
            />
          )}
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
  toggleFavourite: PropTypes.func
};
