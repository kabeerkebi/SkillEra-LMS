import React, { useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import {
  Button,
  TextField,
  IconButton,
  Typography,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import CheckIcon from "@mui/icons-material/Check";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axios";
import Alert from "@mui/material/Alert";

const CoursesContent = () => {
  const dispatch = useDispatch();
  const courseData = useSelector((state) => state.postingCourse);
  const navigate = useNavigate();

  const [multerImages, setMulterImages] = useState([]);
  const [descriptions, setDescriptions] = useState([]);
  const [price, setPrice] = useState("");
  const [publishDate, setPublishDate] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVideoChange = (e) => {
    const files = Array.from(e.target.files);
    const videoPreviews = files.map((file) => ({
      url: URL.createObjectURL(file),
      file,
      name: file.name,
    }));
    setMulterImages([...multerImages, ...videoPreviews]);
  };

  const handleDescriptionChange = (index, value) => {
    const newDescriptions = [...descriptions];
    newDescriptions[index] = value;
    setDescriptions(newDescriptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    if (courseData.profilePicture)
      formData.append("profilePicture", courseData.profilePicture);
    if (courseData.thumbnail)
      formData.append("thumbnail", courseData.thumbnail);

    multerImages.forEach((lesson, index) => {
      formData.append("videos", lesson.file);
      formData.append("descriptions", descriptions[index] || "");
    });

    formData.append("title", courseData.title);
    formData.append("description", courseData.description);
    formData.append("category", courseData.category);
    formData.append("level", courseData.level);
    formData.append("language", courseData.language);
    formData.append("duration", courseData.duration);
    formData.append("price", price);
    formData.append("publishDate", publishDate);
    formData.append("bio", courseData.bio);
    formData.append("instructorName", courseData.instructorName);

    try {
      const response = await axios.post("/courses/postcourse", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        navigate("/admin/dashboard");
        <Alert severity="success"> upload successful</Alert>

        // Optionally, redirect or update UI here
      } else {
        console.error(
          "Upload failed:",
          response.data?.message || "Unknown error"
        );
      }
    } catch (error) {
      console.error("Error uploading files:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="containers p-4">
      <Backdrop open={loading} style={{ zIndex: 1300, color: "#fff" }}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <div className="back-button-container">
        <Button
          color="secondary"
          variant="contained"
          onClick={() => navigate("/admin/postingcourse/instructorinformation")}
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
        <span className="courses-post-checkmark rounded-circles">
          <CheckIcon />
        </span>
        <hr className="courses-post-hr" />
        <div style={{ display: "flex" }}>
          <span className="rounded-circles-post-courses bg-dark text-white p-1">
            3
          </span>
          <span className="courses-details d-none d-md-block">
            Course Content
          </span>
        </div>
      </div>

      <div className="bg-white p-4 shadow-sm rounded">
        <Form onSubmit={handleSubmit}>
          <Typography variant="h5" className="mb-3">
            Course Content
          </Typography>

          <Form.Group controlId="price" className="mb-4">
            <Form.Label>Price</Form.Label>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Enter the price"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="publishDate" className="mb-4">
            <Form.Label>Publish Date</Form.Label>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Enter the date"
              name="publishDate"
              value={publishDate}
              onChange={(e) => setPublishDate(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="lesson" className="mb-4">
            <Form.Label>Add Lessons (Videos)</Form.Label>
            <div>
              <input
                accept="video/*"
                style={{ display: "none" }}
                id="icon-button-file-video"
                type="file"
                multiple
                onChange={handleVideoChange}
              />
              <label htmlFor="icon-button-file-video">
                <IconButton
                  color="primary"
                  aria-label="upload video"
                  component="span"
                >
                  <UploadIcon />
                </IconButton>
              </label>
            </div>
            {multerImages.length > 0 && (
              <div className="mt-3">
                {multerImages.map((video, index) => (
                  <div key={index} className="mb-3">
                    <Row>
                      <Col md={6}>
                        <Typography>{video.name}</Typography>
                        <video width="100%" height="240" controls>
                          <source src={video.url} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      </Col>
                      <Col md={6}>
                        <TextField
                          fullWidth
                          variant="outlined"
                          placeholder="Enter video description"
                          value={descriptions[index] || ""}
                          onChange={(e) =>
                            handleDescriptionChange(index, e.target.value)
                          }
                          className="mt-2"
                        />
                      </Col>
                    </Row>
                  </div>
                ))}
              </div>
            )}
          </Form.Group>

          <div className="text-right">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
            >
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default CoursesContent;
