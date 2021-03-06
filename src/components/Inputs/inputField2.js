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
      target_year: '',
      target_balance: '',
      projected_balance: '',
      base_value: '',
      tax: ''
    })
  const [calcData2, setCalcData2] = useState({
    afterTaxAmount: '',
    diffAmount: ''
  })
  const [error, setError] = useState('');

  const {premium, target_year, target_balance, projected_balance, base_value, tax} = inputData2;
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
    let numProjBal = deleteSeparator(projected_balance);
    if(name === 'base_value' && parseFloat(value) > numProjBal) {
      message = 'Please check your input. The base value can not be more than the target value.'
    }
    setError(message);
    if(message.includes('numerical')) formattedVal = formattedVal.slice(0, -1);

    setInputData2({...inputData2, [name] : formattedVal})
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const projBalNum = formStringToNum(projected_balance);
    const baseValNum = formStringToNum(base_value);
    // const taxNum = formStringToNum(tax)
    const futBal = futureBalance? formStringToNum(futureBalance) : formStringToNum(target_balance);


    let taxAmount = projBalNum > baseValNum? (projBalNum - baseValNum) * tax * 0.01: 0;
    let afterTax = projBalNum - taxAmount;
    let diff = (afterTax - futBal);
    setCalcData2({...calcData2, afterTaxAmount: afterTax.toLocaleString('en'), diffAmount: diff.toLocaleString('en')})
  }

  const clearData = () => {
    setInputData2({
      premium: '',
      target_year: '',
      target_balance: '',
      projected_balance: '',
      base_value: '',
      tax: '',

      });
      setCalcData2({
        afterTaxAmount: '',
        diffAmount: ''
      });
      setError('');
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
         <FormInput name="target_year" value={roundedYears? roundedYears : target_year} onChange={handleChange}>Target Year</FormInput>
         <FormInput name="target_balance" value={futureBalance? futureBalance: target_balance} onChange={handleChange} currency required>Target Balance</FormInput>
         <FormInput name="projected_balance" value={projected_balance} onChange={handleChange} currency required >Input Projected Balance in {roundedYears}th year</FormInput>
         <FormInput name="base_value" value={base_value} onChange={handleChange} currency required >Input Base Value</FormInput>
         <FormInput name="tax" value={tax} onChange={handleChange} percent >Input Tax</FormInput>
         <div id="buttons">
         <button onClick={clearData}>Reset</button>
         <button id="button-2" type="submit" disabled={isEmpty2(inputData2) || error} >Calculate</button>

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
