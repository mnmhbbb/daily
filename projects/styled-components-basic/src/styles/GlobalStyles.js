import { createGlobalStyle, css } from "styled-components";
import reset from "styled-reset";
import customReset from "./customReset.scss";

const GlobalStyle = createGlobalStyle`
    ${reset};
    ${customReset};

    html {
          font-size: 62.5%; //1rem = 10px;
        }

    ${({ theme }) => {
      return css`
        body {
          font-family: ${theme.fonts.family.base};
          font-weight: ${theme.fonts.weight.normal};
          font-size: ${theme.fonts.size.base};
        }
      `;
    }}
`;

export default GlobalStyle;
