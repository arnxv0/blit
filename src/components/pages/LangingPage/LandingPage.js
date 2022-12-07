import React from "react";
import {
  LandingPageContainer,
  Title,
  TitleContainer,
} from "./LandingPage.style";

import { useState } from "react";
import { useEffect } from "react";
import Header from "../../custom/Header";

function LandingPage() {
  return (
    <LandingPageContainer>
      <Header />
    </LandingPageContainer>
  );
}

export default LandingPage;
