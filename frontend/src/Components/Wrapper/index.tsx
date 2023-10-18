import React, { ReactNode } from "react";

interface WrapperProps {
  children: ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => (
  <div className="container-fluid h-100">
    <div className="row justify-content-center align-content-center h-100">
      {children}
    </div>
  </div>
);

export default Wrapper;
