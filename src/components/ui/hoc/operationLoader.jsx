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

const OperationLoader = ({ children }) => {
  const isLoading = useSelector(getOperationsLoadingStatus());
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(getIsLoggedIn());

  if (!isLoggedIn) {
    // dispatch(loadOperationList());
  }
  const userId = localStorageService.getUserId();

  useEffect(() => {
    dispatch(loadCategoriesList(userId));
    dispatch(loadBankAccountList(userId));
    dispatch(loadOperationList(userId));
  }, []);

  if (isLoading) return <SpinnerLoader />;
  return children;
};

export default OperationLoader;
