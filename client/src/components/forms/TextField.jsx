import React from 'react';

const TextField = ({ onChange, name, htmlFor, label }) => {
  return (
    <div class="form-floating mb-3">
      <input name={name} type="text" class="form-control" placeholder={label} onChange={onChange} />
      <label htmlFor={htmlFor}>{label}</label>
    </div>
  );
};

export default TextField;
