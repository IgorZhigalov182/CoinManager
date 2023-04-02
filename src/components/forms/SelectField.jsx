import React from 'react';

const SelectField = ({ name, onChange, htmlFor, label, defaultValue }) => {
  return (
    <div>
      <label htmlFor={htmlFor}>
        {label}
        <select id={htmlFor} onChange={onChange} name={name}>
          <option value="eats">Продукты</option>
          <option value="shoes">Одежда</option>
          <option value="newCategory">+ Новая категория</option>
        </select>
      </label>
    </div>
  );
};

export default SelectField;
