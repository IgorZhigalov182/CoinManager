import React from 'react';

const SelectField = ({ name, onChange, htmlFor, label }) => {
  return (
    <div>
      <label htmlFor={htmlFor}>{label}</label>
      <select name={name} id={htmlFor} onChange={onChange}>
        <option value="eats">Продукты</option>
        <option value="shoes">Одежда</option>
        <option value="newCategory">+ Новая категория</option>
      </select>
    </div>
  );
};

export default SelectField;
