import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getOperationsLoadingStatus,
  loadOperationList,
} from '../../../store/operations/operations.slice';
import SpinnerLoader from '../SpinnerLoader';
import { getIsLoggedIn } from '../../../store/users/users.slice';

const OperationLoader = ({ children }) => {
  const isLoading = useSelector(getOperationsLoadingStatus());
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(getIsLoggedIn());

  if (isLoggedIn) {
    // dispatch(loadOperationList());
  }

  // useEffect(() => {
  //   dispatch(loadOperationList());
  // }, []);

  // if (isLoading) return <SpinnerLoader />;
  return children;
};

export default OperationLoader;
