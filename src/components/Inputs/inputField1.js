import React from 'react'
import FormInput from '../form-input/form-input.js'
import './inputFields.styles.scss'



const LoanField1 = ({handleChange, handleSubmit, clearData, inputData, error}) => {

  const {balance, payment, interest, additional_payment, timeLeft, futureBalance} = inputData;
    const futBal = futureBalance? futureBalance : null;
    let years = Math.floor(timeLeft/12);
    let months = Math.round(timeLeft - (years * 12));


    return (
      <div className="form-container">
        <form onSubmit={handleSubmit} className="form">
       <fieldset className="form-fieldset">
         <legend className="form-legend">Input Loan Details</legend>
         <FormInput name="balance" value={balance} onChange={handleChange} currency required>Input Current Balance</FormInput>
         <FormInput name="interest" value={interest} onChange={handleChange} required>Input Interest % </FormInput>
         <FormInput name="payment" value={payment} onChange={handleChange} currency required>Input Payment</FormInput>
         <FormInput name="additional_payment" value={additional_payment} onChange={handleChange} currency required>Input Additional Payment</FormInput>
         <div id="buttons">
         <button type="submit" >Calculate time to pay off the balance</button>
         <button onClick={clearData}>Reset</button>
         </div>
       </fieldset>
       </form>
       <div className='form-text'>
       {futBal? <div><p>Remaining time to pay off is {years} years and {months} months.</p><p>The Future Balance at that time with the current payments without extra payment is ${futBal}.</p> </div> : null}
       {error? <p id='error' >* {error}</p>: null}
       </div>
      </div>
   )
  }




export default LoanField1
