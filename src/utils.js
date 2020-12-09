export const calcTime =  (balance, interest, payment) => {

  // if (Number.isNaN(balance) ) {
  //   return '';
  let denominator = Math.log(1 + interest);
  let inner = 1 - (balance * interest/payment);
  let numerator = Math.log(1/inner);
  const time = numerator/denominator;
  return time.toString();
}

export const calcFutureBalance = (balance, payment, interest, timeLeft) => {
  let coeff = Math.pow((1 + interest), timeLeft);
  let futBal = balance * coeff - payment / interest * (coeff -1);
  // let roundedFutBalance = Math.round(futBal * 100) /100;
  let roundedFutBalance = Math.round(futBal);

  let futBalString = roundedFutBalance.toString();


  return futBalString;
}
