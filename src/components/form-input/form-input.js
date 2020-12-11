import React from 'react';
import './form-input.styles.css';

const FormInput = ({children, handleChange, htmlFor, ...otherProps}) => (
  <div className="field-set_line">
  <label  >{children}</label>
  <input  className="form-input"
      onChange={handleChange}
      {...otherProps} />
  </div>
)

export default FormInput;
