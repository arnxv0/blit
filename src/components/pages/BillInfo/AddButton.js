import React from "react";
import styled from "styled-components";

const CustomButton = styled.button`
  background-color: ${({ theme }) => theme.secondaryFontColor};
  color: ${({ theme }) => theme.fontColorOnSecondary};
  font-size: 0.8rem;
  font-weight: 500;
  padding: 10px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  margin-left: 10px;
  width: 170px;

  &:hover {
    transform: scale(1.02);
  }
`;

export default function AddButton({ onClick, children }) {
  return <CustomButton onClick={onClick}>{children}</CustomButton>;
}
