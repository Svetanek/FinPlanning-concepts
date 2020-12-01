import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
body {
  font-family: 'Lora';
  font-weight: 400;
  background-color: #c1fce8;;
  padding: 20px 40px;
  @media screen and (max-width: 800px) {
padding: 10px;
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
