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
  toggleFavourite,
}) => {
  const buttonFavouriteStyle = classNames(
    active ? style.btnFavouriteActive : style.btnFavouriteActive,
  );
  return (
    <>
      <div className={style.card_wrapper}>
        <h1>{name}</h1>
        <h5 className="card-title">
          <i className="fa-solid fa-building-columns me-2"></i>
          {bank}
        </h5>
        <h5 className="card-title">
          <i className="fa-solid fa-font-awesome me-2"></i>
          {setTitileTypeBankAccount(typeAccount)}
        </h5>
        <div className={style.btnWrapper}>
          <Button
            className={style.btnFavouriteActive}
            spanStyle={style.spanButtonFavourite}
            title={<i className="fa-solid fa-gear"></i>}
            handler={() => setModalActive(_id)}
          />
          {/* <div className="position-absolute top-0 end-0"> */}
          <Button
            handler={() => toggleFavourite(_id)}
            className={style.btnFavouriteActive}
            spanStyle={style.spanButtonFavourite}
            title={
              active ? <i className="fa-solid fa-star"></i> : <i className="fa-regular fa-star"></i>
            }
          />
          {active ? <Badge title={`Активный`} className={style.profitBadge} /> : ''}
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
