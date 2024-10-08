import styled from "styled-components";

export const LandingPageContainer = styled.div`
  padding: 20px 10%;
`;

export const Title = styled.h1`
  color: ${({ theme }) => theme.secondaryFontColor};
`;

export const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 10%;
`;
