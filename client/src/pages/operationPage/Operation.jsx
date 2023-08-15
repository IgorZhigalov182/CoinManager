import React, { useState } from 'react';
import CardOperation from '../../components/ui/cardOperation/CardOperation';
import BackButton from '../../components/ui/common/BackButton';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getOperationById } from '../../store/operations/operations.slice';
import Button from '../../components/ui/common/button/Button';
import NotFound from '../notFoundPage/NotFound';
import ModalWindowOperation from '../../components/ui/ModalWindowOperation';

const Operation = () => {
  const [modalActive, setModalActive] = useState(false);

  const { pathname } = useLocation();
  const operationId = pathname.split('/')[2];
  const operation = useSelector(getOperationById(operationId));

  const handleModal = () => {
    setModalActive(!modalActive);
  };

  return (
    <>
      {operation ? (
        <div className="container">
          <BackButton className={'btn btn-secondary mt-2 mb-2'} />
          <CardOperation {...operation} />
          <Button title={'Изменить запись'} className={'btn btn-dark'} handler={handleModal} />
        </div>
      ) : (
        <NotFound />
      )}
      <ModalWindowOperation
        operation={operation}
        modalActive={modalActive}
        setModalActive={setModalActive}
      />
    </>
  );
};

export default Operation;
