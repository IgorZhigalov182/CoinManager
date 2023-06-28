import React, { useEffect, useState } from 'react';
import ModalWindow from './ModalWindow';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import Button from './common/Button';
import chroma from 'chroma-js';
import { getRandomColor } from '../../utils/getRandomColor';
import { useDispatch } from 'react-redux';
import { updateCategoryById } from '../../store/categories/categories.slice';

const ModalWindowCategory = ({ categories, selectedCategory, modalActive, setModalActive }) => {
  const [initialValue, setInitialValue] = useState();
  const dispatch = useDispatch();

  let category = categories?.filter((category) => category.id === selectedCategory)[0];
  const findTargetCategory = () => {
    return category
      ? category
      : {
          color: '',
          icon: '',
          id: '',
          idUser: '',
          name: '',
        };
  };

  useEffect(() => {
    setInitialValue(findTargetCategory());
  }, [modalActive]);

  const categorySchema = Yup.object().shape({
    name: Yup.string().required('Обязательное поле'),
  });

  const handleSubmit = async (data) => {
    dispatch(updateCategoryById(data));
    setModalActive(!modalActive);
  };

  const changeColor = (values) => {
    setInitialValue(() => ({ ...values, color: getRandomColor() }));
  };

  return (
    <div className="">
      <ModalWindow active={modalActive} setActive={setModalActive}>
        <Formik
          onSubmit={async (values, actions) => {
            handleSubmit(values);
          }}
          validationSchema={categorySchema}
          initialValues={initialValue}
          enableReinitialize={true}>
          {({ errors, touched, handleChange, values }) => (
            <Form>
              <Field
                type="text"
                name="name"
                className="form-control"
                placeholder="Наименование"></Field>
              {errors.name && touched.name ? <div>{errors.name}</div> : null}
              <div
                style={{
                  width: '4rem',
                  height: '4rem',
                  marginTop: '0.5rem',
                  // marginBottom: '-1rem',
                  // marginRight: '-1rem',
                  borderRadius: '0.3rem',
                  background: values?.color,
                }}
                className=""></div>
              <div className="">
                <Button
                  type={'button'}
                  handler={() => changeColor(values)}
                  className={'btn btn-dark mt-2'}
                  title={'Изменить цвет'}
                />
              </div>
              <Button type={'submit'} className={'btn btn-success mt-2'} title={'Изменить'} />
            </Form>
          )}
        </Formik>
      </ModalWindow>
    </div>
  );
};

export default ModalWindowCategory;
