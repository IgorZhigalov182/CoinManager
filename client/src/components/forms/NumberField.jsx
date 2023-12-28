import React from 'react';

const NumberField = ({ onChange, name, htmlFor, label }) => {
  return (
    <div class="input-group mb-3">
      <span class="input-group-text" id="inputGroup-sizing-default">
        {label}
      </span>
      <input type="number" class="form-control" name={name} onChange={onChange} />
    </div>
  );
};

export default NumberField;
