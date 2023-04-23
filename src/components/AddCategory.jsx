import React from 'react';
import { useSelector } from 'react-redux';

const AddCategory = ({ item }) => {
  const { categories } = useSelector((state) => state);
  console.log(categories);
  return (
    <div>
      <h2>{item.name}</h2>
      <button className="btn btn-primary">Add to favorites</button>
    </div>
  );
};

export default AddCategory;
