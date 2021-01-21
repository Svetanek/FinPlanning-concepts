export const calcTime =  (balance, interest, payment) => {
  let denominator = Math.log(1 + interest);
  let inner = 1 - (balance * interest/payment);
  let numerator = Math.log(1/inner);
  const time = Math.round(numerator/denominator);
  return time;
}

export const calcFutureBalance = (balance, payment, interest, timeLeft) => {
  let coeff = Math.pow((1 + interest), timeLeft);
  let futBal = balance * coeff - payment / interest * (coeff - 1);
  // let roundedFutBalance = Math.round(futBal * 100) /100;
  let roundedFutBalance = Math.round(futBal);
  let futBalString = roundedFutBalance.toLocaleString('en');
  return futBalString;
}
   //ALTERNATIVE
  // const formatted = new Intl.NumberFormat('en', {style: "decimal"}).format(num);
export const formatStr = (str) => parseFloat(str).toLocaleString('en');


export const formStringToNum = (str) => parseFloat(str.replace(/,/g, ''))

export const validate = (name, value, lastInput) => {
  let message = ''
  if(value && isNaN(parseInt(lastInput)) && lastInput !== ".") {
    message = `please input only numerical value for ${name} field`;
  }
  return message;
}

export const deleteSeparator = (value) => {
      while(value.includes(',')) {
        let index = value.indexOf(',');
        value = value.slice(0, index) + value.slice(index + 1)
        // value.replace(/[,]/g, '');
      }
return value;
}
