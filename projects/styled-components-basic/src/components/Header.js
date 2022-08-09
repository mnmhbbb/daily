import React from "react";
import styledComponents from "../styles/Header-style";

const { CustomHeader, ThemeSwitchBtn } = styledComponents;

const Header = ({ switchTheme }) => {
  return (
    <CustomHeader>
      <ThemeSwitchBtn
        onClick={() => {
          switchTheme();
        }}
      >
        Change Theme
      </ThemeSwitchBtn>
    </CustomHeader>
  );
};

export default Header;
