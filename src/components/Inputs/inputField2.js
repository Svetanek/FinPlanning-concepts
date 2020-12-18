import React, {useState} from 'react';
import FormInput from '../form-input/form-input.js'
import {formStringToNum} from '../../utils'
import './inputFields.styles.scss'



const LoanField2 = (props) =>  {

  const [inputData2, setInputData2] = useState(
    {
      premium: '',
      targetYear: '',
      targetBalance: '',
      projectedBalance: '',
      baseValue: '',
      tax: '',
      afterTaxAmount: '',
      diffAmount: ''
      }
  )
  const {premium, targetYear, targetBalance, projectedBalance, baseValue, tax, afterTaxAmount, diffAmount} = inputData2;
  const {extrapay, timeLeft, futureBalance } = props.inputData;
  const roundedYears = Math.round(timeLeft/12);

  const handleChange = (e) => {
    const {name, value} = e.target;
    const formattedVal = value.length > 3? parseFloat(value).toLocaleString('en'): value;
    setInputData2({...inputData2, [name] : formattedVal})

  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const projBalNum = formStringToNum(projectedBalance);
    const baseValNum = formStringToNum(baseValue);
    // const taxNum = formStringToNum(tax)
    const futBal = formStringToNum(futureBalance);


    let taxAmount = (projBalNum - baseValNum) * tax * 0.01;
    let afterTax = projBalNum - taxAmount;
    let diff = (afterTax - futBal);
    setInputData2({...inputData2, afterTaxAmount: afterTax.toLocaleString('en'), diffAmount: diff.toLocaleString('en')})
  }

    return (
      <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
       <fieldset className="form-fieldset">
         <legend className="form-legend">Input LI Details</legend>
         <FormInput name="payment" value={extrapay? extrapay : premium} onChange={handleChange} >Premium</FormInput>
         <FormInput name="targetYear" value={roundedYears? roundedYears : targetYear} onChange={handleChange}>Target Year</FormInput>
         <FormInput name="targetBalance" value={futureBalance? futureBalance: targetBalance} onChange={handleChange} >Target Balance</FormInput>
         <FormInput name="projectedBalance" value={projectedBalance} onChange={handleChange} >Input Projected Balance in {roundedYears}th year</FormInput>
         <FormInput name="baseValue" value={baseValue} onChange={handleChange} >Input Base Value</FormInput>
         <FormInput name="tax" value={tax} onChange={handleChange} >Input Tax %</FormInput>
         <button type="submit" >Calculate</button>
       </fieldset>
       </form>
       <div className="form-text">
       {afterTaxAmount? <div>
       <p>With Lump Summ withdrawal the amount after tax is equal to ${afterTaxAmount}. The difference with the target amount is {diffAmount}. </p>
       <p>Run the illustration for continuation of monthly payments from Cash Value.</p>
       </div> : null }
       </div>
       </div>

   )
  }




export default LoanField2