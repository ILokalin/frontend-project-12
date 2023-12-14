import React from "react";
import ReactDOM from "react-dom/client";
import init from './init';
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";


const run = async () => {
  const root = ReactDOM.createRoot(
    document.getElementById("chat") as HTMLElement
  );
  const app = await init();
  root.render(<React.StrictMode>{app}</React.StrictMode>);
};

run();
