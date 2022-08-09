import React from "react";
import styledComponents from "../styles/Container-style";

const { CustomContainer } = styledComponents;

const Container = ({ currentThemeText }) => {
  return (
    <CustomContainer>
      <h1>{currentThemeText}</h1>
    </CustomContainer>
  );
};

export default Container;
