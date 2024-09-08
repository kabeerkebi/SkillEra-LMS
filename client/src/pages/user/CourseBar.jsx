import React, { useEffect, useState } from "react";
import "./css/coursebar.css";
import TabcourseTitle from "../../components/user/TabcourseTitle";
import TheTabCategory from "../../components/user/cards/TheTabCategory";
import axios from "../../utils/axios";
import CircularProgress from "@mui/material/CircularProgress"; // Importing MUI CircularProgress for loading

const CourseBar = () => {
  const [category, setCategory] = useState("Web Development");
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Start loading
        const response = await axios.get("/courses/findcategory", {
          params: { category },
        });
        setResult(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false); // Stop loading
      }
    };
    fetchData();
  }, [category]);

  const changeCourses = (index) => {
    console.log(index);
    setCategory(index);
  };

  return (
    <>
      <div className="container mt-2 pb-lg-4 pb-2">
        <h1 className="all-skill mt-lg-5 m-2 ms-lg-5">
          All the skills you need in one place
        </h1>
        <p className="From-critical ms-lg-5">
          From critical skills to technical topics, SkillEra supports your
          professional development.
        </p>
      </div>
      {/* The courses bar */}
      <div className="container div  ">
        <TabcourseTitle onTabClick={changeCourses} />
      </div>

      <div className="p-sm-1 m-sm-1 p-md-4 m-md-4 the-course-card-main-div">
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "200px",
            }}
          >
            <CircularProgress /> {/* Loading spinner */}
          </div>
        ) : (
          <TheTabCategory AllData={result} />
        )}
      </div>
    </>
  );
};

export default CourseBar;
