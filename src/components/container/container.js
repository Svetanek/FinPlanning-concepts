import React, {useState} from 'react'
import LoanField1 from '../Inputs/inputField1';
import LoanField2 from '../Inputs/inputField2';
import {calcTime, calcFutureBalance} from '../../utils';
import styled from 'styled-components';
const StyledMain = styled.div`
display: flex;
justify-content: center;
`
const StyledHeader = styled.h2`
text-align: center;
`


const Container = () => {
const [inputData, setData] = useState({
      loan: '',
      balance: '',
      payment: '',
      interest: '',
      extrapay: '',
      timeLeft: '',
      futureBalance: ''
})
const {balance, payment, interest, extrapay} = inputData;

  const handleChange =(e) => {
    const { name, value } = e.target;
    setData({ ...inputData, [name]: value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let paymentNum = parseFloat(payment);
    let totalPay = paymentNum + parseFloat(extrapay);
    let balanceNum = parseFloat(balance);
    let interestNum = parseFloat(interest) * 0.01/12;
    let time = calcTime(balanceNum, interestNum, totalPay);
    let futureBal =  calcFutureBalance(balanceNum, paymentNum, interestNum, time);
    await setData({...inputData,
      timeLeft: time,
      futureBalance: futureBal}
    );

  }

    return (
      <div>
      <StyledHeader >
        Mortgage/loan overpayment comparison with Life Insurance with Cash Value
      </StyledHeader>
     <StyledMain>
       <LoanField1 inputData={inputData} handleChange={handleChange} handleSubmit={handleSubmit}/>
    <LoanField2 inputData={inputData}/>
     </StyledMain>
      </div>
    )
  }




export default Container;
