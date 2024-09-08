import { createContext, useState, useEffect } from "react";
import axios from "../utils/axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("/auth/check");
        setUser(response.data.user);
      } catch (err) {
        setUser(null);
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    const response = await axios.post("/auth/login", { email, password });
    if (response.data.userId) {
      navigate(`/verifyotp?userId=${response.data.userId}`);
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
    } else if (response.data.success) {
      toast.success("login successfully", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setUser(response.data.user);
      window.history.back();
    } else if (response.data.message === "User not found") {
      toast.error("User not found", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else if (response.data.message === "User not found") {
      toast.error("User not found", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.error("password is wrong", {
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

  const logout = async () => {
    await axios.post("/auth/logout");
    setUser(null);
  };

  const register = async (name, email, password) => {
    const response = await axios.post("/auth/register", {
      name,
      email,
      password,
    });
    if (response.data.userId) {
      navigate(`/verifyotp?userId=${response.data.userId}`);
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
    } else if (response.data.message === "User already exists") {
      toast.warn("email already taken ", {
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

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
