import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import CoursesContent from "../../components/admin/CoursesContent";
import CoursesInformation from "../../components/admin/CoursesInformation";
import InstructorInformation from "../../components/admin/InstructorInformation";
import "./css/postingcourse.css";
import axios from "../../utils/axios";
import { useNavigate } from "react-router-dom";
const PostingCourse = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const fecthdata = async () => {
      try {
        const response = await axios.get("/auth/checkadmin");
        console.log(response);
        if (!response.data.success) {
          navigate("/admin");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fecthdata();
  }, []);
  return (
    <>
      <Routes>
        <Route path="/coursescontent" element={<CoursesContent />} />
        <Route path="/coursesinformation" element={<CoursesInformation />} />
        <Route
          path="/instructorinformation"
          element={<InstructorInformation />}
        />
      </Routes>
    </>
  );
};

export default PostingCourse;
