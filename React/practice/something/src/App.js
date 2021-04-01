import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Bookmark from './pages/Bookmark';
import Nav from './components/Nav';
import styled, { createGlobalStyle } from 'styled-components';
import Search from './components/Search';

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
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function App() {
  return (
    <div>
      <BrowserRouter>
        <Nav />
        <GlobalStyle />
        <AppStyle>
          <Route exact path="/" component={Search} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/bookmark" component={Bookmark} />
        </AppStyle>
      </BrowserRouter>
    </div>
  );
}

export default App;
