import React from 'react';

const NumberField = ({ onChange, name, htmlFor, label }) => {
  return (
    <div>
      <label htmlFor={htmlFor}>{label}</label>
      <input type="number" name={name} onChange={onChange} />
    </div>
  );
};

export default NumberField;
