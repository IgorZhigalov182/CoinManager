import React from 'react';

const TextAreaFiled = ({ name, onChange, htmlFor, label }) => {
  return (
    <div>
      <label htmlFor={htmlFor}>{label}</label>
      <textarea name={name} onChange={onChange}></textarea>
    </div>
  );
};

export default TextAreaFiled;
