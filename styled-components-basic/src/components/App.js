import React, { useState } from "react";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "../styles/GlobalStyles";
import { darkTheme, lightTheme } from "../styles/Theme";
import Header from "./Header";
import Container from "./Container";

const App = () => {
  const [theme, setTheme] = useState(lightTheme);
  const [currentThemeText, setCurrentThemeText] = useState("Light Theme");

  const switchTheme = () => {
    const nextTheme = theme === lightTheme ? darkTheme : lightTheme;
    setTheme(nextTheme);
    const nextThemeText = theme === lightTheme ? "Dark Theme" : "Light Theme";
    setCurrentThemeText(nextThemeText);
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Header switchTheme={switchTheme} />
      <Container currentThemeText={currentThemeText} />
    </ThemeProvider>
  );
};

export default App;
