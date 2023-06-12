import React from 'react';

const TextAreaFiled = ({ name, onChange, htmlFor, label }) => {
  return (
    // <div>
    //   <label htmlFor={htmlFor}>{label}</label>
    //   <textarea name={name} onChange={onChange}></textarea>
    // </div>
    <div class="form-floating">
      <textarea
        class="form-control"
        placeholder="Leave a comment here"
        id={htmlFor}
        name={name}
        onChange={onChange}></textarea>
      <label for={htmlFor}>{label}</label>
    </div>
  );
};

export default TextAreaFiled;
