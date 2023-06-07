import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getOperationsLoadingStatus,
  loadOperationList,
} from '../../../store/operations/operations.slice';
import SpinnerLoader from '../SpinnerLoader';

const OperationLoader = ({ children }) => {
  const isLoading = useSelector(getOperationsLoadingStatus());
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadOperationList());
  }, []);

  if (isLoading) return <SpinnerLoader />;
  return children;
};

export default OperationLoader;
