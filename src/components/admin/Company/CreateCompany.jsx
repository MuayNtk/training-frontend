import React, { useState } from "react";
import { Box, Paper, Typography, TextField, Grid, Button } from "@mui/material";
import ResponsiveDrawer from "../../sidebar/SideBar";

import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateCompany() {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");
  const [branches, setBranches] = useState([]);

  const handleCompanyNameChange = (event) => {
    setCompanyName(event.target.value);
  };

  const handleBranchChange = (index, field, value) => {
    const newBranches = [...branches];
    newBranches[index][field] = value;
    setBranches(newBranches);
  };

  const addBranch = () => {
    setBranches([...branches, { companyBranchName: "" }]);
  };

  const removeBranch = (index) => {
    const newBranches = branches.filter((_, i) => i !== index);
    setBranches(newBranches);
  };

  const handleSubmit = async () => {
    try {
      const responsePararel = await axios.post("http://localhost:4000/company/companycreate", {
        companyName,
        companyBranch: branches.filter(branch => branch.companyBranchName.trim() !== "")
      });
      console.log(responsePararel)
      const response = await axios.post(
        "http://localhost:3000/company/companycreate",
        {
          companyName,
          companyBranch: branches.filter(
            (branch) => branch.companyBranchName.trim() !== ""
          ),
        }
      );
      console.log("Company created:", response.data);
      console.log("edit data:", JSON.stringify(response.data, null, 2));
      // Handle success (e.g., show a success message, redirect, etc.)
      navigate("/admin/company/");
    } catch (error) {
      console.error("Error creating company:", error);
      // Handle error (e.g., show an error message)
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
          minHeight: "100vh",
          width: "100%",
          p: { xs: 1, sm: 2, md: 3 },
          marginTop: 10,
        }}
      >
        <Paper
          sx={{
            p: { xs: 1, sm: 2, md: 3 },
            backgroundColor: "#ffffff",
            borderRadius: "16px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            maxWidth: "600px",
            width: "100%",
            border: "1px solid #000000",
          }}
        >
          <Typography
            component="h2"
            sx={{
              fontWeight: "bold",
              fontSize: { xs: 18, sm: 20, lg: 25 },
              mb: 2,
            }}
          >
            ฟอร์มข้อมูลบริษัท
          </Typography>

          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={12}>
              <Typography
                component="h6"
                sx={{ fontSize: { xs: 14, sm: 16 }, mb: 1 }}
              >
                ชื่อบริษัท
              </Typography>
              <TextField
                fullWidth
                value={companyName}
                onChange={handleCompanyNameChange}
                sx={{
                  width: "100%",
                  "& .MuiInputBase-input": { fontSize: 14 },
                }}
              />
            </Grid>
          </Grid>

          <Typography
            component="h6"
            sx={{ fontWeight: "bold", fontSize: { xs: 16, sm: 18 }, mb: 2 }}
          >
            สาขา (ไม่จำเป็น)
          </Typography>

          {branches.map((branch, index) => (
            <Paper
              key={index}
              sx={{
                p: 2,
                mb: 2,
                backgroundColor: "#ffffff",
                border: "1px solid #000000",
              }}
            >
              <Typography component="h6" sx={{ fontSize: 14 }}>
                ชื่อสาขา
              </Typography>
              <TextField
                fullWidth
                value={branch.companyBranchName}
                onChange={(e) =>
                  handleBranchChange(index, "companyBranchName", e.target.value)
                }
                sx={{
                  width: "100%",
                  "& .MuiInputBase-input": { fontSize: 14 },
                }}
              />

              <Button
                onClick={() => removeBranch(index)}
                sx={{
                  mt: 1,
                  backgroundColor: "#f44336",
                  color: "white",
                  "&:hover": { backgroundColor: "#d32f2f" },
                }}
              >
                ลบสาขา
              </Button>
            </Paper>
          ))}

          <Button
            onClick={addBranch}
            sx={{
              backgroundColor: "#4CAF50",
              color: "white",
              "&:hover": { backgroundColor: "#388E3C" },
              mb: 2,
            }}
            variant="contained"
          >
            เพิ่มสาขา
          </Button>

          <Grid container justifyContent="flex-end" spacing={2} sx={{ mt: 2 }}>
            <Grid item>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#EE201C",
                  "&:hover": { backgroundColor: "#A81F1D" },
                }}
              >
                ย้อนกลับ
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                onClick={handleSubmit}
                sx={{
                  backgroundColor: "#47E499",
                  "&:hover": { backgroundColor: "#46916D" },
                }}
              >
                บันทึก
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </ResponsiveDrawer>
  );
}

export default CreateCompany;
