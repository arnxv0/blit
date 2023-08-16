import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: inline-block;
  margin: 0;
  border: 1px solid ${({ theme }) => theme.secondaryFontColor};
  border-radius: 6px;
  margin: 5px 5px;
  padding: 10px 10px;
  width: fit-content;
`;

const Text = styled.span`
  color: ${({ theme }) => theme.primaryFontColor};
  font-size: 1rem;
  margin: 0;
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

export default function UserCard({ removeClick, name }) {
  return (
    <Container>
      <Text>{name}</Text>
      <CrossButton onClick={removeClick}>X</CrossButton>
    </Container>
  );
}
