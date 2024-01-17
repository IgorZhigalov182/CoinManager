import React, { useState } from 'react';
import CardOperation from '../../components/ui/cardOperation/CardOperation';
import BackButton from '../../components/ui/common/BackButton';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getOperationById } from '../../store/operations/operations.slice';
import Button from '../../components/ui/common/button/Button';
import NotFound from '../notFoundPage/NotFound';
import ModalWindowOperation from '../../components/ui/ModalWindowOperation/ModalWindowOperation';
import styles from './operation.module.scss';
import { useNavigate } from 'react-router-dom';

const Operation = () => {
  const [modalActive, setModalActive] = useState(false);
  const navigate = useNavigate();

  const { pathname } = useLocation();
  const operationId = pathname.split('/')[2];
  const operation = useSelector(getOperationById(operationId));

  const handleModal = () => {
    setModalActive(!modalActive);
  };

  return (
    <>
      {operation ? (
        <>
          <Button
            handler={() =>
              navigate('/operations', {
                state: {
                  operationId
                }
              })
            }
            className={styles.btnAddOperation}
            title={<i class="fa-solid fa-reply"></i>}
          />
          {/* <BackButton
            className={styles.btnAddOperation}
            handler={() => {
              navigate('/operations', { operationId });
            }}
          /> */}
          <CardOperation {...operation} />
          <Button
            title={'Изменить запись'}
            className={styles.btnChangeRecord}
            handler={handleModal}
          />
        </>
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
