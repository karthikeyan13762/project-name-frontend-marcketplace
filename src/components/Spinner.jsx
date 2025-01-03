import React from "react";

function Spinner() {
  return (
    <div
      className="d-flex justify-content-center align-items-center position-fixed top-0 start-0 w-100 h-100 bg-light"
      style={{ opacity: 0.8, zIndex: 1050 }}
    >
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

export default Spinner;
