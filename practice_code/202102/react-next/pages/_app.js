import React from "react";
import Head from "next/head";
import PropTypes from "prop-types";
import "antd/dist/antd.css";

const Every = ({ Component }) => {
  return (
    <>
      <Head>
        <title>next study</title>
      </Head>
      <Component />
    </>
  );
};

Every.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default Every;
