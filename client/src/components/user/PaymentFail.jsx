import React, { useEffect } from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { ToastContainer, toast } from "react-toastify";

const PaymentFail = () => {
  useEffect(() => {
    toast.error(" Payment Failed", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }, []);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          backgroundColor: "#f5f5f5",
          textAlign: "center",
          px: 2,
        }}
      >
        <ErrorOutlineIcon sx={{ fontSize: 80, color: "#f44336", mb: 3 }} />
        <Typography variant="h4" component="h1" gutterBottom>
          Payment Failed
        </Typography>
        <Typography variant="body1" color="textSecondary" sx={{ mb: 4 }}>
          Unfortunately, there was an issue processing your payment. Please try
          again later or contact support if the problem persists.
        </Typography>
        <Button variant="contained" color="error" size="large" href="/">
          Return to Home
        </Button>
      </Box>
      <ToastContainer />
    </>
  );
};

export default PaymentFail;
