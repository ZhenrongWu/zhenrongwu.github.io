import React from "react";

const NotFound = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="text-center">
        <h1 className="display-1">404</h1>
        <p>找不到頁面</p>
        <a href="/" className="btn btn-lavender text-light">
          返回首頁
        </a>
      </div>
    </div>
  );
};

export default NotFound;
