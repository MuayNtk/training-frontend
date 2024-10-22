import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  ThemeProvider,
  Grid,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  useMediaQuery,
} from "@mui/material";
import ResponsiveDrawer from "../../sidebar/SideBar";


const EditDepartment = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get 'id' from route parameters
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const [departmentName, setDepartmentName] = useState(""); // State to store reasonName

  
  useEffect(() => {
    const fetchDepartmentName = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/department/getDepartmentById/${id}`);
        setDepartmentName(response.data.departmentName); 
      } catch (error) {
        console.error("Error fetching reasonName:", error);
      }
    };

    fetchDepartmentName();
  }, [id]);

  // Function to handle form submission
  const handleSubmit = async () => {
    try {
      await axios.put(`http://localhost:3000/department/editDepartment/${id}`, {
        departmentName, // Send the updated reasonName in the request body
      });
      await axios.put(`http://localhost:4000/department/editDepartment/${id}`, {
        departmentName, // Send the updated reasonName in the request body
      });
      alert("Update successful!");
      navigate(-1); // Navigate back after submission
    } catch (error) {
      console.error("Error updating reasonName:", error);
      alert("Failed to update. Please try again.");
    }
  };

  return (
      <ResponsiveDrawer>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            minHeight: "75vh",
            width: "100%",
            p: { xs: 1, sm: 2, md: 3 },
            marginTop: 10,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Paper
              sx={{
                margin: "auto",
                padding: isMobile ? 2 : 4,
                maxWidth: isMobile ? "100%" : 500,
                width: "100%",
                textAlign: "center",
                borderRadius: 2,
                bgcolor: "#ffffff",
                color: "#000000",
              }}
            >
              <Typography variant="h6" gutterBottom align="left">
                Edit NG Reason
              </Typography>

              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <Grid container direction="row" alignItems="center" spacing={1}>
                    <Grid item xs>
                      <TextField
                        fullWidth
                        size="small"
                        name="departmentName"
                        variant="outlined"
                        value={departmentName} // Display reasonName in the input
                        onChange={(e) => setDepartmentName(e.target.value)} // Allow editing the reasonName
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              borderColor: "#000000",
                            },
                            "&:hover fieldset": {
                              borderColor: "#000000",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "#000000",
                            },
                          },
                          "& .MuiInputLabel-root": {
                            color: "#757575",
                          },
                          "& .MuiInputBase-input": {
                            color: "#000000",
                          },
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ mt: 1 }}>
                  <Grid item xs={12} sx={{ textAlign: "right" }}>
                    <Button
                      sx={{ mr: 1, backgroundColor: "#EE201C", "&:hover": { backgroundColor: "#A81F1D" } }}
                      variant="contained"
                      onClick={() => navigate(-1)}
                    >
                      戻る
                    </Button>
                    <Button
                      sx={{ backgroundColor: "#47E499", "&:hover": { backgroundColor: "#46916D" } }}
                      variant="contained"
                      onClick={handleSubmit} 
                    >
                      登録
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Box>
        </Box>
      </ResponsiveDrawer>
  );
};

export default EditDepartment;