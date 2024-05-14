import React, { ReactNode } from "react";

const Wrapper = ({ children }) => (
  <div className="container-fluid h-100">
    <div className="row justify-content-center align-content-center h-100">
      {children}
    </div>
  </div>
);

export default Wrapper;
