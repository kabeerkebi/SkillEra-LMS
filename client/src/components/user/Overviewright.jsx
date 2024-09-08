import React, { useEffect, useState } from "react";
import CourseInfo from "./cards/CourseInfo";
import axios from "../../utils/axios";
import { useParams } from "react-router-dom";
const Overviewright = ({ courseData, pageRefresh }) => {
  const [CourseResult, setCourseResult] = useState([]);
  const { courseId } = useParams();
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get(`courses/${courseId}`);
        setCourseResult(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchdata();
  }, [pageRefresh]);
  const checkId = async (value) => {
    try {
      const response = await axios.get(`courses/lesson/${value}`);
      courseData(response.data);
      console.log("check lesson " + response.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="mt-lg-5">
        <CourseInfo TheResult={CourseResult} Theid={checkId} />
      </div>
    </>
  );
};
export default Overviewright;
