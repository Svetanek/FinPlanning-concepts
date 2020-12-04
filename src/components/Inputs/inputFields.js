import React from 'react'
import './inputFields.styles.css'

//move state up, use useMemo

const calcTime =  (balance, interest, payment) => {

  // if (Number.isNaN(balance)) {
  //   return '';
  let denominator = Math.log(1 + interest);
  let inner = 1 - (balance * interest/payment);
  let numerator = Math.log(1/inner);
  const time = numerator/denominator;
  return time.toString();
}

const calcFutureBalance = ( payment, interest, term,timeLeft) => {
  let innerCalc = 1 - 1 / Math.pow((1 + interest), (term - timeLeft))
  let futureBalance = innerCalc * payment / interest;
  return futureBalance;


}
class LoanField extends React.Component  {
  constructor() {
    super();
    this.state = {
      balance: '',
      term:    '',
      payment: '',
      interest: '',
      extrapay: '',
      timeLeft: '',
      futureBalance: '',
    };

  }

  handleChange =(e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    let payment = parseFloat(this.state.payment);
    let totalPay = parseFloat(this.state.payment) + parseFloat(this.state.extrapay);
    let balance = parseFloat(this.state.balance);
    let interest = parseFloat(this.state.interest) * 0.01/12;
    let term = parseFloat(this.state.term) * 12;
    let time = calcTime(balance, interest, totalPay);
    let futureBal =  calcFutureBalance(payment, interest, term, time);
    await this.setState({
      timeLeft: time,
      futureBalance: futureBal
    });
    console.log('time===', this.state.timeLeft, 'future balance=', this.state.futureBalance);

  }
  render() {
    const timeLeft = this.state.timeLeft? this.state.timeLeft : null;
    let years = Math.floor(timeLeft/12);
    let months = Math.round(timeLeft - (years * 12));


    return (
      <form onSubmit={this.handleSubmit}>
       <fieldset className="field-set">
         <legend>Input Loan Details</legend>
         <div className="field-set_line">
         <label htmlFor="balance">Enter Initial Balance</label>
         <input  id="balance" name="balance" value={this.state.balance} onChange={this.handleChange}/>
         </div>
         <div className="field-set_line">
         <label htmlFor="term">Enter loan term</label>
         <input  id="term" name="term" value={this.state.term} onChange={this.handleChange}/>
         </div>

         <div className="field-set_line">
         <label htmlFor="interest">Interest</label>
         <input type="number" id="interest" name="interest" value={this.state.interest} min="0.001" step="0.001" onChange={this.handleChange} required/>
         </div>
         <div className="field-set_line">
         <label htmlFor="payment">Payment</label>
         <input type="number" id="payment" name="payment" value={this.state.payment} min="0" onChange={this.handleChange} required/>
         </div>
         <div className="field-set_line">
         <label htmlFor="extrapay">Additional Payment</label>
         <input type="number" id="extrapay" name="extrapay" value={this.state.extrapay} min="0" onChange={this.handleChange} required/>
         </div>
         <button type="submit" >Calculate time to pay off the balance</button>
       </fieldset>
    {this.state.timeLeft? <div><p>`Time to pay off is ${years} years and ${months} months`</p><p>{`The Future Balance is ${(Math.round(this.state.futureBalance * 100)) /100}`}</p> </div> : null}
       </form>

   )
  }


}

export default LoanField
