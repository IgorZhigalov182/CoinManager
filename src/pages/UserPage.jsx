import React, { useEffect } from 'react';
import Button from '../components/ui/common/Button';
import { useDispatch, useSelector } from 'react-redux';
import { loadCategoriesList } from '../store/categories/categories.slice';
import { loadBankAccountList } from '../store/bankAccounts/bankAccounts.slice';
import { loadOperationList } from '../store/operations/operations.slice';
import { getUserById, logOut } from '../store/users/users.slice';
import { useNavigate } from 'react-router-dom';

const UserPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const user = useSelector(getUserById());

  // useEffect(() => {
  //   dispatch(loadCategoriesList());
  //   dispatch(loadBankAccountList());
  //   dispatch(loadOperationList());
  // }, []);

  const handleLogout = () => {
    dispatch(logOut());
    navigate('/login');
  };

  return (
    <div className="container">
      <div className="card mt-2 mb-3" style={{ maxWidth: '540px' }}>
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src="https://t4.ftcdn.net/jpg/04/10/42/63/360_F_410426381_YKYcz1SyGZXRWOYU63yddK02hb70yJTM.jpg"
              className="img-fluid rounded-start"
              alt="..."
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">Имя Фамилия</h5>
              <p className="card-text">
                Количество банковских аккаунтов: This is a wider card with supporting text below as
                a natural lead-in to additional content. This content is a little bit longer.
              </p>
              <p className="card-text">
                Количество категорий: This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit longer.
              </p>
              <p className="card-text">
                Количество операций: This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit longer.
              </p>
              <p className="card-text">
                <small className="text-body-secondary">Last updated 3 mins ago</small>
              </p>
              <Button className={'btn btn-dark'} title={'Редактировать'} />
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
  );
};

export default UserPage;
