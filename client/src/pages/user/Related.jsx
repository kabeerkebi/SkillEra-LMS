import React, { useEffect, useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardImage,
} from "mdb-react-ui-kit";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "./css/Related.css";
import axios from "../../utils/axios";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";

const Related = ({ Category, Refresh }) => {
  const [refresh, setrefresh] = useState("");
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1421,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          dots: true,
        },
      },
      {
        breakpoint: 1111,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          dots: true,
        },
      },
      {
        breakpoint: 715,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
        },
      },
    ],
  };

  const { courseId } = useParams();
  const [result, setResult] = useState([]);

  useEffect(() => {
    const fecthdata = async () => {
      try {
        const response = await axios.get(`courses/related/${courseId}`);
        setResult(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fecthdata();
  });
  const navigate = useNavigate();
  const truncateTitle = (title, maxLength = 30) => {
    if (title.length > maxLength) {
      return title.substring(0, maxLength) + "...";
    }
    return title;
  };
  const GofindCourse = (id) => {
    navigate(`/courses/${id}`);
    Refresh(id);
  };

  return (
    <div className="p-2">
      <h2 className="mt-3 related-course">Related Course</h2>
      <div className="p-4">
        <Slider {...settings}>
          {result.map((item, index) => (
            <MDBCard
              onClick={() => GofindCourse(item._id)}
              key={index}
              className="custom-card"
            >
              <MDBCardImage
                src={item.thumbnail}
                alt={item.title}
                position="top"
              />
              <MDBCardBody
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "17px",
                }}
              >
                <MDBCardText className="course-title">
                  {" "}
                  {truncateTitle(item.title)}
                </MDBCardText>
                <div className="card-body-category">
                  <MDBCardText className="course-instructors">
                    <Button
                      onClick={() => GofindCourse(item._id)}
                      variant="outlined"
                      color="secondary"
                      startIcon={<VisibilityIcon />}
                    >
                      View
                    </Button>
                  </MDBCardText>
                  {/* <MDBCardText className="course-rating">
                 <span>{item.averageRating}</span> ⭐ ({item.ratings.length})
               </MDBCardText> */}
                  <MDBCardText className="course-price-category">
                    ₹{item.price}
                  </MDBCardText>
                </div>
              </MDBCardBody>
            </MDBCard>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Related;
