import React from 'react';

const CheckField = () => {
  return (
    <>
      <div class="form-check form-switch">
        <input
          class="form-check-input"
          type="checkbox"
          role="switch"
          id="flexSwitchCheckChecked"
          checked
        />
        <label class="form-check-label" for="flexSwitchCheckChecked">
          Checked switch checkbox input
        </label>
      </div>
    </>
  );
};

export default CheckField;
