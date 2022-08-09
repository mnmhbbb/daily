import styled, { css } from "styled-components";

const ThemeSwitchBtn = styled.button`
  ${({ theme }) => {
    return css`
      background-color: ${theme.colors.primary};
      color: ${theme.colors.secondary};
      font-size: ${theme.fonts.size.base};
      border-radius: 2px;
    `;
  }}
`;

const CustomHeader = styled.div`
  ${({ theme }) => {
    return css`
      padding: 1rem;
      display: flex;
      justify-content: center;
      background-color: ${theme.colors.secondary};
    `;
  }}
`;

const styledComponents = { ThemeSwitchBtn, CustomHeader };

export default styledComponents;
