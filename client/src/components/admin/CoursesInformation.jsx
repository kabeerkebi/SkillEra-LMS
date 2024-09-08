import React, { useState } from "react";
import "./css/courseinformation.css";
import { Form } from "react-bootstrap";
import {
  TextField,
  MenuItem,
  InputLabel,
  Select,
  FormControl,
  IconButton,
  Button,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { useDispatch, useSelector } from "react-redux";
import { setCourseData } from "../../redux/postingCourseSlice";
import { useNavigate } from "react-router-dom";

const CoursesInformation = () => {
  const dispatch = useDispatch();
  const courseData = useSelector((state) => state.postingCourse);
  const navigate = useNavigate();

  const [courseInfo, setCourseInfo] = useState({
    title: courseData.title,
    description: courseData.description,
    category: courseData.category,
    level: courseData.level,
    language: courseData.language,
    duration: courseData.duration,
    thumbnail: courseData.thumbnail,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseInfo({ ...courseInfo, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCourseInfo({ ...courseInfo, thumbnail: file });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dispatch action to update Redux state
    dispatch(setCourseData(courseInfo));
    navigate("/admin/postingcourse/instructorinformation");
  };

  return (
    <div className="container p-4">
      <div
        className="post-courses-container"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div style={{ display: "flex" }}>
          <span className="rounded-circles-post-courses bg-dark text-white p-1">
            1
          </span>
          <span className="courses-details d-none d-md-block">
            Course Information
          </span>
        </div>
        <hr className="courses-post-hr" />
        <span className="courses-post-number">2</span>
        <hr className="courses-post-hr" />
        <span className="courses-post-number">3</span>
      </div>

      <div className="bg-white p-4 shadow-sm rounded">
        <Form onSubmit={handleSubmit}>
          <h5 className="text-lg font-semibold mb-3">Course Information</h5>

          <Form.Group controlId="courseTitle" className="mb-4">
            <Form.Label>Course Title</Form.Label>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Enter course title"
              name="title"
              value={courseInfo.title}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="courseDescription" className="mb-4">
            <Form.Label>Course Description</Form.Label>
            <TextField
              fullWidth
              variant="outlined"
              multiline
              rows={4}
              placeholder="Enter course description"
              name="description"
              value={courseInfo.description}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="courseCategory" className="mb-4">
            <Form.Label>Category</Form.Label>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Select Category</InputLabel>
              <Select
                name="category"
                value={courseInfo.category}
                onChange={handleChange}
                label="Select Category"
              >
                <MenuItem value="Web Development">Web development</MenuItem>
                <MenuItem value="Leadership">leadership</MenuItem>
                <MenuItem value="Data Science">datascience</MenuItem>
                <MenuItem value="Desing">desing</MenuItem>
                <MenuItem value="marketing">marketing</MenuItem>
                <MenuItem value="Entrepreneurship">Entrepreneurship</MenuItem>
              </Select>
            </FormControl>
          </Form.Group>

          <Form.Group controlId="courseLevel" className="mb-4">
            <Form.Label>Level</Form.Label>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Select Level</InputLabel>
              <Select
                name="level"
                value={courseInfo.level}
                onChange={handleChange}
                label="Select Level"
              >
                <MenuItem value="beginner">Beginner</MenuItem>
                <MenuItem value="intermediate">Intermediate</MenuItem>
                <MenuItem value="advanced">Advanced</MenuItem>
              </Select>
            </FormControl>
          </Form.Group>

          <Form.Group controlId="courseLanguage" className="mb-4">
            <Form.Label>Language</Form.Label>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Select Language</InputLabel>
              <Select
                name="language"
                value={courseInfo.language}
                onChange={handleChange}
                label="Select Language"
              >
                <MenuItem value="english">English</MenuItem>
                <MenuItem value="spanish">Spanish</MenuItem>
                <MenuItem value="french">French</MenuItem>
                <MenuItem value="german">German</MenuItem>
              </Select>
            </FormControl>
          </Form.Group>

          <Form.Group controlId="courseDuration" className="mb-4">
            <Form.Label>Duration (in hours)</Form.Label>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Enter course duration"
              name="duration"
              value={courseInfo.duration}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="courseThumbnail" className="mb-4">
            <Form.Label>Thumbnail</Form.Label>
            <div>
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="icon-button-file"
                type="file"
                onChange={handleImageChange}
              />
              <label htmlFor="icon-button-file">
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                >
                  <PhotoCamera />
                </IconButton>
              </label>
            </div>
            {courseInfo.thumbnail && (
              <div style={{ marginTop: "10px" }}>
                <img
                  src={URL.createObjectURL(courseInfo.thumbnail)}
                  alt="Course Thumbnail"
                  style={{ maxWidth: "50%", height: "auto" }}
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

export default CoursesInformation;
