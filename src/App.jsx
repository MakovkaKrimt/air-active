import React from "react";
import { Routers } from "./routes/Routers";
import Toaster from "./utils/Toaster";
import "./App.css";
import { LineAnimate } from "./components/ForTest/LineAnimate";

const App = () => {
  return (
    <>
      {/* <LineAnimate /> */}

      <Routers />
      <Toaster />
    </>
  );
};

export default App;
