import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ".././css/CourseInfo.css";
import LockIcon from "@mui/icons-material/Lock";
import InfoIcon from "@mui/icons-material/Info";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography"; // Corrected import for Typography
import Button from "@mui/material/Button";
import axios from "../../../utils/axios";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import LanguageIcon from "@mui/icons-material/Language";
import { toast } from "react-toastify";
const CourseInfo = ({ TheResult, Theid }) => {
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [rating, setRating] = useState(0);
  const [open, setOpen] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const { courseId } = useParams();
  const [randommNumber, setRandomnumber] = useState([]);

  useEffect(() => {
    CheckEnrollCourse();
    fetchUserRating();
    FindAverageRate();
    const strangenumber = Ganaraterandomnumber(7, 28); // Generate 7 unique random numbers
    setRandomnumber(strangenumber);

    if (isEnrolled && showDialog) {
      const randomInterval =
        Math.floor(Math.random() * (200000 - 60000 + 1)) + 300; // Random interval between 30s and 60s
      const timer = setTimeout(() => {
        setOpen(true);
      }, randomInterval);
      return () => clearTimeout(timer);
    }
  }, [isEnrolled, showDialog, courseId]); // Add TheResult.lesson to the dependency array

  const fetchUserRating = async () => {
    try {
      const response = await axios.get(`users/showratingpopup/${courseId}`);
      if (response.data.shouldShowPopup) {
        setShowDialog(true);
      }
    } catch (error) {
      console.error("Error fetching user rating:", error);
    }
  };

  const handleRating = async (newRating) => {
    setRating(newRating);
    setOpen(false); // Close the modal after rating

    try {
      const response = await axios.post(`/courses/rate/${courseId}`, {
        rating: newRating,
      });

      toast.success("Rating submitted successfully!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (error) {
      console.error("Error submitting rating:", error);
      toast.error("Error submitting rating", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const OnUserResponse = async (response) => {
    try {
      await axios.post(`users/setratingpreference/${courseId}`, {
        preference: response,
      });
      setShowDialog(false);
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const PassLesson = (id) => {
    Theid(id);
  };

  const CheckEnrollCourse = async () => {
    try {
      const response = await axios.get(`/users/ifenrollcourses/${courseId}`);
      if (response.data.success) {
        setIsEnrolled(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const Ganaraterandomnumber = (min, max) => {
    const numbers = new Set();
    const count = 7; // Always generate 7 unique numbers

    while (numbers.size < count) {
      const uniqueNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      numbers.add(uniqueNumber);
    }

    return Array.from(numbers);
  };
  const FindAverageRate = async () => {
    try {
      const response = await axios.get(`/courses/${courseId}/rating`);
      setRating(response.data.userAverageRating);
      console.log(response.data.userAverageRating);
      <Stack sx={{ width: "100%" }} spacing={2}>
        <Alert severity="success">This is a success Alert.</Alert>
      </Stack>;
    } catch (error) {
      console.log(error);
    }
  };
  const AddToCart = async () => {
    try {
      const response = await axios.post(`/cart/addtocart/${courseId}`);
      if (response.data.message === "Unauthorized") {
        toast.error("Please log in to continue.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setTimeout(() => {
          navigate("/signup/login");
        }, 1000); // Adjust the delay time as needed
      } else if (response.data.enrolled) {
        toast.warning("This course is you enrolled.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else if (response.data.have) {
        toast.warning("This course is already in your cart.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } else {
        toast.success("Course added to cart successfully!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="course-info">
      <div className="course-info-inner">
        <div className="lessons-list">
          {TheResult.lessons &&
            TheResult.lessons.map((lesson, index) => {
              if (!isEnrolled) {
                return (
                  <div
                    key={index}
                    className={` ${
                      index === 0
                        ? " first-lesson-div  lesson locked-lesson"
                        : "lesson locked-lesson"
                    }`}
                  >
                    {index === 0 ? (
                      <InfoIcon className="info-icon m-1" />
                    ) : (
                      <LockIcon className="gold-icon m-1" />
                    )}
                    <span className={` ${index === 0 ? " first-lesson" : ""}`}>
                      {lesson.description}
                    </span>
                  </div>
                );
              }
              return (
                <div
                  onClick={() => PassLesson(lesson._id)}
                  key={index}
                  className={`lesson ${
                    lesson.preview ? "preview-lesson" : "preview-lesson"
                  }`}
                >
                  {lesson.preview}
                  <span className="description-span">{lesson.description}</span>
                  <span className="m-15">{randommNumber[index]} m</span>
                </div>
              );
            })}
        </div>
        {isEnrolled && (
          <div className="buttom-courses-stat ">
            <div>
              <LanguageIcon /> {TheResult.language}
            </div>

            <div className="stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() => handleRating(star)}
                  className={`star-icon ${rating >= star ? "filled" : ""}`}
                >
                  {rating >= star ? <StarIcon /> : <StarBorderIcon />}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
      {!isEnrolled && (
        <button className="add-to-cart-button" onClick={AddToCart}>
          Add to Cart
        </button>
      )}

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>
          {/* Use the DialogTitle directly for the title without extra Typography */}
          <Typography
            align="center"
            style={{ fontWeight: "bold", fontSize: "25px" }}
          >
            Rate this Course
          </Typography>
        </DialogTitle>
        <DialogContent>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "10px 0",
            }}
          >
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => handleRating(star)}
                className={`star-icon ${rating >= star ? "filled" : ""}`}
                style={{
                  cursor: "pointer",
                  fontSize: "30px",
                  color: rating >= star ? "#FFD700" : "#C0C0C0",
                  margin: "0 5px",
                }}
              >
                {rating >= star ? (
                  <StarIcon fontSize="inherit" />
                ) : (
                  <StarBorderIcon fontSize="inherit" />
                )}
              </span>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <Button
              onClick={() => OnUserResponse("remindLater")}
              variant="outlined"
              color="primary"
              style={{ margin: "0 10px" }}
            >
              Ask me later
            </Button>
            <Button
              onClick={() => OnUserResponse("dontAskAgain")}
              variant="contained"
              color="primary"
              style={{ margin: "0 10px" }}
            >
              No, thanks
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CourseInfo;
