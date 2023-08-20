import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOperationList } from '../../../store/operations/operations.slice';
import {
  favouritedBankAccountById,
  getActiveBankAccount,
  getBankAccountDisplayNameById,
  getBankAccountList,
} from '../../../store/bankAccounts/bankAccounts.slice';
import bankAccountService, { getMostUsedBankAccount } from '../../../services/bankAccount.services';
import classNames from 'classnames';
import styles from './widgetBankAccount.module.scss';

const WidgetBankAccount = () => {
  const dispatch = useDispatch();
  const operations = useSelector(getOperationList());
  let bankAccounts = useSelector(getBankAccountList());
  const activeBankAccountId = useSelector(getActiveBankAccount());
  const activeBankAccountName = useSelector(getBankAccountDisplayNameById(activeBankAccountId));
  const mostUsedBankAccountId = getMostUsedBankAccount(operations, activeBankAccountId);
  // const activeBankAccountNameClass = classNames();

  const namesMostUsedBankAccount = mostUsedBankAccountId.map((bankAccount) => {
    let name = useSelector(getBankAccountDisplayNameById(bankAccount[0]));

    if (name != '') {
      return { name: name, _id: bankAccount[0] };
    }
  });

  const handleActiveBankAccount = async (bankAccountId) => {
    try {
      bankAccountService.resetFavouritesBankAccount(bankAccounts);
      bankAccountService.doBankAccountFavourite(bankAccountId, bankAccounts);
      dispatch(favouritedBankAccountById(bankAccountId));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.widgetBankAccountWrapper}>
      <h5>Активный банковский аккаунт</h5>
      <div className={styles.listWrapper} id="list-tab" role="tablist">
        {namesMostUsedBankAccount &&
          namesMostUsedBankAccount.map((bankAccount) => {
            if (!bankAccount) {
              return;
            }

            return (
              <div className={styles.activeBankAccountWrapper}>
                <a
                  key={bankAccount._id}
                  className={
                    bankAccount.name === activeBankAccountName
                      ? styles.activeBankAccountName
                      : styles.noActiveBankAccountName
                  }
                  id="list-home-list"
                  data-bs-toggle="list"
                  role="button"
                  onClick={() => handleActiveBankAccount(bankAccount._id)}
                  aria-controls="list-home">
                  {bankAccount.name}
                </a>
                {bankAccount.name === activeBankAccountName ? (
                  <i
                    className="fa-solid fa-star"
                    style={{
                      color: '#ffffff',
                      marginTop: '8px',
                      marginLeft: '5px',
                      transition: '.9s',
                    }}></i>
                ) : (
                  ''
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default WidgetBankAccount;
