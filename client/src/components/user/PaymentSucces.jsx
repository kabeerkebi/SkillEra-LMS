import React, { useEffect, useState } from "react";
import { Typography, Button, Box } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import axios from "../../utils/axios";
import { ToastContainer, toast } from "react-toastify";

const PaymentSuccess = () => {
  const [allCart, setAllCart] = useState([]);

  // Fetch cart items on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/cart/viewcart");
        const allItems = response.data.cart.courses;
        setAllCart(allItems);
      } catch (error) {
        console.error("Error fetching cart items:", error);
        toast.error("Failed to fetch cart items.", {
          position: "bottom-left",
          autoClose: 5000,
          theme: "light",
        });
      }
    };

    fetchData();
  }, []);

  // Enroll courses and then clear the cart
  useEffect(() => {
    if (allCart.length > 0) {
      const enrollAndClearCart = async () => {
        try {
          // Enroll the courses first
          const courseIds = allCart.map((course) => course._id);
          const enrollResponse = await axios.post("/users/enroll", {
            courseIds,
          });

          if (enrollResponse.data.success) {
            toast.success("Courses enrolled successfully", {
              position: "bottom-left",
              autoClose: 5000,
              theme: "light",
            });

            // Clear the cart after successful enrollment
            await axios.delete("/cart/clearcart");
          }
        } catch (error) {
          console.log("NET WORK ISSUE" ,error);
        }
      };

      enrollAndClearCart();
    }
  }, [allCart]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "90vh",
          backgroundColor: "#f5f5f5",
          textAlign: "center",
          px: 2,
        }}
      >
        <CheckCircleOutlineIcon
          sx={{ fontSize: 80, color: "#4caf50", mb: 3 }}
        />
        <Typography variant="h4" component="h1" gutterBottom>
          Payment Successful!
        </Typography>
        <Typography variant="body1" color="textSecondary" sx={{ mb: 4 }}>
          Thank you for your purchase. Your order is being processed.
        </Typography>
        <Button
          variant="contained"
          color="success"
          size="large"
          href="/"
          sx={{
            ":hover": {
              backgroundColor: "#ffffff",
              color: "#4caf50",
            },
          }}
        >
          Return to Home
        </Button>
      </Box>
      <ToastContainer />
    </>
  );
};

export default PaymentSuccess;
