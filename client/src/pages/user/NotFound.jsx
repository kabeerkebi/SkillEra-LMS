import React from "react";
import { Link } from "react-router-dom";
import Notfounimage from "../../assets/Notfound/224747-P1IED5-24.jpg";

const NotFound = () => {
  return (
    <>
      <main
        style={{
          background: "#f1e7ce",
          display: "flex",
          justifyContent: "center",
          paddingBottom:"10px"
        }}
      >
 
        <div style={{ overflow: "hidden" }}>
          <img
            src={Notfounimage}
            className="img-fluid "
            alt="not found"
            style={{ maxHeight: "100vh", marginTop: "-15px ", marginBottom:"10px" }}
          />
          <div style={{ marginLeft: "25%"  , }}>
            <Link style={{background:"#8a5ad0"}}
              to="/"
              className="  rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Go back home
            </Link>
            <Link to="#" className="text-sm font-semibold text-gray-900 ms-3">
              Contact support <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default NotFound;
{
  /* <Link style={{background:"#8a5ad0"}} */
}
