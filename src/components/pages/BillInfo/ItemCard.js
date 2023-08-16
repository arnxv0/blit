import React from "react";
import styled from "styled-components";

const Container = styled.div`
  margin: 0;
  border: 1px solid ${({ theme }) => theme.secondaryFontColor};
  border-radius: 6px;
  margin: 10px 0;
  padding: 10px 10px;
  display: flex;
  justify-content: space-between;
`;

const Text = styled.span`
  color: ${({ theme }) => theme.primaryFontColor};
  font-size: 1rem;
  margin: 0;
  line-height: 1.5rem;
`;

const CrossButton = styled.button`
  background-color: ${({ theme }) => theme.secondaryFontColor};
  color: ${({ theme }) => theme.fontColorOnSecondary};
  font-size: 0.8rem;
  font-weight: 500;
  padding: 5px 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  margin-left: 10px;

  &:hover {
    transform: scale(1.02);
  }
`;

export default function ItemCard({ removeClick, item }) {
  console.log(item);
  return (
    <Container>
      <Text>
        {item.name} - {item.price}
      </Text>
      <CrossButton onClick={removeClick}>X</CrossButton>
    </Container>
  );
}
