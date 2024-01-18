import React from 'react';

const NumberField = ({ onChange, name, htmlFor, label }) => {
  return (
    <div className="input-group mb-3">
      <span className="input-group-text" id="inputGroup-sizing-default">
        {label}
      </span>
      <input type="number" className="form-control" name={name} onChange={onChange} />
    </div>
  );
};

export default NumberField;
