import React from 'react';

const CheckField = () => {
  return (
    <>
      <div className="form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          role="switch"
          id="flexSwitchCheckChecked"
          checked
        />
        <label className="form-check-label" for="flexSwitchCheckChecked">
          Checked switch checkbox input
        </label>
      </div>
    </>
  );
};

export default CheckField;
