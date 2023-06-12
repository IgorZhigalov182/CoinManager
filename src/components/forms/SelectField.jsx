import React from 'react';

const SelectField = ({ name, onChange, htmlFor, label, defaultValue, list }) => {
  return (
    <div className="mt-3">
      <select
        id={htmlFor}
        onChange={onChange}
        name={name}
        className="form-select form-select-lg mb-2"
        aria-label=".form-select-lg example">
        {list &&
          list.map((item) => {
            return (
              <option selected value={item.name} key={item.id}>
                {item.name}
              </option>
            );
          })}
      </select>
    </div>
  );
};

export default SelectField;
