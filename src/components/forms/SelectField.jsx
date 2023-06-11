import React from 'react';
import { categories } from '../../data/categories';

const SelectField = ({ name, onChange, htmlFor, label, defaultValue }) => {
  return (
    <div>
      {/* <label htmlFor={htmlFor}>
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
      </label> */}
      {label}
      <select
        onChange={onChange}
        name={name}
        class="form-select form-select-lg mb-3"
        aria-label=".form-select-lg example">
        <option selected>Другая</option>
        {categories.map((category) => {
          return (
            <option value={category.name} key={category.id}>
              {category.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default SelectField;
