import React, {useState} from 'react';
import './inputFields.styles.css'

//move state up, use useMemo


const LoanField2 = (props) =>  {

  const [inputData2, setInputData2] = useState(
    {
      projectedBalance: '',
      baseValue: '',
      tax: '',
      afterTaxAmount: '',
      diffAmount: ''
      }
  )
  const {projectedBalance, baseValue, tax, afterTaxAmount, diffAmount} = inputData2;
  const {extrapay, timeLeft, futureBalance } = props.inputData;
  const roundedYears = Math.round(timeLeft/12);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setInputData2({...inputData2, [name] : value})

  }
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submitted');
    let taxAmount = (projectedBalance - baseValue) * tax * 0.01;
    let afterTax = projectedBalance - taxAmount;
    let diff = (afterTax - futureBalance).toString();
    setInputData2({...inputData2, afterTaxAmount: afterTax, diffAmount: diff})
  }

    return (

      <form onSubmit={handleSubmit}>
       <fieldset className="field-set">
         <legend>Input LI Details</legend>
         <div className="field-set_line">
         <label htmlFor="extrapay">Additional Payment</label>
         <input id="extrapay" name="extrapay" value={extrapay} />
         </div>

         <div className="field-set_line">
         <label htmlFor="targetYear">Target Year</label>
         <input  id="targetYear" name="targetYear" value={roundedYears} />
         </div>
         <div className="field-set_line">
         <label htmlFor="targetBalance">Target Balance</label>
         <input  id="targetBalance" name="targetBalance" value={futureBalance} />
         </div>
         <div className="field-set_line">
         <label htmlFor="projectedBalance">Input Projected Balance in {roundedYears}th year</label>
         <input  id="projectedBalance" name="projectedBalance" value={projectedBalance} onChange={handleChange} />
         </div>
         <div className="field-set_line">
         <label htmlFor="baseValue">Input Base value</label>
         <input  id="baseValue" name="baseValue" value={baseValue} onChange={handleChange} />
         </div>
         <div className="field-set_line">
         <label htmlFor="tax">Input Tax bracket</label>
         <input  id="tax" name="tax" value={tax} onChange={handleChange} />
         </div>
         <button type="submit" >Calculate</button>
       </fieldset>
       <p>With Lump Summ withdrawal the amount after tax is equal to {afterTaxAmount}. The difference with the target amount is ${diffAmount} </p>
       <p>Run the illustration for continuation of monthly payments from Cash Value</p>
       </form>

   )
  }




export default LoanField2
