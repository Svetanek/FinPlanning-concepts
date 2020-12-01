import React from 'react'
import LoanField from '../Inputs/inputFields'
import styled from 'styled-components';
const StyledMain = styled.div`
display: flex;
justify-content: center;
`
const StyledHeader = styled.p`
text-align: center;
`


const Container = () => (
  <div>
  <StyledHeader>
    Mortgage/loan overpayment comparison with LI
  </StyledHeader>
 <StyledMain>
   <LoanField/>
<LoanField/>
 </StyledMain>
  </div>
)

export default Container;
