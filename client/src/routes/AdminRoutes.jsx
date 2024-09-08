import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/admin/Login";
import Dashboard from "../pages/admin/Dashboard";
import PostingCourse from "../pages/admin/PostingCourse";
const AdminRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/postingcourse/*" element={<PostingCourse />} />
      </Routes>
    </div>
  );
};

export default AdminRoutes;
