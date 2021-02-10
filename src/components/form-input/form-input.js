import React from 'react';
import './form-input.styles.scss';

const FormInput = ({children, handleChange, htmlFor, currency, percent, ...otherProps}) => (
  <div className="fieldsetLine">
  <label className="fieldsetLine_label">{children}</label>
  <div className="fieldsetLine_inputWrap">{currency? <span>$</span> : null}{percent? <span>%</span> : null } <input  className="form-fieldsetLine_input"
      onChange={handleChange}
      {...otherProps} />
      </div>
  </div>
)

export default FormInput;

