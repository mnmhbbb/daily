import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Nav from './components/Nav';
import styled, { createGlobalStyle } from 'styled-components';
import Home from './pages/Home';

const GlobalStyle = createGlobalStyle`  
  body {
    width: 100%;
    height: 100vh;
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    font-family: Roboto, "Noto Sans KR", "Apple SD Gothic Neo", "Nanum Gothic", "Malgun Gothic", sans-serif;
  }
`;

const AppStyle = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  justify-content: center;
  // align-items: center;
`;

function App() {
  return (
    <div>
      <BrowserRouter>
        <Nav />
        <GlobalStyle />
        <AppStyle>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/profile" component={Profile} />
        </AppStyle>
      </BrowserRouter>
    </div>
  );
}

export default App;
