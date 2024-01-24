import React, { useState } from 'react';
import Button from '../../components/ui/common/button/Button';
import { useDispatch, useSelector } from 'react-redux';
import {
  favouritedBankAccountById,
  getBankAccountList
} from '../../store/bankAccounts/bankAccounts.slice';
import bankAccountService from '../../services/bankAccount.services';
import ListBankAccounts from '../../components/ui/listBankAccounts/ListBankAccounts';
import style from './bankAccount.module.scss';
import ModalWindowBankAccount from '../../components/ui/modalWindowBankAccount/ModalWindowBankAccount';

let bankAccountData = {
  name: '',
  bank: '',
  active: false,
  typeAccount: ''
};

const BankAccounts = () => {
  const [modalActive, setModalActive] = useState(false);
  const [initialValue, setInitialValue] = useState(bankAccountData);

  let bankAccounts = useSelector(getBankAccountList());
  const dispatch = useDispatch();

  const handleModal = (id) => {
    if (typeof id == 'string') {
      setInitialValue([...bankAccounts].filter((account) => account._id == id)[0]);
    }
    setModalActive(!modalActive);
  };

  const handleFavourite = async (id) => {
    try {
      bankAccountService.resetFavouritesBankAccount(bankAccounts);
      bankAccountService.doBankAccountFavourite(id, bankAccounts);
      dispatch(favouritedBankAccountById(id));
    } catch (error) {}
  };

  return (
    <div className={style.card_inner}>
      <Button
        title={'Добавить счёт'}
        handler={() => {
          setModalActive(!modalActive);
          setInitialValue(bankAccountData);
        }}
      />

      <ListBankAccounts
        bankAccounts={bankAccounts}
        setModalActive={handleModal}
        toggleFavourite={handleFavourite}
      />

      <ModalWindowBankAccount
        initialValue={initialValue}
        setInitialValue={setInitialValue}
        active={modalActive}
        setActive={setModalActive}
      />
    </div>
  );
};

export default BankAccounts;
