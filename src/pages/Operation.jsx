import React, { useState } from 'react';
import CardOperation from '../components/ui/CardOperation';
import BackButton from '../components/ui/common/BackButton';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getOperationById } from '../store/operations/operations.slice';
import Button from '../components/ui/common/Button';
import NotFound from './NotFound';
import ModalWindow from '../components/ui/ModalWindow';
import NewOperation from '../components/ui/ModalWindowOperation';

const Operation = () => {
  const [modalActive, setModalActive] = useState(false);

  const { pathname } = useLocation();
  const operationId = pathname.split('/')[2];
  const operation = useSelector(getOperationById(operationId));

  const handleModal = () => {
    // inputSum.current.focus();
    setModalActive(!modalActive);
  };

  // modalActive, setModalActive

  // console.log(operation);

  return (
    <>
      {operation ? (
        <div className="container">
          <BackButton />
          <h1>Хлебные крошки</h1>
          <CardOperation {...operation} />
          <Button title={'Изменить запись'} className={'btn btn-dark'} handler={handleModal} />
        </div>
      ) : (
        <NotFound />
      )}
      <NewOperation
        operation={operation}
        modalActive={modalActive}
        setModalActive={setModalActive}
      />
    </>
  );
};

export default Operation;
