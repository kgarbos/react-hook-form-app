import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Result from "./components/Steps/Result";
import Step1 from "./components/Steps/Step1";
import Step2 from "./components/Steps/Step2";
import Step3 from "./components/Steps/Step3";

function App() {
  return (
    <>
      <Header />
      <Router>
        <Routes>
          <Route exact path="/" element={<Step1/>} />
          <Route path="/step2" element={<Step2/>} />
          <Route path="/step3" element={<Step3/>} />
          <Route path="/result" element={<Result/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
