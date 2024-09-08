import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Typography, Button, TextField } from "@mui/material";
import OTPInput from "./cards/OtpInput"; // Adjust the path if needed
import axios from "../../utils/axios";
import { toast } from "react-toastify";

const OtpVerify = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get("userId");
  const [email, setEmail] = useState("");
  const [isEmailEntered, setIsEmailEntered] = useState(Boolean(userId));

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    console.log(email);

    if (email && email.includes("@gmail.com")) {
      const response = await axios.post("/auth/forgotpassword", {
        email: email,
      });
      if (response.data.success) {
        toast.success("Otp send to email", {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setIsEmailEntered(true);
      }
      if (response.data.message === "User not found") {
        toast.error("no email found", {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } else {
      toast.error("  please check the email ", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "70vh",
        gap: 2,
        padding: 2,
      }}
    >
      {!isEmailEntered ? (
        <>
          <Typography
            variant="h4"
            sx={{
              color: "#e91e63",
              mb: 2,
              fontWeight: "700",
              fontFamily: "Fira Sans, serif",
              fontStyle: "small-caps",
            }}
          >
            Enter your email
          </Typography>
          <TextField
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              width: { xs: "100%", sm: "300px" }, // Responsive width
              mb: 2,
            }}
            type="email"
            required
          />
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#e91e63",
              "&:hover": {
                backgroundColor: "#c2185b",
              },
              width: { xs: "100%", sm: "300px" }, // Responsive width
            }}
            onClick={handleEmailSubmit}
          >
            Submit
          </Button>
        </>
      ) : (
        <>
          <OTPInput userId={userId} email={email} />
        </>
      )}
    </Box>
  );
};

export default OtpVerify;
