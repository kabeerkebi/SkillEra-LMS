import React, { useEffect, useState } from "react";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import { Button, Typography, Box, Grid, Container, Paper } from "@mui/material";
import axios from "../../utils/axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const AllCourses = () => {
  const [open, setOpen] = useState(false);
  const [course, setcourse] = useState([]);
  const [storeid, setstoreid] = useState(null);
  const navigate = useNavigate()
  const handleOpen = (id) => {
    setstoreid(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    const fecthdata = async () => {
      try {
        const response = await axios.get("/courses/admin/allcourses");
        setcourse(response.data.courses);
      } catch (error) {
        console.log(error);
      }
    };
    fecthdata();
  }, [course]);
  const handleDelete = async () => {
    try {
      const response = await axios.post(`/courses/admin/delete/${storeid}`);
      console.log(response);

      if (response.data.success) {
        toast.success("course deleted", {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        handleClose();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      style={{
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
        padding: "20px 0",
      }}
    >
      <Modal open={open} onClose={handleClose}>
        <ModalDialog>
          <Typography level="h2">Are you absolutely sure?</Typography>
          <Typography color="text.secondary">
            This action cannot be undone. This will permanently delete your data
            from the database.
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  color="error"
                  fullWidth
                  onClick={handleDelete}
                >
                  Continue
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant="outlined"
                  color="inherit"
                  fullWidth
                  onClick={handleClose}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Box>
        </ModalDialog>
      </Modal>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Grid item xs={12} sm="auto">
            <Typography variant="h4">All Courses</Typography>
          </Grid>
          <Grid item xs={12} sm="auto">
            <Button variant="contained" color="primary"onClick={()=>navigate("/admin/postingcourse/coursesinformation")} >
              Post Course
            </Button>
          </Grid>
        </Grid>
        {/* here set all courses */}

        {course &&
          course.map((item, index) => (
            <Paper
              key={index}
              elevation={3}
              sx={{ p: 3, mt: 3, backgroundColor: "#ffffff" }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} md={11}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} lg={7}>
                      <Typography variant="h6" sx={{ mb: 1 }}>
                        Course Title
                      </Typography>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" color="text.secondary">
                          Location: Anywhere
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Instructor Name
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Posted on: 2024-07-13
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} lg={2} sx={{ textAlign: "center" }}>
                      <Typography variant="h6">0</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Actions pending
                      </Typography>
                    </Grid>
                    <Grid item xs={6} lg={2} sx={{ textAlign: "center" }}>
                      <Typography variant="h6">0</Typography>
                      <Typography variant="body2" color="text.secondary">
                        All students
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={1}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: {
                        xs: "space-between",
                        md: "space-evenly",
                      },
                      flexDirection: { xs: "row", md: "column" },
                      gap: { xs: 1, md: 0 },
                    }}
                  >
                    <Button variant="outlined" color="primary">
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleOpen(item._id)}
                    >
                      Delete
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          ))}
      </Container>
      <ToastContainer />
    </div>
  );
};

export default AllCourses;
