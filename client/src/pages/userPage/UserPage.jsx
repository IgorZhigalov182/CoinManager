import React, { useState } from 'react';
import Button from '../../components/ui/common/button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../store/categories/categories.slice';
import { getBankAccountList } from '../../store/bankAccounts/bankAccounts.slice';
import { getOperationList } from '../../store/operations/operations.slice';
import { getUser, logOut } from '../../store/users/users.slice';
import { useNavigate } from 'react-router-dom';
import { getBuyDate } from '../../services/date.services';
import ModalWindowUser from '../../components/ui/ModalWindowUser';
import style from './UserPage.module.scss';
import classNames from 'classnames/bind';
import mainStyle from '../../styles/app.module.scss';

const UserPage = () => {
  const [modalActive, setModalActive] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector(getUser())[0];
  const registerDate = getBuyDate(new Date(userData.createdAt));

  let countOfOperations = useSelector(getOperationList()) || 0;
  countOfOperations ? (countOfOperations = countOfOperations.length) : 0;
  let countOfCategories = useSelector(getCategories()) || 0;
  countOfCategories ? (countOfCategories = countOfCategories.length) : 0;
  let countOfBankAccount = useSelector(getBankAccountList()) || 0;
  countOfBankAccount ? (countOfBankAccount = countOfBankAccount.length) : 0;

  const handleLogout = () => {
    dispatch(logOut());
    navigate('/login');
  };

  const handleModal = () => setModalActive(!modalActive);

  // const [darkTheme, setDarkTheme] = useState(false);
  // const theme = classNames(darkTheme ? mainStyle.dark_theme : mainStyle.white_theme);

  return (
    <>
      {/* <div className={style}>SCSS</div> */}
      <div className="container">
        <div className="card mt-2 mb-3" style={{ maxWidth: '540px' }}>
          <div className="row g-0">
            <div className="col-md-4 ">
              <img
                src="https://t4.ftcdn.net/jpg/04/10/42/63/360_F_410426381_YKYcz1SyGZXRWOYU63yddK02hb70yJTM.jpg"
                className="img-fluid rounded-start"
                alt="..."
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">
                  {userData.firstName} {userData.lastName}
                </h5>
                <p className="card-text">Всего банковских аккаунтов: {countOfBankAccount || 0}</p>
                <p className="card-text">Всего категорий: {countOfCategories || 0}</p>
                <p className="card-text">Всего операций: {countOfOperations || 0}</p>
                <p className="card-text">
                  <small className="text-body-secondary">Дата регистрации: {registerDate}</small>
                </p>
                <div className="d-flex justify-content-between">
                  <Button handler={handleModal} className={'btn_dark'} title={'Редактировать'} />
                  <Button
                    handler={handleLogout}
                    className={'btn btn-dark ms-3'}
                    title={'Выйти из аккаунта'}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalWindowUser modalActive={modalActive} setModalActive={setModalActive} />
    </>
  );
};

export default UserPage;
