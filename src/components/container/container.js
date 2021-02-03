import React, { useState} from 'react'
import LoanField1 from '../Inputs/inputField1';
import LoanField2 from '../Inputs/inputField2';
import {calcTime, calcFutureBalance, formStringToNum, validate, deleteSeparator, isEmpty} from '../../utils';
import styled from 'styled-components';
const StyledHeader = styled.h2`
text-align: center;
padding-bottom: 0 0.5rem;
color: #044a4f;
@media screen and (max-width: 900px) {
  font-size: 1.3em;
  padding: 0.3rem;
}
`
const StyledText = styled.div`
padding: 0 1rem`
const StyledMain = styled.div`
display: flex;
justify-content: space-between;
width: 100%;
@media screen and (max-width: 900px) {
  padding: 1rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
`

const Container = () => {
const [inputData, setData] = useState({
      balance: '',
      payment: '',
      interest: '',
      additional_payment: ''
})
const[calcData, setCalcData] = useState({
  timeLeft: 0,
  futureBalance: ''
})
const [error, setError] = useState('')
const {balance, payment, interest, additional_payment} = inputData;


  const handleChange = (e) => {
    let { name, value } = e.target;
    let formattedVal = value;
    let lastInput = value[value.length - 1];
    let message = validate(name, value, lastInput)
    setError(message);
    if(message) formattedVal = '';

    if(value.length > 3) {
      if(value.includes(',')) {
      value = deleteSeparator(value);
      }
      formattedVal = parseFloat(value).toLocaleString('en');
    }
    setData({ ...inputData, [name]: formattedVal });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(error)
    const paymentNum = formStringToNum(payment);
    const totalPay = paymentNum + formStringToNum(additional_payment);
    const balanceNum = formStringToNum(balance);
    const interestNum = formStringToNum(interest) * 0.01/12;
    const time = calcTime(balanceNum, interestNum, totalPay);
    const futureBal =  calcFutureBalance(balanceNum, paymentNum, interestNum, time);
    await setCalcData({...calcData,
      timeLeft: time,
      futureBalance: futureBal}
    );
    let message = '';
    if(!time || !futureBal) {
      message  = 'check your input'
    }
    setError(message);
  }

  const clearData = () => {
    setData({
      balance: '',
      payment: '',
      interest: '',
      additional_payment: ''
})
  setCalcData({
  timeLeft: 0,
  futureBalance: ''
})
  }

    return (
      <div>




      <StyledHeader >
        Mortgage/loan overpayment comparison with Life Insurance with Cash Value
      </StyledHeader>
      <StyledText>
      <p>The calculator is devided in 2 parts. 1st - based on the current balance, which is easy to find in the last statement, you can calculate the time starting from today (not from original loan day) when the mortgage or loan can be paid off with the additional amount. Also it calculates the future balance at that time with the current payment schedule, without extra amount.</p>
        <p>2nd part is to compare that future balance with the projected cash value at the year of potential payoff using the approach of maximizing CV with funding policy up to MEC limit. In case the LI cash value significanly higher than the target future balance, there are 2 options to consider: to pay off the whole balance (with the tax consideration). The additional benefit here is LI coverage during all those years. And the second option is to continue paying mortgage payments and having tax advantage for interest but the source of payments to be switched to cash value. The separate LI illustration has to be run for that option.</p>
      </StyledText>
     <StyledMain>
       <LoanField1 inputData={inputData} calcData={calcData} error={error} handleChange={handleChange} handleSubmit={handleSubmit} clearData={clearData} isEmpty={isEmpty(inputData)}/>
    <LoanField2 payment={inputData.additional_payment} calcData={calcData}/>
     </StyledMain>
      </div>
    )
  }

export default Container;
