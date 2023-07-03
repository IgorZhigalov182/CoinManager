import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getOperationsLoadingStatus,
  loadOperationList,
} from '../../../store/operations/operations.slice';
import SpinnerLoader from '../SpinnerLoader';
import { getIsLoggedIn } from '../../../store/users/users.slice';
import { loadCategoriesList } from '../../../store/categories/categories.slice';
import { loadBankAccountList } from '../../../store/bankAccounts/bankAccounts.slice';
import localStorageService from '../../../services/localStorage.services';
import { useNavigate } from 'react-router-dom';

const OperationLoader = ({ children }) => {
  const isLoading = useSelector(getOperationsLoadingStatus());
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(getIsLoggedIn());

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      // dispatch(loadOperationList());
      return;
    }
  }, []);

  const userId = localStorageService.getUserId();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    } else {
      dispatch(loadCategoriesList(userId));
      dispatch(loadBankAccountList(userId));
      dispatch(loadOperationList(userId));
    }
  }, [isLoggedIn]);

  console.log(isLoggedIn);
  console.log(isLoading);

  if (isLoggedIn && isLoading) return <SpinnerLoader />;
  return children;
};

export default OperationLoader;
