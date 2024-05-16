import React, { ReactNode } from "react";

const Wrapper = ({ children }) => (
  <div className="container h-100 my-4 overflow-hidden rounded shadow">
    {/* <div className="row justify-content-center align-content-center h-100"> */}
      {children}
    {/* </div> */}
  </div>
);

export default Wrapper;
