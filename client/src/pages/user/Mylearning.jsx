import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import "./css/Mylearning.css";
import axios from "../../utils/axios";
import { useNavigate } from "react-router-dom";
const Mylearning = () => {
  const navigate = useNavigate();
  const [Courses, setCourses] = useState([]);
  useEffect(() => {
    const fecthdata = async () => {
      const response = await axios.get("/users/getallenroll");
      setCourses(response.data);
    };
    fecthdata();
  }, []);

  useEffect(() => {
    const fecthdata = async () => {
      try {
        const response = await axios.get("/auth/check");
        if (!response.data.user) {
          navigate("/signup/login");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fecthdata();
  }, []);

  const GoCoursePage = (id) => {
    navigate(`/courses/${id}`);
  };
  const truncateTitle = (title, maxLength = 40) => {
    if (title.length > maxLength) {
      return title.substring(0, maxLength) + "...";
    }
    return title;
  };
  return (
    <div className="mylearning-main">
      <h1 className="my-learning container p-5">My Learning</h1>
      <div className="the-card-container">
        <div className="mylearning-cards row">
          {Courses.length > 0 ? (
            Courses.map((item, index) => (
              <div
                onClick={() => GoCoursePage(item._id)}
                key={index}
                className="col-xl-3 col-lg-4 col-md-6 mt-4"
              >
                <Card
                  className="learning-card"
                  sx={{ maxWidth: 400, minWidth: 240 }}
                >
                  <CardActionArea>
                    <div className=" learning-image-container">
                      <CardMedia
                        component="img"
                        height="140"
                        image={item.thumbnail}
                        alt="Course Image"
                        className="card-image"
                      />
                      <PlayCircleIcon fontSize="" className="play-icon" />
                    </div>
                    <CardContent>
                      <Typography
                        variant="h6"
                        color="textPrimary"
                        style={{ fontWeight: "700" }}
                      >
                        {truncateTitle(item.title)}
                      </Typography>
                      <Typography
                        variant="body2"
                        className="mt-2"
                        color="textSecondary"
                      >
                        {item.category}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </div>
            ))
          ) : (
            <Typography variant="h6" className="empty-carts">
              <div className="empty-cart mt-5">
                <h2>Your Learning Journey Awaits!</h2>
                <p>
                  It looks like you haven't enrolled in any courses yet. "The
                  journey of a thousand miles begins with a single step." Start
                  your journey today by enrolling in a course!
                </p>
              </div>
            </Typography>
          )}
        </div>
      </div>
    </div>
  );
};

export default Mylearning;
