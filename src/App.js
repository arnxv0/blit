import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import ThemeContextProvider from "./theme/ThemeContext";

import LandingPage from "./components/pages/LangingPage/LandingPage";
import NotFoundPage from "./components/pages/NotFoundPage/NotFoundPage";
import HomePage from "./components/pages/HomePage/HomePage";
import BillInfo from "./components/pages/BillInfo/BillInfo";

// icons
// https://react-icons.github.io/react-icons/

function App() {
  return (
    <ThemeContextProvider>
      <Router>
        <Routes>
          {/* <Route path="/" element={<LandingPage />} /> */}
          {/* <Route path="/home" element={<HomePage />} /> */}
          <Route path="/" element={<HomePage />} />
          <Route path="/bill/:billId" element={<BillInfo />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </ThemeContextProvider>
  );
}

export default App;
