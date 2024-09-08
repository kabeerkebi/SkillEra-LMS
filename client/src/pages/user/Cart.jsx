import React, { useState, useEffect } from "react";
import "./css/Cart.css";
import CancelIcon from "@mui/icons-material/Cancel";
import axios from "../../utils/axios";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { purple } from "@mui/material/colors"; // To match the purple color
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const [allcourse, setallcourse] = useState([]);
  const [TotalPrice, setPrice] = useState(0);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state for Stripe
  const [coupon, setCoupon] = useState("ST19DEMO");

  useEffect(() => {
    const fecthdata = async () => {
      try {
        const response = await axios.get("/auth/check");
        if (!response.data.user) {
          navigate("/");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fecthdata();
  }, []);

  useEffect(() => {
    const fecthdata = async () => {
      try {
        const response = await axios.get(`/cart/viewcart`);
        setallcourse(response.data.cart.courses);
        let amount = 0;
        response.data.cart.courses.forEach((item) => {
          amount += parseFloat(item.price); // Convert price to float
        });
        setPrice(amount);
      } catch (error) {
        console.log(error);
      }
    };
    fecthdata();
  }, [allcourse]);

  const RemoveCart = async (courseId) => {
    try {
      const response = await axios.post("/cart/removecart", {
        courseId: courseId,
      });
      if (response.data.success) {
        toast.success("Item removed from cart", {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckout = () => {
    if (TotalPrice > 1) {
      setOpen(true);
    } else {
      toast.error("No Item Founded.", {
        position: "bottom-left",
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

  const handleClose = () => {
    setOpen(false);
  };

  const handleFakeBuy = async () => {
    navigate("/success");
  };

  const handleProceedPayment = async () => {
    setLoading(true); // Start loading

    // Show toast promise for pending, success, or error states
    toast.promise(
      new Promise(async (resolve, reject) => {
        try {
          const stripePromise = await loadStripe(
            "pk_test_51Pm7waC9kHergKy7QXmo0nSU18LhX4aCKiV7eGAo1ZWui0mPHsmEVRvn7A8BUHSHcVXbEiwn5oyeijnfmY79uHBN008dq2nKVb"
          );

          const body = {
            products: allcourse,
          };
          const headers = {
            "Content-Type": "application/json",
          };
          const response = await axios.post("/payment/check", body, {
            headers,
          });

          const session = response.data;
          const result = await stripePromise.redirectToCheckout({
            sessionId: session.id,
          });

          if (result.error) {
            console.error(result.error.message);
            reject(result.error.message);
          } else {
            resolve("Stripe checkout page reached successfully");
          }
        } catch (error) {
          console.error(error);
          reject(error.message);
        } finally {
          setLoading(false); // Stop loading after process is done
          setOpen(false);
        }
      }),
      {
        pending: "Processing payment...",
        success: "Payment successful!",
        error: "Payment failed",
      }
    );
  };

  return (
    <div className="cart-page-container min-vh-100">
      <div className="cart-page-row d-flex flex-column-reverse flex-md-row">
        <div
          className={`cart-page-col-xs-12 cart-page-col-sm-12 cart-page-col-md-12 cart-page-col-lg-8 cart-page-custom-col-left ${
            allcourse.length <= 2 ? "my-lg-5  my-xs-1  pt-lg-3"  : ""
          }`}
        >
          {allcourse.length > 0 ? (
            allcourse.map((item, index) => (
              <div className="cart-page-cart-container my-3" key={index}>
                <div className="cart-page-course-item">
                  <img
                    src={item.thumbnail}
                    alt="Course Thumbnail"
                    className="cart-page-course-thumbnail"
                  />
                  <div className="cart-page-course-details">
                    <h3 className="cart-page-course-title">{item.title}</h3>
                    <p className="cart-page-course-instructor">
                      By {item.instructorName}
                    </p>
                    <div className="cart-page-course-rating">
                      <span>4.6</span>
                      <span className="cart-page-stars">★★★★★</span>
                      <span>(507,168 ratings)</span>
                    </div>
                  </div>
                  <div className="cart-page-course-price mt-lg-3">
                    <span className="cart-page-current-price">
                      ₹{item.price}
                    </span>
                    <span className="cart-page-original-price">
                      ₹{item.price * 1.5}
                    </span>
                  </div>
                  <div
                    className="cart-page-remove-icon-container"
                    onClick={() => RemoveCart(item._id)}
                  >
                    <CancelIcon className="cart-page-remove-icon" />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="cart-page-empty-cart mt-5">
              <h2>Your cart is empty</h2>
              <p>Add some courses to your cart to get started!</p>
            </div>
          )}
        </div>

        <div className="cart-page-col-xs-12 cart-page-col-sm-12 cart-page-col-md-12 cart-page-col-lg-4 cart-page-custom-col-right mt-5">
          <div
            style={{ background: "#ffff" }}
            className="cart-page-checkout-container mt-lg-3"
          >
            <div className="cart-page-total">₹ {TotalPrice}</div>
            <div className="cart-page-original-price">₹{TotalPrice * 1.5}</div>
            <div className="cart-page-discount">82% off</div>
            <Button
              onClick={handleCheckout}
              style={{
                backgroundColor: purple[500],
                color: "white",
                width: "100%",
              }}
            >
              Checkout
            </Button>
            <div className="cart-page-promotions">
              <div>{coupon} is applied</div>
              <div className="cart-page-coupon-section">
                <input
                  type="text"
                  placeholder="Enter Coupon"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  className="cart-page-coupon-input"
                />
                <Button
                  style={{ backgroundColor: purple[500], color: "white" }}
                >
                  Apply
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MUI Dialog for Checkout */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle
          style={{
            textAlign: "center",
            fontSize: "27px",
            fontWeight: "bold",
            fontFamily: "system-ui",
          }}
        >
          Checkout Options
        </DialogTitle>
        <DialogContent>
          <DialogActions
            style={{
              flexDirection: "column",
              alignItems: "center",
              gap: "1rem",
              paddingBottom: "1rem",
            }}
          >
            <Button
              onClick={handleFakeBuy}
              style={{
                backgroundColor: purple[500],
                color: "white",
                width: "80%",
              }}
              variant="contained"
            >
              Fake Buy
            </Button>
            <Button
              onClick={handleProceedPayment}
              style={{
                backgroundColor: "#e91e63",
                color: "white",
                width: "80%",
              }}
              variant="contained"
            >
              Proceed Payment
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>

      <ToastContainer />
    </div>
  );
};

export default Cart;
