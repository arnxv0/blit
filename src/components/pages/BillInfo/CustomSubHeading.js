import React from "react";
import styled from "styled-components";

const HeadingContainer = styled.div`
  padding: 10px 10px;
  background-color: ${({ theme }) => theme.secondaryFontColor};
  margin: 0 0 10px 0;
`;

const HeadingText = styled.h2`
  color: ${({ theme }) => theme.fontColorOnSecondary};
  font-size: 1.5rem;
  font-weight: 500;
  margin: 0;
  padding: 0px;
`;

export default function CustomSubHeading({ children }) {
  return (
    <HeadingContainer>
      <HeadingText>{children}</HeadingText>
    </HeadingContainer>
  );
}
