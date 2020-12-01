import React from 'react'
import './inputFields.styles.css'


const LoanField = () => {

  return (
    <form className="form">
      <fieldset className="field-set">
        <legend>Input Loan Details</legend>
        <div className="field-set_line">
        <label htmlFor="initial_balance">Enter Initial Balance</label>
        <input type="number" id="initial_balance" name="initial_balance" min="0"></input>
        </div>
        <div className="field-set_line">
        <label htmlFor="interest">Interest</label>
        <input type="number" id="interset" name="interest" min="0.1"></input>
        </div>


      </fieldset>
    </form>
  )

}

export default LoanField
