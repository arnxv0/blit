import styled from "styled-components";

export const HomePageContainer = styled.div`
  padding: 20px 10%;
`;

export const Title = styled.p`
  color: ${({ theme }) => theme.secondaryFontColor};
  font-size: 1.5rem;

  @media (max-width: 950px) {
    font-size: 1.4rem;
  }
`;

export const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 0;
`;

export const BillBoxContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
