import React from "react";
import "./css/AllcoursesCards.css";
import axios from "../../utils/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const AllcoursesCards = ({ FilteredData }) => {
  const navigate = useNavigate();
  const AddToCart = async (courseId) => {
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

  const GoCoursesView = (id) => {
    navigate(`/courses/${id}`);
  };
  return (
    <div className="AllcoursesCards-card-container">
      {FilteredData.length > 0 ? (
        FilteredData.map((course, index) => (
          <div
            className="AllcoursesCards-card-horizontal"
            key={course._id + index}
          >
            <div className="AllcoursesCards-card-image-container">
              <img
                onClick={() => GoCoursesView(course._id)}
                src={course.thumbnail}
                alt={course.title}
                className="AllcoursesCards-card-image"
              />
            </div>


            <div className="AllcoursesCards-card-content">
              <div onClick={() => GoCoursesView(course._id)}>
                <h3 className="AllcoursesCards-card-title">{course.title}</h3>
                <p className="AllcoursesCards-card-instructor">
                  {course.instructorName}
                </p>
                <div className="AllcoursesCards-card-rating">
                  <span className="AllcoursesCards-rating">
                    {course.averageRating}
                  </span>
                  <span className="AllcoursesCards-rating-stars">
                    {course.averageRating > 0 ? (
                      [...Array(Math.round(course.averageRating))].map(
                        (_, index) => <span key={index}>⭐️</span>
                      )
                    ) : (
                      <span>⭐️</span>
                    )}
                  </span>
                  <span>({course.ratings.length})</span>
                </div>
                <div className="AllcoursesCards-card-meta">
                  <span className="me-2">{course.duration} total hours</span>
                  <span>{course.level}</span>
                </div>
              </div>
              <div className="AllcoursesCards-card-footer">
                <div className="AllcoursesCards-card-price">
                  <span className="AllcoursesCards-current-price">
                    ₹{course.price}
                  </span>
                  <span className="AllcoursesCards-original-price">
                    ₹{course.price * 1.5}
                  </span>
                </div>
                <button
                  className="AllcoursesCards-add-to-cart"
                  onClick={() => AddToCart(course._id)}
                >
                  Add to Cart
                </button>
              </div>
            </div>

            
          </div>
        ))
      ) : (
        <div className="AllcoursesCards-no-results">
          Sorry, we couldn't find any results
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default AllcoursesCards;
