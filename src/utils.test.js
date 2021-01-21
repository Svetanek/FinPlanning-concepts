import {calcTime, calcFutureBalance} from './utils'

describe('calculations', () => {
  let mockInterest = 3.875 * 0.01/12;
  let [mockBalance, mockPay, mockTotalPay] = [316000, 1580, 2080];
  let mockTime = 209;
  it('calculates time left to pay with extra payment', () => {
    let time = calcTime(mockBalance, mockInterest, mockTotalPay)
    expect(time).toEqual(209);
  });

  it('calculates the future balance at the time of potential payoff', () => {

    let future = calcFutureBalance(mockBalance, mockPay, mockInterest, mockTime);
    expect(future).toEqual('149,348');
  })

})


