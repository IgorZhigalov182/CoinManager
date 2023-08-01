import React, { useState } from 'react';
import { getCategories } from '../../store/categories/categories.slice';
import { useSelector } from 'react-redux';
import Button from '../../components/ui/common/button/Button';
import CategoryCard from '../../components/ui/categoryCard/CategoryCard';
import ModalWindowCategory from '../../components/ui/ModalWindowCategory';
import style from './categories.module.scss';

const Categories = () => {
  const categories = useSelector(getCategories());
  const [modalActive, setModalActive] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleModal = (id) => {
    if (typeof id === 'string') {
      setSelectedCategory(id);
    } else {
      setSelectedCategory('');
    }
    setModalActive(!modalActive);
  };

  return (
    <>
      <div className="container">
        <Button
          title={'Добавить категорию'}
          className={'btn btn-dark mt-2'}
          handler={handleModal}
        />
        <div className={style.grid_container}>
          {categories &&
            categories.map((category) => {
              return (
                <div className="col-sm-6 mt-2" key={category._id}>
                  <div className="card" key={category._id}>
                    <div className="card-body" key={category._id}>
                      <div className="d-flex justify-content-between" key={category._id}>
                        <CategoryCard
                          category={category}
                          handleModal={handleModal}
                          modalActive={modalActive}
                          setModalActive={setModalActive}
                          color={category.color}
                          id={category._id}
                          key={category._id}
                          name={category.name}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <ModalWindowCategory
        categories={categories}
        selectedCategory={selectedCategory}
        modalActive={modalActive}
        setModalActive={setModalActive}
      />
    </>
  );
};

export default Categories;
