import React from 'react'
// import {calcTime, calcFutureBalance} from '../../utils'
import './inputFields.styles.css'

//move state up, use useMemo


const LoanField1 = ({handleChange, handleSubmit, inputData}) => {

  const {balance, payment, interest, extrapay, timeLeft, futureBalance} = inputData;
  console.log('PROPS1===', inputData)
    const futBal = futureBalance? futureBalance : null;
    let years = Math.floor(timeLeft/12);
    let months = Math.round(timeLeft - (years * 12));


    return (
      <form onSubmit={handleSubmit}>
       <fieldset className="field-set">
         <legend>Input Loan Details</legend>
         <div className="field-set_line">
         <label htmlFor="balance">Enter Current Balance</label>
         <input  id="balance" name="balance" value={balance} onChange={handleChange}/>
         </div>
         <div className="field-set_line">
         <label htmlFor="interest">Interest</label>
         <input type="number" id="interest" name="interest" value={interest} min="0.001" step="0.001" onChange={handleChange} required/>
         </div>
         <div className="field-set_line">
         <label htmlFor="payment">Payment</label>
         <input id="payment" name="payment" value={payment} onChange={handleChange} required/>
         </div>
         <div className="field-set_line">
         <label htmlFor="extrapay">Additional Payment</label>
         <input  id="extrapay" name="extrapay" value={extrapay} onChange={handleChange} required/>
         </div>
         <button type="submit" >Calculate time to pay off the balance</button>
       </fieldset>
    {futBal? <div><p>`Time to pay off is ${years} years and ${months} months`</p><p>The Future Balance at that time with the current payments without extra payment is ${futBal}</p> </div> : null}
       </form>

   )
  }




export default LoanField1
