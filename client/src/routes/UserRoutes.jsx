import React from "react";
import Navbar from "../components/user/Navbar.jsx";
import { Route, Routes } from "react-router-dom";
import Userinterface from "../pages/user/Userinterface.jsx";
import Overview from "../pages/user/Overview.jsx";
import NotFound from "../pages/user/NotFound.jsx";
import Allcourses from "../pages/user/Allcourses.jsx";
import Cart from "../pages/user/Cart.jsx";
import Mylearning from "../pages/user/Mylearning.jsx";
import PaymentSucces from "../components/user/PaymentSucces.jsx";
import PaymentFail from "../components/user/PaymentFail.jsx";
import OtpVerify from "../components/user/OtpVerify.jsx";
const UserRoutes = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Userinterface />} />
        <Route path="/courses/:courseId" element={<Overview />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/success" element={<PaymentSucces />} />
        <Route path="/cancel" element={<PaymentFail />} />
        <Route path="/allcourses" element={<Allcourses />} />
        <Route path="/mylearning" element={<Mylearning />} />
        <Route path="/verifyotp" element={<OtpVerify />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default UserRoutes;
