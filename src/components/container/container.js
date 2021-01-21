import React, { useState} from 'react'
import LoanField1 from '../Inputs/inputField1';
import LoanField2 from '../Inputs/inputField2';
import {calcTime, calcFutureBalance, formStringToNum, validate, deleteSeparator} from '../../utils';
import styled from 'styled-components';
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
const StyledHeader = styled.h2`
text-align: center;
padding: 1rem;
color: #044a4f;
@media screen and (max-width: 900px) {
  font-size: 1.3em;
  padding: 0.3rem;
}
`
const Container = () => {
const [inputData, setData] = useState({
      loan: '',
      balance: '',
      payment: '',
      interest: '',
      additional_payment: '',
      timeLeft: 0,
      futureBalance: '',

})
const [error, setError] = useState('')
const {balance, payment, interest, additional_payment} = inputData;


  const handleChange = (e) => {
    let { name, value } = e.target;
    let formattedVal = value;
    let lastInput = value[value.length - 1];
    let message = validate(name, value, lastInput)
    setError(message);

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
    console.log('time=', time, 'FUTURE', futureBal);
    await setData({...inputData,
      timeLeft: time,
      futureBalance: futureBal}
    );
  }

  const clearData = () => {
    setData({
      loan: '',
      balance: '',
      payment: '',
      interest: '',
      additional_payment: '',
      timeLeft: 0,
      futureBalance: '',

})
  }

    return (
      <div>
      <StyledHeader >
        Mortgage/loan overpayment comparison with Life Insurance with Cash Value
      </StyledHeader>
     <StyledMain>
       <LoanField1 inputData={inputData} error={error} handleChange={handleChange} handleSubmit={handleSubmit} clearData={clearData}/>
    <LoanField2 inputData={inputData}/>
     </StyledMain>
      </div>
    )
  }




export default Container;
