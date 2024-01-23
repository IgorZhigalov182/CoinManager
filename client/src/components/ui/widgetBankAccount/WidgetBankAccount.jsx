import React, { useId } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOperationList } from '../../../store/operations/operations.slice';
import {
  favouritedBankAccountById,
  getActiveBankAccount,
  getBankAccountDisplayNameById,
  getBankAccountList,
  getMostUsedBankAccounts
} from '../../../store/bankAccounts/bankAccounts.slice';
import bankAccountService, { getMostUsedBankAccount } from '../../../services/bankAccount.services';
import classNames from 'classnames';
import styles from './widgetBankAccount.module.scss';
import { useTheme } from '../../../hooks/useTheme';

const WidgetBankAccount = () => {
  const dispatch = useDispatch();
  const operations = useSelector(getOperationList());
  let bankAccounts = useSelector(getBankAccountList());
  const activeBankAccountId = useSelector(getActiveBankAccount());
  const activeBankAccountName = useSelector(getBankAccountDisplayNameById(activeBankAccountId));
  const mostUsedBankAccountId = getMostUsedBankAccount(operations, activeBankAccountId);
  const randomId = useId();
  const { theme } = useTheme();

  const mostUsedBankAccounts = useSelector(getMostUsedBankAccounts(operations));

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
        {mostUsedBankAccounts &&
          mostUsedBankAccounts.map(({ name, id }) => {
            if (!name) {
              return;
            }

            return (
              <div key={name} className={styles.activeBankAccountWrapper}>
                <a
                  key={id}
                  className={
                    name === activeBankAccountName
                      ? styles.activeBankAccountName
                      : styles.noActiveBankAccountName
                  }
                  id="list-home-list"
                  data-bs-toggle="list"
                  role="button"
                  onClick={() => handleActiveBankAccount(id)}
                  aria-controls="list-home">
                  {name}
                </a>
                {name === activeBankAccountName ? (
                  <i
                    key={randomId}
                    className="fa-solid fa-star"
                    style={{
                      color: theme === 'light' ? 'black' : '#ffffff',
                      marginTop: '6px',
                      marginLeft: '5px',
                      transition: '.9s'
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
