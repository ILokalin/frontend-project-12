import React from "react";
import classNames from "classnames";
import Loader from "./Loader";

const Wrapper = ({ isLoading, children, isPage }) => {
  const wrapperClass = classNames(
    'h-100',
    { 'container-fluid': !isPage },
    { 'container my-4 overflow-hidden rounded shadow': isPage }
  );

  return (
    <div className={wrapperClass}>
      {isLoading ? (
        <Loader />
      ) : (
        children
      )}
    </div>
  );
};

export default Wrapper;
