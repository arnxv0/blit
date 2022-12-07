import React from "react";
import { useContext } from "react";
import styled from "styled-components";
import { ThemeContext } from "../../theme/ThemeContext";
import GoogleAds from "./GoogleAds";
import ThemeToggleButton from "./ThemeToggleButton";

const Title = styled.h1`
  color: ${({ theme }) => theme.secondaryFontColor};
  font-size: 2.6rem;

  @media (max-width: 950px) {
    font-size: 2.2rem;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 0;
`;

function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <>
      <GoogleAds slot="8845192027" />
      <TitleContainer>
        <Title>Blit</Title>
        <ThemeToggleButton theme={theme} toggleTheme={toggleTheme} />
      </TitleContainer>
    </>
  );
}

export default Header;
