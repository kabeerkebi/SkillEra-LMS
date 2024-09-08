import React, {
  useContext,
  useEffect,
  useState,
  useRef,
  useCallback,
} from "react";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import { Grid } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import MoreIcon from "@mui/icons-material/MoreVert";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./css/Navbar.css";
import axios from "../../utils/axios";
import SkillEra from "../../assets/skilleralogo.png";
import { toast } from "react-toastify";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  border: "solid black 0.1px",
  backgroundColor: "aliceblue",
  "&:hover": {
    backgroundColor: "#e6edf5",
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "50ch",
    },
  },
}));

export default function Navbar() {
  const { setUser, user } = useContext(AuthContext); // Ensure AuthContext is correctly imported and used
  const [SearchInput, setSearchInput] = useState("");
  const [CoursesTitle, setCoursesTitle] = useState([]);
  const dropdownRef = useRef(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [open, setopen] = useState(false);
  const navigate = useNavigate();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [toshowbtn, settoshowbtn] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1); // Track the active item index

  useEffect(() => {
    const checkToken = async () => {
      try {
        const response = await axios.get("/auth/check");
        if (response.data.user) {
          setUser(response.data.user);
          settoshowbtn(true);
        } else {
          settoshowbtn(false);
        }
      } catch (err) {
        setUser(null);
        settoshowbtn(false);
      }
    };

    checkToken();
  }, [user, open]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const CheckTitle = async () => {
      if (SearchInput) {
        try {
          const response = await axios.get(
            `/courses/searching?title=${SearchInput}`
          );

          setCoursesTitle(response.data);
        } catch (error) {
          console.log(error);
        }
      }
    };
    CheckTitle();
  }, [SearchInput]);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const handleSearchChange = (data) => {
    setDropdownVisible(true);
    setSearchInput(data);
  };
  const menuId = "primary-search-account-menu";
  const mobileMenuId = "primary-search-account-menu-mobile";

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMenuClose}
    >
      {toshowbtn && (
        <div>
          <MenuItem
            onClick={() => {
              navigate("/mylearning");
              handleMenuClose();
            }}
          >
            <IconButton size="large" color="inherit">
              <Badge badgeContent={4} color="error">
                <LibraryBooksIcon />
              </Badge>
            </IconButton>
            <p className="ms-2">MyLearning</p>
          </MenuItem>
          <MenuItem
            onClick={() => {
              navigate("/cart");
              handleMenuClose();
            }}
          >
            <IconButton size="large" color="inherit">
              <Badge badgeContent={17} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <p className="ms-2">MyCart</p>
          </MenuItem>
        </div>
      )}

      <MenuItem
        onClick={() => {
          navigate("/allcourses");
          handleMenuClose();
        }}
      >
        <IconButton size="large" color="inherit">
          <AssignmentIcon />
        </IconButton>
        <p>Allcourses</p>
      </MenuItem>
    </Menu>
  );
  const ToGotoAllcourse = (category, title) => {
    navigate(`/allcourses?category=${category}`);
    setDropdownVisible(false);
    setSearchInput(title);
  };

  const handleKeyDown = useCallback(
    (e) => {
      if (!dropdownVisible || CoursesTitle.length === 0) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((prevIndex) => (prevIndex + 1) % CoursesTitle.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex(
          (prevIndex) =>
            (prevIndex - 1 + CoursesTitle.length) % CoursesTitle.length
        );
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (activeIndex >= 0 && activeIndex < CoursesTitle.length) {
          ToGotoAllcourse(
            CoursesTitle[activeIndex].category,
            CoursesTitle[activeIndex].title
          );
        }
      }
    },
    [dropdownVisible, CoursesTitle, activeIndex]
  );

  const Logoutpop = () => {
    setopen(true);
  };
  const Logout = async () => {
    try {
      const response = await axios.post("/auth/logout");
      if (response.data.success) {
        setopen(false);
        toast.success("logout successfully", {
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
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "white" }}>
        <Toolbar>
          <IconButton
            onClick={() => navigate("/")}
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{
              mr: 2,
              color: "black",
              display: "flex",
              alignItems: "center",
              padding: 0, // Remove extra padding
            }}
          >
            <img
              src={SkillEra}
              alt="S logo"
              style={{
                height: "40px", // Set a reasonable height for the "S" logo
                width: "auto", // Maintain aspect ratio
                maxWidth: "100%", // Ensure it doesn't overflow
              }}
            />
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                color: "#3d3d3b",
                mt: 2,
                ml: -1, // Add margin between the logo and the text
                display: { xs: "none", sm: "block" }, // Hide text on extra small screens
                fontFamily: "italic  ",
                fontWeight: "550",
              }}
            >
              killEra
            </Typography>
          </IconButton>
          <div style={{ display: "flex", position: "relative" }}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon sx={{ color: "black" }} />
              </SearchIconWrapper>

              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                sx={{ color: "black" }}
                value={SearchInput}
                onChange={(e) => handleSearchChange(e.target.value)}
                onKeyDown={handleKeyDown} // Added onKeyDown event
              />
            </Search>
            <div className="Searching_Main_div" ref={dropdownRef}>
              {dropdownVisible &&
                CoursesTitle.map((item, index) => (
                  <div
                    className={`search-result-item ${
                      index === activeIndex ? "active" : ""
                    }`}
                    key={index}
                    onClick={() => ToGotoAllcourse(item.category, item.title)}
                  >
                    {item.title}
                  </div>
                ))}
            </div>
          </div>

          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            {!toshowbtn ? (
              <Stack direction="row" spacing={2}>
                <Button
                  onClick={() => navigate("/signup/login")}
                  style={{
                    background: "white",
                    color: "black",
                    border: "1px solid black",
                    fontWeight: "550",
                  }}
                  variant="contained"
                >
                  login
                </Button>
                <Button
                  onClick={() => navigate("/signup/register")}
                  className="Hidden-signup"
                  style={{
                    background: "black",
                    color: "white",
                    border: "1px solid black",
                    fontWeight: "550",
                    display: window.innerWidth <= 470 ? "none" : "block",
                  }}
                  variant="contained"
                >
                  SignUp
                </Button>
              </Stack>
            ) : (
              <Stack direction="row" spacing={2}>
                <Button
                  onClick={Logoutpop}
                  style={{
                    background: "white",
                    color: "black",
                    border: "1px solid black",
                    fontWeight: "550",
                    margin: "10px",
                  }}
                  variant="contained"
                >
                  logout
                </Button>
              </Stack>
            )}
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {!toshowbtn ? (
              <Stack direction="row" spacing={2} marginRight={3}>
                <Button
                  onClick={() => navigate("/signup/login")}
                  style={{
                    background: "white",
                    color: "black",
                    border: "1px solid black",
                    fontWeight: "550",
                    margin: "8px",
                  }}
                  variant="contained"
                >
                  login
                </Button>
                <Button
                  onClick={() => navigate("/signup/register")}
                  style={{
                    background: "black",
                    color: "white",
                    border: "1px solid black",
                    fontWeight: "550",
                    margin: "8px",
                    marginRight: "-20px",
                  }}
                  variant="contained"
                >
                  signUp
                </Button>
              </Stack>
            ) : (
              <Stack direction="row" spacing={2}>
                <Button
                  onClick={Logoutpop}
                  style={{
                    background: "white",
                    color: "black",
                    border: "1px solid black",
                    fontWeight: "550",
                    margin: "10px",
                  }}
                  variant="contained"
                >
                  logout
                </Button>
              </Stack>
            )}

            <>
              {toshowbtn && (
                <>
                  <IconButton
                    size="large"
                    color="inherit"
                    sx={{ color: "black" }}
                    onClick={() => {
                      navigate("/cart");
                      handleMenuClose();
                    }}
                  >
                    <Badge badgeContent={20} color="error">
                      <ShoppingCartIcon />
                    </Badge>
                  </IconButton>

                  <IconButton
                    size="large"
                    color="inherit"
                    sx={{ color: "black" }}
                    onClick={() => {
                      navigate("/mylearning");
                      handleMenuClose();
                    }}
                  >
                    <Badge badgeContent={4} color="error">
                      <LibraryBooksIcon />
                    </Badge>
                  </IconButton>
                </>
              )}

              <IconButton
                size="large"
                edge="end"
                color="inherit"
                sx={{ color: "black" }}
                onClick={() => {
                  navigate("/allcourses");
                  handleMenuClose();
                }}
              >
                <AssignmentIcon />
              </IconButton>
            </>
          </Box>

          <Box sx={{ display: { xs: "flex", md: "none" }, color: "black" }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}

      <Modal open={open} onClose={Logoutpop}>
        <ModalDialog>
          <Typography level="h2">Are you absolutely sure?</Typography>

          <Box sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  color="error"
                  fullWidth
                  onClick={Logout}
                >
                  logout
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant="outlined"
                  color="inherit"
                  fullWidth
                  onClick={() => setopen(false)}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Box>
        </ModalDialog>
      </Modal>
    </Box>
  );
}
