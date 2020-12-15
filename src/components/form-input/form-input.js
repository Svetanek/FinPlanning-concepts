import React from 'react';
import './form-input.styles.scss';

const FormInput = ({children, handleChange, htmlFor, ...otherProps}) => (
  <div className="fieldset_line">
  <label  >{children}</label>
  <input  className="fieldset_input"
      onChange={handleChange}
      {...otherProps} />
  </div>
)

export default FormInput;
