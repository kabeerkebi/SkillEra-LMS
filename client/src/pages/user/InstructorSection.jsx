import React from "react";
import "./css/InstructorSection.css";
import { AccessTime, School, FiberManualRecord } from "@mui/icons-material"; // MUI icons

const InstructorSection = ({ Instructure }) => {
  return (
    <div className="instructor-section">
      <div className="instructor-details">
        <div className="instructor-info">
          <h2 className="instructor-name">{Instructure.instructorName}</h2>
          <p className="instructor-title">
            Web developer and coding instructor
          </p>
          <div className="instructor-stats">
            <div className="instructor-image">
              <img src={Instructure.profilePicture} alt="Instructor Image" />
            </div>
            <div className="instructor-metrics">
              <div className="instructor-lessons">
                <School style={{ marginTop: "-15px" }} />
                <p>Lesson 10</p>
              </div>
              <div className="instructor-hours">
                <AccessTime style={{ marginTop: "-15px" }} />
                <p>Hours 10</p>
              </div>
            </div>
          </div>
          <div className="instructor-description">
            <p>{Instructure.bio}</p>
          </div>
        </div>
      </div>
      <div className="requirements-section">
        <h3 className="requirements-title">Requirements</h3>
        <ul className="requirements-list">
          <li>
            <FiberManualRecord className="requirement-icon" />
            NO React experience necessary! I take you from beginner to expert!
          </li>
          <li>
            <FiberManualRecord className="requirement-icon" />
            Basic understanding of JavaScript is required (this course contains
            a quick JavaScript review section)
          </li>
          <li>
            <FiberManualRecord className="requirement-icon" />
            Any computer and OS will work — Windows, macOS or Linux
          </li>
        </ul>
      </div>
    </div>
  );
};

export default InstructorSection;
