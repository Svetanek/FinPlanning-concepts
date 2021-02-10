import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
body {
  font-family: 'Lora';
  font-weight: 400;
  font-size: 16px;
  min-height: 100vh;
  background-image: linear-gradient(to bottom, #d4d4d48a, #aad3da);
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
