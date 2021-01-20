import React, {useState} from 'react';
import FormInput from '../form-input/form-input.js'
import {formStringToNum} from '../../utils'
import './inputFields.styles.scss'



const LoanField2 = (props) =>  {

  const {additional_payment, timeLeft, futureBalance } = props.inputData;

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
  const [error, setError] = useState('');

  const {premium, targetYear, targetBalance, projectedBalance, baseValue, tax, afterTaxAmount, diffAmount} = inputData2;

  const roundedYears = Math.round(timeLeft/12);

  const handleChange = (e) => {
    let {name, value} = e.target;
    let formattedVal = value;
    let message = '';
    if(isNaN(parseFloat(value))) {
      message = `please input only numerical value for ${name}`
    }
    setError(message)

    if(value.length > 3) {
      while(value.includes(',')) {
        let index = value.indexOf(',');
        value = value.slice(0, index) + value.slice(index + 1)
        // value.replace(/[,]/g, '');
      }

      formattedVal = parseFloat(value).toLocaleString('en');
    }

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

  const clearData = () => {
    setInputData2({
      premium: '',
      targetYear: '',
      targetBalance: '',
      projectedBalance: '',
      baseValue: '',
      tax: '',
      afterTaxAmount: '',
      diffAmount: ''
      })
  }

    return (
      <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
       <fieldset className="form-fieldset">
         <legend className="form-legend">Input LI Details</legend>
         <FormInput name="premium" value={additional_payment? additional_payment : premium} onChange={handleChange} currency >Premium</FormInput>
         <FormInput name="targetYear" value={roundedYears? roundedYears : targetYear} onChange={handleChange}>Target Year</FormInput>
         <FormInput name="targetBalance" value={futureBalance? futureBalance: targetBalance} onChange={handleChange} currency required>Target Balance</FormInput>
         <FormInput name="projectedBalance" value={projectedBalance} onChange={handleChange} currency required >Input Projected Balance in {roundedYears}th year</FormInput>
         <FormInput name="baseValue" value={baseValue} onChange={handleChange} currency required >Input Base Value</FormInput>
         <FormInput name="tax" value={tax} onChange={handleChange} >Input Tax %</FormInput>
         <div id="buttons">
         <button type="submit" >Calculate</button>
         <button onClick={clearData}>Reset</button>
         </div>
       </fieldset>
       </form>
       <div className="form-text">
       {afterTaxAmount? <div>
       <p>With Lump Sum withdrawal the amount after tax is equal to ${afterTaxAmount}. The difference with the target amount is {diffAmount}. </p>
       <p>As alternative run the illustration for continuation of monthly payments from Cash Value.</p>
       </div> : null }
       {error? <div id='error' >{`* ${error}`}</div >: null}
       </div>
       </div>

   )
  }




export default LoanField2
