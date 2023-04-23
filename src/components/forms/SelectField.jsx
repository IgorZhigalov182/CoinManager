import React from 'react';
import { categories } from '../../data/categories';

const SelectField = ({ name, onChange, htmlFor, label, defaultValue }) => {
  return (
    <div>
      <label htmlFor={htmlFor}>
        {label}
        <select id={htmlFor} onChange={onChange} name={name}>
          {categories.map((category) => {
            return (
              <option value={category.name} key={category.id}>
                {category.name}
              </option>
            );
          })}
        </select>
      </label>
    </div>
  );
};

export default SelectField;
