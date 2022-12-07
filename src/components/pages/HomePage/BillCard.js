import React from "react";
import styled from "styled-components";
import { BsPlusSquareDotted } from "react-icons/bs";

const CardContainer = styled.div`
  background-color: ${({ theme }) => theme.secondaryFontColor};
  border-radius: 10px;
  padding: 10px;
  margin: 10px;
  width: 200px;
  height: 150px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  transition: all 0.1s linear;
  align-items: center;
  justify-content: center;
  display: flex;

  &:hover {
    transform: scale(1.05);
    cursor: pointer;
  }
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.fontColorOnSecondary};
  text-align: center;
  font-size: 1.5rem;
  margin: 0;
`;

const IconContainer = styled.div`
  color: ${({ theme }) => theme.fontColorOnSecondary};
  font-size: 3.5rem;
  text-align: center;
  line-height: 2rem;
`;

function BillCard({
  name = "",
  id = 0,
  createCard = false,
  addCard = () => {},
}) {
  if (createCard) {
    return (
      <CardContainer onClick={addCard}>
        <IconContainer>
          <BsPlusSquareDotted />
        </IconContainer>
      </CardContainer>
    );
  }

  return (
    <CardContainer>
      <Title>{name}</Title>
    </CardContainer>
  );
}

export default BillCard;
