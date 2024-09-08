import React from "react";
import "./Skeleton.css";

function Skeleton() {
  return (
    <div className="skeleton-wrapper">
      <div className="skeleton-header"></div>
      <div className="skeleton-body">
        <div className="skeleton-title"></div>
        <div className="skeleton-line short"></div>
        <div className="skeleton-image"></div>
        <div className="skeleton-line medium"></div>
        <div className="skeleton-line long"></div>
        <div className="skeleton-line"></div>
        <div className="skeleton-button"></div>
      </div>
    </div>
  );
}

export default Skeleton;
    