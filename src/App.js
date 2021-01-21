
import GlobalStyle from './global-styles.js';
import Container from './components/container/container'


function App() {
  return (
    <div>
    <GlobalStyle/>
    <Container/>
    </div>
  );
}

export default App;


//from initial App.test.js
// import { render, screen } from '@testing-library/react';
// import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });
