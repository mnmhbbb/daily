import React from 'react';
import Head from 'next/head';
import 'antd/dist/antd.css';
import PropTypes from 'prop-types';

const App = ({ Component }) => {
  return (
    <div>
      <Head>
        <meta charSet="utf-8" />
        <title>MINI LAND</title>
      </Head>
      <Component />
    </div>
  );
};

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
};
export default App;
