import React from "react";
import BoxImage from "../../assets/interface/2-after-edit.png"
import "./css/box.css";

const InterBox = () => {
  return (
    <>
      <div className="container-fluid main-box  ">
        <div className="row  p-1">
          <div className="col-lg-6 order-lg-1 order-2 d-flex align-items-center text-center">
            <div className="mx-auto  the-title   text-white">
              <h1 className="find-your">Discover Your Dream Career</h1>

              <h2 className="typewriter">Find Your Way Forward</h2>
            </div>
          </div>
          <div className="col-lg-6 mt-lg-5 order-lg-2 order-1 d-flex align-items-center text-center">
            <div className="mx-auto">
              <img
                src={BoxImage}
                alt="Image"
                className="img-fluid"
                style={{ maxHeight: "450px", width: "auto" }}
              />
            </div>
          </div>
        </div>
        
      </div>
    </>
  );
};

export default InterBox;
