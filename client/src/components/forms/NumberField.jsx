import React from 'react';

const NumberField = ({ onChange, name, htmlFor, label }) => {
  return (
    // <div>
    //   <label htmlFor={htmlFor}>{label}</label>
    //   <input type="number" name={name} onChange={onChange} />
    // </div>
    <div class="input-group mb-3">
      <span class="input-group-text" id="inputGroup-sizing-default">
        {label}
      </span>
      <input
        type="number"
        class="form-control"
        name={name}
        onChange={onChange}
        // aria-label="Sizing example input"
        // aria-describedby="inputGroup-sizing-default"
      />
    </div>
  );
};

export default NumberField;
