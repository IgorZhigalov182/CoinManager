import React from 'react';
import Button from '../common/button/Button';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { deleteCategory } from '../../../store/categories/categories.slice';
import style from './categoryCard.module.scss';
import Badge from '../common/badge/Badge';

const CategoryCard = ({ handleModal, name, color, id }) => {
  const dispatch = useDispatch();
  const handleDelete = (id) => dispatch(deleteCategory(id));

  return (
    <>
      <div className={style.d_flex}>
        <h2 className={style.categoryName}>{name}</h2>
        <div
          style={{
            height: '2.5rem',
            width: '2.5rem',
            borderRadius: '50%',
            background: color,
            marginLeft: '1rem',
            marginTop: '1rem',
            boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
          }}></div>
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
    </>
  );
};

CategoryCard.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  color: PropTypes.string,
  handleModal: PropTypes.func,
};

export default CategoryCard;
