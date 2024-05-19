import React, { ReactNode } from "react";
import Spinner from "react-bootstrap/Spinner";

const Wrapper = ({ isLoading, children }) => (
  <div className="container h-100 my-4 overflow-hidden rounded shadow">
    {isLoading ? (
      <div className="h-100 d-flex justify-content-center align-items-center">
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Загрузка...</span>
        </Spinner>
      </div>
    ) : (
      <div className="row h-100 bg-white flex-md-row">{children}</div>
    )}
  </div>
);

export default Wrapper;
