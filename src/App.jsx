import React from "react";
import { Routers } from './routes/Routers'
import Toaster from "./utils/Toaster";
import './App.css'


const App = () => {
  return (
    <>
      <Routers />
      <Toaster
      />
    </>
  );
};

export default App;
