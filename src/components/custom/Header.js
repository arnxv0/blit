import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ThemeContext } from "../../theme/ThemeContext";
import GoogleAds from "./GoogleAds";
import ThemeToggleButton from "./ThemeToggleButton";

const Title = styled.h1`
  color: ${({ theme }) => theme.secondaryFontColor};
  font-size: 2.6rem;

  &:hover {
    cursor: pointer;
  }

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

  const navigate = useNavigate();

  return (
    <>
      <GoogleAds slot="8845192027" />
      <TitleContainer>
        <Title onClick={() => navigate("/")}>Blit</Title>
        <ThemeToggleButton theme={theme} toggleTheme={toggleTheme} />
      </TitleContainer>
    </>
  );
}

export default Header;
