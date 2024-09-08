import React, { useEffect, useState } from "react";
import Overviewleft from "../../components/user/Overviewleft";
import Overviewright from "../../components/user/Overviewright";
import "./css/Overview.css";
import InstructorSection from "./InstructorSection";
import axios from "../../utils/axios";
import Related from "./Related";
import { useParams } from "react-router-dom";

const Overview = () => {
  const { courseId } = useParams();
  const [shareData, setShareData] = useState([]);
  const [description, serdescription] = useState("")
  const [refresh, setrefresh] = useState(false);
  useEffect(() => {
    fecthdata();
  }, [refresh]);
  const [saveData, setSaveData] = useState([]);
  const CheckData = (value) => {
    setSaveData(value);
  };
  const fecthdata = async () => {
    try {
      const response = await axios.get(`/courses/${courseId}`);
      setShareData(response.data);
      serdescription(response.data.description)
      window.scroll(0, 0);
    } catch (error) {
      console.log(error);
    }
  };
  const makeRefresh = () => {
    setrefresh(refresh ? false : true);
  };
  
  return (
    <>
      <div className=" Course-Main  " style={{ minHeight: "100vh" }}>
        <div
          className="flex-grow-1 left-div-courses"
          style={{ marginLeft: "4%" }}
        >
          <Overviewleft Course={saveData} LeftPageRefresh={makeRefresh} Description={description} />
        </div>
        <div className="flex-grow-1 right-div-courses">
          <Overviewright courseData={CheckData} pageRefresh={makeRefresh} />
        </div>
      </div>
      <div className=" instructure-tab  ">
        <InstructorSection Instructure={shareData} />
      </div>
      <div>
        <Related Category={shareData.category} Refresh={makeRefresh} />
      </div>
    </>
  );
};

export default Overview;
