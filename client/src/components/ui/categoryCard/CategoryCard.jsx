import React from 'react';
import Button from '../common/button/Button';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCategory } from '../../../store/categories/categories.slice';
import style from './categoryCard.module.scss';
import { toast } from 'react-toastify';
import { countOperationsByCategory } from '../../../store/operations/operations.slice';
import { declensionOfNumerals } from '../../../utils/declensionOfNumerals';

const CategoryCard = ({ handleModal, name, color, id }) => {
  const dispatch = useDispatch();
  const countOperations = useSelector(countOperationsByCategory(id));

  const handleDelete = (id) => {
    dispatch(deleteCategory(id));
    toast(`Категория ${name} была удалена`);
  };

  return (
    <div className={style.cardWrapper}>
      <h2 className={style.categoryName}>{name}</h2>
      <div
        style={{
          height: '2.5rem',
          width: '2.5rem',
          borderRadius: '50%',
          background: color,
          marginLeft: '1rem',
          marginTop: '1rem',
          boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px'
        }}></div>
      <h3 className={style.countOperations}>
        {`${countOperations} ${declensionOfNumerals(countOperations, [
          'операция',
          'операции',
          'операций'
        ])}`}
      </h3>
      <div className={style.button_wrap}>
        <Button
          style={{ width: '3rem' }}
          className={'btn btn-danger  mt-1'}
          title={<i className="fa-solid fa-trash"></i>}
          handler={() => handleDelete(id)}
        />
        <Button
          style={{ width: '3rem', marginTop: '1rem' }}
          className={'btn btn-secondary mt-2 '}
          title={<i className="fa-solid fa-gear"></i>}
          handler={() => handleModal(id)}
        />
      </div>
    </div>
  );
};

CategoryCard.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  color: PropTypes.string,
  handleModal: PropTypes.func
};

export default CategoryCard;
