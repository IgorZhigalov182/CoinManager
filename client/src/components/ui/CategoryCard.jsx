import React from 'react';
import Button from './common/button/Button';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { deleteCategory } from '../../store/categories/categories.slice';

const CategoryCard = ({ handleModal, name, color, id }) => {
  const dispatch = useDispatch();

  const handleDelete = (id) => dispatch(deleteCategory(id));

  return (
    <>
      <div className="d-flex flex-column ">
        <h3>{name}</h3>
        <Button
          style={{ width: '3rem' }}
          className={'btn btn-danger  mt-1'}
          title={<i className="fa-solid fa-trash"></i>}
          handler={() => handleDelete(id)}
        />
        <Button
          style={{ width: '3rem' }}
          className={'btn btn-secondary mt-2 '}
          title={<i className="fa-solid fa-gear"></i>}
          handler={() => handleModal(id)}
        />
      </div>
      <div
        className="rounded-start-pill"
        style={{
          width: '4rem',
          marginTop: '-1rem',
          marginBottom: '-1rem',
          borderRadius: '0.3rem',
          background: color,
        }}></div>
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
