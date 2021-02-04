import { createGlobalStyle } from 'styled-components';

//background-color: #83ced4 #0c899b;
 // background-color: #c1fce8;
// background-image: linear-gradient(to bottom, #a8d4e6, #73a9bf);
const GlobalStyle = createGlobalStyle`
body {
  font-family: 'Lora';
  font-weight: 400;
  font-size: 16px;


  background-image: linear-gradient(to bottom, #bce4e9, #77bcc5);;
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
