import React, {useState} from 'react';
import FormInput from '../form-input/form-input.js'
import {formStringToNum, validate, deleteSeparator} from '../../utils'
import './inputFields.styles.scss'



const LoanField2 = (props) =>  {

  const additional_payment = props.payment;
  const {timeLeft, futureBalance } = props.calcData

  const [inputData2, setInputData2] = useState(
    {
      premium: '',
      targetYear: '',
      targetBalance: '',
      projectedBalance: '',
      baseValue: '',
      tax: ''
    })
  const [calcData2, setCalcData2] = useState({
    afterTaxAmount: '',
    diffAmount: ''
  })
  const [error, setError] = useState('');

  const {premium, targetYear, targetBalance, projectedBalance, baseValue, tax} = inputData2;
  const {afterTaxAmount, diffAmount} = calcData2;

  const roundedYears = Math.round(timeLeft/12);

  const handleChange = (e) => {
    let {name, value} = e.target;
    let formattedVal = value;
    // let lastInput = value[value.length - 1];


    if(value.length > 3) {
      if(value.includes(',')) {
      value = deleteSeparator(value);
      }
      formattedVal = parseFloat(value).toLocaleString('en');
    }

    let message = validate(name, value, value[value.length - 1]);
    let numProjBal = deleteSeparator(projectedBalance);
    if(name === 'baseValue' && parseFloat(value) > numProjBal) {
      message = 'Please check your input. The base value can not be more than the target value.'
    }
    setError(message);


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
    setCalcData2({...calcData2, afterTaxAmount: afterTax.toLocaleString('en'), diffAmount: diff.toLocaleString('en')})
  }

  const clearData = () => {
    setInputData2({
      premium: '',
      targetYear: '',
      targetBalance: '',
      projectedBalance: '',
      baseValue: '',
      tax: '',

      })
      setCalcData2({
        afterTaxAmount: '',
        diffAmount: ''
      })
  }
  const isEmpty2 = (input) => {
    const manualInputFields = Object.values(input).slice(-3);
    return manualInputFields.includes('');
  }

    return (
      <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
       <fieldset className="form-fieldset">
         <legend className="form-legend">Input LI Details</legend>
         <FormInput name="premium" value={additional_payment? additional_payment : premium} onChange={handleChange} currency >Premium (monthly)</FormInput>
         <FormInput name="targetYear" value={roundedYears? roundedYears : targetYear} onChange={handleChange}>Target Year</FormInput>
         <FormInput name="targetBalance" value={futureBalance? futureBalance: targetBalance} onChange={handleChange} currency required>Target Balance</FormInput>
         <FormInput name="projectedBalance" value={projectedBalance} onChange={handleChange} currency required >Input Projected Balance in {roundedYears}th year</FormInput>
         <FormInput name="baseValue" value={baseValue} onChange={handleChange} currency required >Input Base Value</FormInput>
         <FormInput name="tax" value={tax} onChange={handleChange} percent >Input Tax</FormInput>
         <div id="buttons">
         <button onClick={clearData}>Reset</button>
         <button type="submit" disabled={isEmpty2(inputData2) || error} >Calculate</button>

         </div>
       </fieldset>
       </form>
       <div className="form-text">
       {(afterTaxAmount && !error)? <div>
       <p>With Lump Sum withdrawal the amount after tax is equal to ${afterTaxAmount}. The difference with the target amount is {diffAmount}. </p>
       <p>As alternative run the illustration for continuation of monthly payments from Cash Value.</p>
       </div> : null }
       {error? <div id='error' >{`* ${error}`}</div >: null}
       </div>
       </div>

   )
  }




export default LoanField2
