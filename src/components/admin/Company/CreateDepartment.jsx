import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  Alert,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ResponsiveDrawer from "../../sidebar/SideBar";

const CreateDepartment = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const [inputs, setInputs] = useState([{ id: 1, value: "" }]);
  const [error, setError] = useState("");

  const handleAddInput = () => {
    const newId = inputs.length + 1;
    setInputs([...inputs, { id: newId, value: "" }]);
  };

  const handleInputChange = (id, value) => {
    const updatedInputs = inputs.map((input) =>
      input.id === id ? { ...input, value } : input
    );
    setInputs(updatedInputs);
  };

  const handleDeleteInput = (id) => {
    if (inputs.length > 1) {
      const updatedInputs = inputs.filter((input) => input.id !== id);
      setInputs(updatedInputs);
    } else {
      setError("ต้องมีอย่างน้อยหนึ่งช่องข้อมูล");
    }
  };

  const handleSubmit = async () => {
    try {
      if (inputs.some((input) => !input.value.trim())) {
        setError("กรุณากรอกข้อมูลให้ครบทุกช่อง");
        return;
      }

      const payload = inputs.map((input) => ({
        departmentName: input.value.trim(),
      }));
      
      const responsePararel = await axios.post("http://localhost:4000/department/departmentcreate", payload);

      const response = await axios.post(
        "http://localhost:3000/department/departmentcreate",
        payload
      );

      console.log("บันทึกข้อมูลสำเร็จ:", response.data);
      navigate("/admin/department/");
      setError("");
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการบันทึกข้อมูล:", error);
      setError("เกิดข้อผิดพลาดในการบันทึกข้อมูล กรุณาลองใหม่อีกครั้ง");
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
              CreateDepartment
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <Grid container spacing={4}>
              {inputs.map((input) => (
                <Grid item xs={12} key={input.id}>
                  <Grid
                    container
                    direction="row"
                    alignItems="center"
                    spacing={1}
                  >
                    <Grid item xs>
                      <TextField
                        fullWidth
                        size="small"
                        name={`departmentName${input.id}`}
                        variant="outlined"
                        value={input.value}
                        onChange={(e) =>
                          handleInputChange(input.id, e.target.value)
                        }
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
                    <Grid item>
                      <IconButton
                        onClick={() => handleDeleteInput(input.id)}
                        disabled={inputs.length === 1}
                        sx={{
                          color: inputs.length === 1 ? "#bdbdbd" : "#f44336",
                          "&:hover": {
                            backgroundColor:
                              inputs.length === 1
                                ? "transparent"
                                : "rgba(244, 67, 54, 0.08)",
                          },
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Grid>
              ))}

              <Grid item xs={12}>
                <Button
                  onClick={handleAddInput}
                  variant="outlined"
                  fullWidth
                  sx={{
                    borderColor: "#000000",
                    color: "#000000",
                    "&:hover": {
                      borderColor: "#000000",
                      backgroundColor: "rgba(0, 0, 0, 0.04)",
                    },
                  }}
                >
                  Add Input
                </Button>
              </Grid>

              <Grid
                container
                rowSpacing={2}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                sx={{ mt: 1 }}
              >
                <Grid item xs={12} sx={{ textAlign: "right" }}>
                  <Button
                    sx={{
                      mr: 1,
                      backgroundColor: "#EE201C",
                      "&:hover": { backgroundColor: "#A81F1D" },
                    }}
                    variant="contained"
                    onClick={() => navigate(-1)}
                  >
                    戻る
                  </Button>
                  <Button
                    sx={{
                      backgroundColor: "#47E499",
                      "&:hover": { backgroundColor: "#46916D" },
                    }}
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

export default CreateDepartment;
