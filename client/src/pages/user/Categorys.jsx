import React from "react";
import { LuHome } from "react-icons/lu";
import { IoIosArrowForward } from "react-icons/io";
import "./css/Category.css";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { PiGraduationCapDuotone } from "react-icons/pi";
import { GoPeople } from "react-icons/go";
import { CiSettings } from "react-icons/ci";
import { BsBagCheck } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import SchoolIcon from "@mui/icons-material/School"; // MUI icon

const Categorys = () => {
  const thecategory = [
    {
      name: "IT",
      icon: <LuHome className="icon" />,
    },
    {
      name: "Design",
      icon: <SchoolIcon className="icon" />,
    },
    {
      name: "Business",
      icon: <GoPeople className="icon" />,
    },
    {
      name: "Leadership",
      icon: <PiGraduationCapDuotone className="icon" />,
    },
    {
      name: "Marketing",
      icon: <BsBagCheck className="icon" />,
    },
    {
      name: "Music",
      icon: <SchoolIcon className="icon" />,
    },
    {
      name: "Fitness",
      icon: <CiSettings className="icon" />,
    },
    {
      name: "Finance",
      icon: <SchoolIcon className="icon" />,
    },
  ];

  const navigate = useNavigate();

  const GoToCourse = () => {
    navigate("/allcourses");
  };

  return (
    <div className=" ">
      <div className="container-fluid inter2">
        <div className="container p-5">
          <div className="Popular-Categories mt-5">
            <h2 className="paragraph text-3xl">Popular Categories</h2>
            <p className="mb-5">
              Dive into our Knowledge Management System (KMS) to enhance your
              knowledge exploration. From the ever-evolving landscape <br /> of
              Technology to the insightful domain of Business Intelligence,
            </p>
          </div>

          {/* the main card div */}
          <div className="card-div row justify-content-center">
            {/* First row with cards */}
            {thecategory.map((item, index) => (
              <div
                onClick={() => GoToCourse()}
                key={index}
                className="card col-md-2 p-2 m-2"
              >
                <a  className="atag">
                  <div className={`category-${"Remote"} card-body`}>
                    {item.icon}
                    <h6 className="card-title">{item.name}</h6>
                    <IoIosArrowForward className="icon" />
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
        <div className="Popular-Categories text-center mt-">
          <h4 className="paragraph text-1xl mb-3">View All Courses</h4>
          <div className="button-container">
            <button className="cta-button" onClick={()=>navigate("/allcourses")}>
              <ArrowForwardIcon className="button-icon"  />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categorys;
