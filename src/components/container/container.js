import React, {useState} from 'react'
import LoanField1 from '../Inputs/inputField1';
import LoanField2 from '../Inputs/inputField2';
import {calcTime, calcFutureBalance, formStringToNum} from '../../utils';
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
      extrapay: '',
      timeLeft: 0,
      futureBalance: ''
})
const {balance, payment, interest, extrapay} = inputData;


  const handleChange = (e) => {
    const { name, value } = e.target;
    const formattedVal = value.length > 3? parseFloat(value).toLocaleString('en'): value;
    setData({ ...inputData, [name]: formattedVal });

  }

  // let paymentNum = parseFloat(payment);
  //   let totalPay = paymentNum + parseFloat(extrapay);
  //   let balanceNum = parseFloat(balance);
  //   let interestNum = parseFloat(interest) * 0.01/12;
    // const time = useMemo(() => calcTime(balanceNum, interestNum, totalPay), [balanceNum, interestNum, totalPay]);

    // const futureBal = useMemo(() => calcFutureBalance(balanceNum, paymentNum, interestNum, time), [balanceNum, paymentNum, interestNum, time]) ;



  const handleSubmit = async (e) => {
    e.preventDefault();
    const paymentNum = formStringToNum(payment);
    const totalPay = paymentNum + formStringToNum(extrapay);
    const balanceNum = formStringToNum(balance);
    const interestNum = formStringToNum(interest) * 0.01/12;
    const time = calcTime(balanceNum, interestNum, totalPay);

    const futureBal =  calcFutureBalance(balanceNum, paymentNum, interestNum, time);
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
