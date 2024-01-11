import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getOperationsLoadingStatus,
  loadOperationList
} from '../../../store/operations/operations.slice';
import SpinnerLoader from '../SpinnerLoader';
import { getIsLoggedIn, loadUserById } from '../../../store/users/users.slice';
import { loadCategoriesList } from '../../../store/categories/categories.slice';
import { loadBankAccountList } from '../../../store/bankAccounts/bankAccounts.slice';
import localStorageService from '../../../services/localStorage.services';
import { useNavigate, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const OperationLoader = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(getOperationsLoadingStatus());
  const isLoggedIn = useSelector(getIsLoggedIn());

  const userId = localStorageService.getUserId();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    } else {
      dispatch(loadUserById(userId));
      dispatch(loadBankAccountList(userId));
      dispatch(loadCategoriesList(userId));
      dispatch(loadOperationList(userId));
    }
  }, [isLoggedIn]);

  if (isLoggedIn && isLoading) return <SpinnerLoader />;
  return children;
};

export default OperationLoader;

OperationLoader.propTypes = {
  title: PropTypes.any
};
