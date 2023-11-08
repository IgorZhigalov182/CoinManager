import React, { useState } from 'react';
import ModalWindow from './modalWindow/ModalWindow';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import Button from './common/button/Button';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, updateUserData } from '../../store/users/users.slice';

const ModalWindowUser = ({ modalActive, setModalActive }) => {
  const userData = useSelector(getUser())[0];
  const [initialValue, setInitialValue] = useState({ ...userData });
  const dispatch = useDispatch();

  const userSchema = Yup.object().shape({
    firstName: Yup.string().required('Обязательное поле'),
    lastName: Yup.string().required('Обязательное поле'),
  });

  const handleSubmit = async (data) => {
    dispatch(updateUserData(data));
    setModalActive(!modalActive);
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  var LZW = {
    compress: function (uncompressed) {
      'use strict';

      var i,
        l,
        dictionary = {},
        w = '',
        k,
        wk,
        result = [],
        dictSize = 256;

      // initial dictionary
      for (i = 0; i < dictSize; i++) {
        dictionary[String.fromCharCode(i)] = i;
      }

      for (i = 0, l = uncompressed.length; i < l; i++) {
        k = uncompressed.charAt(i);
        wk = w + k;
        if (dictionary.hasOwnProperty(wk)) {
          w = wk;
        } else {
          result.push(dictionary[w]);
          dictionary[wk] = dictSize++;
          w = k;
        }
      }

      if (w !== '') {
        result.push(dictionary[w]);
      }

      result.dictionarySize = dictSize;
      return result;
    },
  };

  return (
    <ModalWindow active={modalActive} setActive={setModalActive}>
      <Formik
        onSubmit={async (values, actions) => {
          // console.log({ ...values, file: JSON.stringify(LZW.compress(values.file)) });
          handleSubmit({ ...values, file: JSON.stringify(LZW.compress(values.file)) });
        }}
        validationSchema={userSchema}
        initialValues={initialValue}
        enableReinitialize={true}>
        {({ errors, touched, handleChange, values, setFieldValue }) => (
          <Form className="modalFormWrapper">
            <Field type="text" name="firstName" className="form-control" placeholder="Имя"></Field>
            {errors.firstName && touched.firstName ? <div>{errors.firstName}</div> : null}
            <Field
              type="text"
              name="lastName"
              className="form-control mt-2"
              placeholder="Фамилия"></Field>
            {errors.lastName && touched.lastName ? <div>{errors.lastName}</div> : null}
            <input
              id="file"
              name="file"
              type="file"
              accept="image/*"
              onChange={async (event) => {
                setFieldValue('file', await convertToBase64(event.currentTarget.files[0]));
              }}
            />
            <Button type={'submit'} className="modalFormBtn" title={'Изменить'} />
          </Form>
        )}
      </Formik>
    </ModalWindow>
  );
};

ModalWindowUser.propTypes = {
  modalActive: PropTypes.bool,
  setModalActive: PropTypes.func,
};

export default ModalWindowUser;
