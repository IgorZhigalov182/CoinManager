import React, { useEffect, useState } from 'react';
import { getCategories } from '../store/categories/categories.slice';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../components/ui/common/Button';
import ModalWindow from '../components/ui/ModalWindow';
import CategoryCard from '../components/ui/CategoryCard';
import ModalWindowCategory from '../components/ui/ModalWindowCategory';
import categoryService from '../services/category.services';

// let categoriesData = {
//   color: '',
//   icon: '',
//   id: '',
//   idUser: '',
//   name: '',
// };

const Categories = () => {
  const dispatch = useDispatch();

  const categories = useSelector(getCategories());
  const [modalActive, setModalActive] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleModal = (id) => {
    if (typeof id === 'string') {
      // console.log('Setting category');
      setSelectedCategory(id);
    } else {
      setSelectedCategory('');
    }
    setModalActive(!modalActive);
    // setSelectedId('');
  };

  // async function getData() {
  //   const res = await categoryService.getCategories();
  //   console.log(res);
  // }
  // getData();

  //   color: 'rgb(54, 182, 235, 1)';
  //   icon: '';
  //   id: '0707965a-fd11-4e44-a0bc-8c88750b2ad1';
  //   idUser: 0;
  //   name: 'Аптека';
  return (
    <>
      <div className="container">
        <Button
          title={'Добавить категорию'}
          className={'btn btn-dark mt-2'}
          handler={handleModal}
        />
        <div className="row">
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
