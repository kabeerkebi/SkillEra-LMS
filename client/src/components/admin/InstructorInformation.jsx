import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { TextField, IconButton, Button } from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import "./css/courseinformation.css";
import CheckIcon from "@mui/icons-material/Check";
import { useDispatch, useSelector } from "react-redux";
import { setCourseData } from "../../redux/postingCourseSlice";
import { useNavigate } from "react-router-dom";

const InstructorInformation = () => {
  const dispatch = useDispatch();
  const courseData = useSelector((state) => state.postingCourse);
  const navigate = useNavigate();

  const [instructorInfo, setInstructorInfo] = useState({
    instructorName: courseData.instructorName,
    bio: courseData.bio,
    profilePicture: courseData.profilePicture,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInstructorInfo({ ...instructorInfo, [name]: value });
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setInstructorInfo({
        ...instructorInfo,
        profilePicture: file,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setCourseData(instructorInfo));
    navigate("/admin/postingcourse/coursescontent");
  };

  return (
    <div className="containers p-4">
      <div className="back-button-container">
        <Button
          color="secondary"
          variant="contained"
          onClick={() => navigate("/admin/postingcourse/coursesinformation")}
        >
          Back
        </Button>
      </div>

      <div
        className="post-courses-container mt-5"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <span className="courses-post-checkmark rounded-circles">
          <CheckIcon />
        </span>
        <hr className="courses-post-hr" />
        <div style={{ display: "flex" }}>
          <span className="rounded-circles-post-courses bg-dark text-white p-1">
            2
          </span>
          <span className="courses-details d-none d-md-block">
            Instructor Information
          </span>
        </div>
        <hr className="courses-post-hr" />
        <span className="courses-post-number">3</span>
      </div>

      <div className="bg-white p-4 shadow-sm rounded">
        <Form onSubmit={handleSubmit}>
          <h5 className="text-lg font-semibold mb-3">Instructor Information</h5>
          <Form.Group controlId="instructorName" className="mb-4">
            <Form.Label>Instructor Name</Form.Label>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Enter instructor's name"
              name="instructorName"
              value={instructorInfo.instructorName}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="instructorBio" className="mb-4">
            <Form.Label>Bio</Form.Label>
            <TextField
              fullWidth
              variant="outlined"
              multiline
              rows={4}
              placeholder="Enter instructor's bio"
              name="bio"
              value={instructorInfo.bio}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="instructorProfile" className="mb-4">
            <Form.Label>Profile Picture</Form.Label>
            <div>
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="icon-button-file-profile"
                type="file"
                onChange={handleProfileImageChange}
              />
              <label htmlFor="icon-button-file-profile">
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                >
                  <PhotoCamera />
                </IconButton>
              </label>
            </div>
            {instructorInfo.profilePicture && (
              <div style={{ marginTop: "10px" }}>
                <img
                  src={URL.createObjectURL(instructorInfo.profilePicture)}
                  alt="Profile"
                  style={{ maxWidth: "100%", height: "auto" }}
                />
              </div>
            )}
          </Form.Group>

          <Button
            type="submit"
            className="mt-4"
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default InstructorInformation;
