import React from "react";
import ReactDOM from "react-dom/client";
import init from './init';
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";



const run = async () => {
  const root = ReactDOM.createRoot(document.getElementById("chat"));
  const app = await init();
  root.render(<React.StrictMode>{app}</React.StrictMode>);
};

run();
