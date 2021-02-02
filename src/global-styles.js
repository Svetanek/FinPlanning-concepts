import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
body {
  font-family: 'Lora';
  font-weight: 400;
  font-size: 16px;

  // background-color: #c1fce8;
  background-color: #83ced4;
  padding: 1rem;
  @media screen and (max-width: 900px) {
  padding: 0.625em;
  }
}

a {
  text-decoration: none;
  color: black;
}

* {
  box-sizing: border-box;
}
`;
export default GlobalStyle
