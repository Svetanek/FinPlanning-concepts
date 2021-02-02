import { shallow} from 'enzyme';
import React from 'react';
import LoanField1 from './inputField1'


// {handleChange, handleSubmit, clearData, inputData, error}
describe('rendering first loan fiels component', () => {

  let mockHChange = jest.fn();
  let mockHSubmit = jest.fn();
  let mockClear = jest.fn();
  let mockEmpty = jest.fn();
  let mockError = '';
  let mockInput = {
      balance: '316000',
      payment: '1580',
      interest: '3.875',
      additional_payment: '500',
  }
  let mockCalc = {
    timeLeft: 0,
    futureBalance: ''
  }

  let mockProps = {
    handleChange: mockHChange,
    handleSubmit: mockHSubmit,
    clearData:  mockClear,
    inputData: mockInput,
    calcData: mockCalc,
    error: mockError,
    isEmpty: mockEmpty
  }
   const wrapper = shallow(<LoanField1 {...mockProps}/>);
  it('renders loanField1 component', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should render time and future balance message on click', () => {
    wrapper.find('[id="button-1"]').simulate('click');

    expect(wrapper.find('.form-text').exists()).toBe(true);
    expect(wrapper.find('#error').exists()).toBe(false);
  })
  it('should render error message', () => {
    let newMockInput = {
      balance: 'sum',
      payment: '',
      interest: '',
      additional_payment: '',
  }
  let newMockCalc = {
    timeLeft: 0,
    futureBalance: ''
  }

  let newMockError = "error message"
  let newMockProps = {  handleChange: mockHChange,
    handleSubmit: mockHSubmit,
    clearData:  mockClear,
    inputData: newMockInput,
    calcData: newMockCalc,
    error: newMockError}
  let newWrapper = shallow(<LoanField1 {...newMockProps} />)
    expect(newWrapper.find('#error').exists()).toBe(true);
  })

})


