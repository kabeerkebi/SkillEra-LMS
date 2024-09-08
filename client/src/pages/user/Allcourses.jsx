import React, { useState, useEffect } from "react";
import AllcoursesLeft from "../../components/user/AllcoursesLeft";
import AllcoursesRight from "../../components/user/AllcoursesRight";
import "./css/Allcourses.css";
import { useLocation } from "react-router-dom";
import axios from "../../utils/axios";

const Allcourses = () => {
  const [Allcourse, SetAllcourse] = useState([]);
  const location = useLocation();
  const [ratingValue, setRatingValue] = useState("");
  const [levels, setLevels] = useState({
    beginner: false,
    intermediate: false,
    advanced: false,
  }); // Initialize levels as an object
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("category");

  const HandleLevel = (data) => {
    setLevels(data);
  };

  const HandleRating = (data) => {
    setRatingValue(data);
  };

  const convertLevelsToQueryString = (levelsObj) => {
    return Object.keys(levelsObj)
      .filter((level) => levelsObj[level])
      .join(",");
  };

  useEffect(() => {
    const FilterData = async () => {
      try {
        const levelsQueryString = convertLevelsToQueryString(levels);
        const response = await axios.get(
          `/courses/searched?levels=${levelsQueryString}&averageRating=${ratingValue}&category=${
            query ? query : ""
          }`
        );
        SetAllcourse(response.data.mainCourses);
        // Handle response data as needed
      } catch (error) {
        // Handle error as needed
      }
    };
    FilterData();
  }, [query, ratingValue, levels]); // Adding dependencies to run useEffect when filters change
  return (
    <>
      <div className="allcourses-main-div">
        <div className="left-section-allcourses d-none d-lg-block">
          <AllcoursesLeft Ratting={HandleRating} Level={HandleLevel} />
        </div>
        <div className="right-section-allcourses">
          <AllcoursesRight
            IsThereQuery={query}
            Ratting={HandleRating}
            Level={HandleLevel}
            AllData={Allcourse}
          />
        </div>
      </div>
    </>
  );
};

export default Allcourses;
