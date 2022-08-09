import React from 'react';
import styled from 'styled-components';
import Navbar from './Navbar';

const media = {
  desktop: '@media(min-width: 1000px)',
};

const Container = styled.div`
  width: 100%;
  background-color: #67bc98;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h3 {
    font-size: 20px;
    color: gray;
    margin: 1rem;
    align-self: flex-start;
  }

  .boxWrap {
    width: 90%;

    ${media.desktop} {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }

    .img {
      width: 100%;
      height: 200px;
      background-color: gray;

      ${media.desktop} {
        width: 48%;
      }
    }
    .cont {
      margin-top: 10px;
      width: 100%;
      height: 200px;
      background-color: gray;
      ${media.desktop} {
        width: 48%;
        margin-top: 0;
      }
    }
  }
`;

const App = () => {
  return (
    <>
      <Navbar />
      <Container>
        <h3>Some Heading</h3>
        <div className="boxWrap">
          <div className="img"></div>
          <div className="cont"></div>
        </div>
      </Container>
    </>
  );
};

export default App;
