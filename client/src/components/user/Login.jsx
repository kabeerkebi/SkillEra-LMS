import React, { useState, useContext } from "react";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Link,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  Google as GoogleIcon,
  Facebook as FacebookIcon,
  Apple as AppleIcon,
} from "@mui/icons-material";
import "./css/login.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { ToastContainer } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Container component="main" maxWidth="sm" sx={{ paddingTop: 8 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 4,
            boxShadow: 3,
            backgroundColor: "white",
            borderRadius: 2,
          }}
        >
          <Typography component="h1" variant="h4" sx={{ mb: 2 }}>
            Log in to your account
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
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              Log in
            </Button>
            <Link
              href="/verifyotp"
              variant="body2"
              sx={{ display: "block", textAlign: "center", marginBottom: 2 }}
            >
              Forgot Password?
            </Link>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#f7f9fa",
                padding: 2,
                borderRadius: 1,
                mt: 2,
              }}
            >
              <Typography>Don't have an account?</Typography>
              <Typography
                onClick={() => navigate("/signup/register")}
                sx={{
                  color: "#8072e6",
                  fontWeight: "bold",
                  cursor: "pointer",
                  ml: 1,
                  textDecoration: "underline",
                }}
              >
                Sign up
              </Typography>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
              <Tooltip title="Log in with Google">
                <IconButton color="primary">
                  <GoogleIcon fontSize="large" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Log in with Facebook">
                <IconButton color="primary">
                  <FacebookIcon fontSize="large" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Log in with Apple">
                <IconButton color="primary">
                  <AppleIcon fontSize="large" />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </Box>
      </Container>
      <ToastContainer />
    </div>
  );
};

export default Login;
