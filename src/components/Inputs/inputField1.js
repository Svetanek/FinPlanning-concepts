import React, {useState, useEffect} from 'react'
import FormInput from '../form-input/form-input.js'
import './inputFields.styles.scss'



const LoanField1 = ({handleChange, handleSubmit, clearData, inputData, calcData, error, isEmpty}, ref) => {

  const {balance, payment, interest, additional_payment} = inputData;
  const { timeLeft, futureBalance} = calcData;
    const futBal = futureBalance? futureBalance : null;
    const years = Math.floor(timeLeft/12);
    const months = timeLeft - (years * 12);

    return (
      <div className="form-container">
        <form onSubmit={handleSubmit} className="form" aria-labelledby="loanInfo">
       <fieldset className="form-fieldset">
         <legend className="form-legend" id="loanInfo">Input Loan Details</legend>
         <FormInput  name="balance" value={balance} onChange={handleChange} currency required ref={ref}>Input Current Balance</FormInput>
         <FormInput name="interest" value={interest} onChange={handleChange} percent required>Input Interest (annual) </FormInput>
         <FormInput name="payment" value={payment} onChange={handleChange} currency required>Input Monthly Payment</FormInput>
         <FormInput name="additional_payment" value={additional_payment} onChange={handleChange} currency required>Input Additional Payment</FormInput>
         <div id="buttons">
         <button onClick={clearData}>Reset</button>
         <button id="button-1" type="submit" disabled={isEmpty} >Calculate time to pay off the balance</button>
         </div>
       </fieldset>
       </form>
       <div className='form-text'>
       {(futBal && !error)? <div><p>Remaining time to pay off is {years} years and {months} months.</p><p>The Future Balance at that time with the current payments without extra payment is ${futBal}.</p> </div> : null}
       {error? <p id='error' >* {error}</p>: null}
       </div>
      </div>
   )
  }




export default React.forwardRef(LoanField1)
