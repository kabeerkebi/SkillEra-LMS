import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Link,
  IconButton,
} from "@mui/material";
import {
  Google as GoogleIcon,
  Facebook as FacebookIcon,
  Apple as AppleIcon,
} from "@mui/icons-material";
import "./css/login.css";
import { toast } from "react-toastify";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const { register } = useContext(AuthContext); // Corrected from registerd to register

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.warning("password is not matching", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      try {
        await register(name, email, password);
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="login-background">
      <Container component="main" maxWidth="sm">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 4,
            boxShadow: 3,
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            borderRadius: 2,
          }}
        >
          <Typography component="h1" variant="h4" sx={{ mb: 2 }}>
            Register your account
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{ backgroundColor: "white", borderRadius: 1 }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ backgroundColor: "white", borderRadius: 1 }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ backgroundColor: "white", borderRadius: 1 }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              autoComplete="current-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              sx={{ backgroundColor: "white", borderRadius: 1 }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: "#a435f0",
                ":hover": { backgroundColor: "#9224e7" },
              }}
            >
              Register
            </Button>
            <Link
              href="#"
              variant="body2"
              sx={{ display: "block", textAlign: "center", marginBottom: 2 }}
            >
              Forgot Password
            </Link>

            <Box
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "#f7f9fa",
                marginLeft: "15%",
                marginRight: "15%",
              }}
            >
              <Typography className="mt-2">Already have an account?</Typography>
              <Typography
                onClick={() => navigate("/signup/login")}
                className="mt-2 ms-2 text-decoration-underline"
                style={{
                  color: "#8072e6",
                  fontWeight: "900",
                  cursor: "pointer",
                }}
              >
                Log in
              </Typography>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <IconButton color="primary">
                <GoogleIcon fontSize="large" />
              </IconButton>
              <IconButton color="primary">
                <FacebookIcon fontSize="large" />
              </IconButton>
              <IconButton color="primary">
                <AppleIcon fontSize="large" />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default Register;
