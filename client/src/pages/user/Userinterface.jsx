import React from "react";
import InterBox from "./InterBox";
import CourseBar from "./CourseBar";
import Categorys from "./Categorys";
import CourseReviews from "../../components/user/cards/CourseReviews";

const Userinterface = () => {
  return (
    <>
      <InterBox />
      <div className="p-1">
        <CourseBar />
        <Categorys />
        <CourseReviews />
      </div>
    </>
  );
};

export default Userinterface;
