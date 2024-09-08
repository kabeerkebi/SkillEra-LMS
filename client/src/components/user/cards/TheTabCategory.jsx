import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardImage,
} from "mdb-react-ui-kit";
import Button from "@mui/material/Button";
import VisibilityIcon from "@mui/icons-material/Visibility";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "../css/Theallcoursetab.css";
import { useNavigate } from "react-router-dom";

const TheTabCategory = ({ AllData }) => {
  const navigate = useNavigate();

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1380,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          dots: true,
        },
      },
      {
        breakpoint: 1058,
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

  const truncateTitle = (title, maxLength = 30) => {
    if (title.length > maxLength) {
      return title.substring(0, maxLength) + "...";
    }
    return title;
  };

  const GofindCourse = (id) => {
    navigate(`/courses/${id}`);
  };

  return (
    <Slider className="coursebar-cards-main-div" {...settings}>
      {AllData.docs &&
        AllData.docs.map((item, index) => (
          <MDBCard
            key={index}
            className="custom-card"
          >
            <MDBCardImage
              src={item.thumbnail}
              alt={item.title}
              position="top"
              className="card-image"
            />
            <MDBCardBody className="card-body">
              <MDBCardText className="course-title">
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
                <MDBCardText className="course-price-category">
                  ₹{item.price}
                </MDBCardText>
              </div>
            </MDBCardBody>
          </MDBCard>
        ))}
    </Slider>
  );
};

export default TheTabCategory;
