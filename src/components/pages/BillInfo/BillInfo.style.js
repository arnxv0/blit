import styled from "styled-components";

export const BillInfoContainer = styled.div`
  padding: 20px 10%;
  color: ${({ theme }) => theme.primaryFontColor};
`;

export const Title = styled.h1`
  color: ${({ theme }) => theme.secondaryFontColor};
`;

export const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 10%;
`;

export const BigButton = styled.button`
  background-color: ${({ theme }) => theme.secondaryFontColor};
  color: ${({ theme }) => theme.fontColorOnSecondary};
  font-size: 1.2rem;
  font-weight: 500;
  padding: 10px 10px;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  width: 100%;
  box-sizing: border-box;
  margin-top: 30px;
  margin-bottom: 60px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);

  &:hover {
    transform: scale(1.02);
  }
`;
