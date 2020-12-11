import React from 'react'
import FormInput from '../form-input/form-input.js'
import './inputFields.styles.css'

//move state up, use useMemo


const LoanField1 = ({handleChange, handleSubmit, inputData}) => {

  const {balance, payment, interest, extrapay, timeLeft, futureBalance} = inputData;
  console.log('PROPS1===', inputData)
    const futBal = futureBalance? futureBalance : null;
    let years = Math.floor(timeLeft/12);
    let months = Math.round(timeLeft - (years * 12));


    return (
      <div className="form-container">
        <form onSubmit={handleSubmit}>
       <fieldset className="field-set">
         <legend>Input Loan Details</legend>
         <FormInput name="balance" value={balance} onChange={handleChange} required>Enter Current Balance</FormInput>
         <FormInput name="interest" value={interest} onChange={handleChange} required>Enter Interest</FormInput>
         <FormInput name="payment" value={payment} onChange={handleChange} required>Enter Payment</FormInput>
         <FormInput name="extrapay" value={extrapay} onChange={handleChange} required>Enter Additional Payment</FormInput>
         <button type="submit" >Calculate time to pay off the balance</button>
       </fieldset>
       </form>
       <div className='form-text'>
       {futBal? <div><p>`Time to pay off is ${years} years and ${months} months`</p><p>The Future Balance at that time with the current payments without extra payment is ${futBal}</p> </div> : null}
       </div>
      </div>
   )
  }




export default LoanField1
