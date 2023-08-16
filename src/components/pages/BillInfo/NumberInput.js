import React from "react";
import styled from "styled-components";

const Title = styled.span`
  color: ${({ theme }) => theme.primaryFontColor};
  font-size: 1rem;

  @media (max-width: 950px) {
    font-size: 1rem;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`;

export default function NumberInput({
  label,
  type,
  placeholder,
  value,
  onChange,
}) {
  return (
    <p>
      <Title>{label} </Title>
      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </p>
  );
}
