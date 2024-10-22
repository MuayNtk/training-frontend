import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Paper, Typography, TextField, Grid, Button } from "@mui/material";
import ResponsiveDrawer from "../../sidebar/SideBar";
import { ThemeProvider } from "@mui/material/styles";

import axios from 'axios';

function EditCompany() {
  const { id } = useParams();
  const [company, setCompany] = useState(null);
  const [formValues, setFormValues] = useState({
    companyName: "",
    companyBranch: []
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/company/getCompanyById/${id}`);
        setCompany(response.data);
        setFormValues({
          companyName: response.data.companyName,
          companyBranch: response.data.companyBranch.map(branch => ({
            id: branch.id,
            companyBranchName: branch.companyBranchName
          }))
        });
      } catch (error) {
        console.error('Error fetching company data:', error);
      }
    };

    fetchCompany();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBranchChange = (index, e) => {
    const { value } = e.target;
    setFormValues(prev => ({
      ...prev,
      companyBranch: prev.companyBranch.map((branch, i) => 
        i === index ? { ...branch, companyBranchName: value } : branch
      )
    }));
  };

  const handleAddBranch = () => {
    setFormValues(prev => ({
      ...prev,
      companyBranch: [...prev.companyBranch, { id: Date.now(), companyBranchName: "" }]
    }));
  };

  const handleSubmit = async () => {
    try {
      const responsePararel = await axios.put(`http://localhost:4000/company/companyEdit/${id}`, formValues);
      const response = await axios.put(`http://localhost:3000/company/companyEdit/${id}`, formValues);
      console.log("Company updated successfully:", response.data);
      navigate('/admin/company/'); 
    } catch (error) {
      console.error("Error updating company:", error);
      // Handle error (e.g., show error message to user)
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (!company) {
    return <div>Loading...</div>;
  }

  return (
      <ResponsiveDrawer>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            minHeight: "85vh",
            width: "100%",
            p: { xs: 1, sm: 2 },
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
              แก้ไขข้อมูลบริษัท
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
                  name="companyName"
                  value={formValues.companyName}
                  onChange={handleChange}
                  sx={{ width: "100%", "& .MuiInputBase-input": { fontSize: 14 } }}
                />
              </Grid>
            </Grid>

            <Typography
              component="h6"
              sx={{ fontWeight: "bold", fontSize: { xs: 16, sm: 18 }, mb: 2 }}
            >
              สาขา
            </Typography>

            {formValues.companyBranch.map((branch, index) => (
              <Paper
                key={branch.id}
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
                  name={`branch-${index}`}
                  value={branch.companyBranchName}
                  onChange={(e) => handleBranchChange(index, e)}
                  sx={{ width: "100%", "& .MuiInputBase-input": { fontSize: 14 } }}
                />
              </Paper>
            ))}

            <Button
              sx={{
                backgroundColor: "#4CAF50",
                color: "white",
                "&:hover": { backgroundColor: "#388E3C" },
                mb: 2,
              }}
              variant="contained"
              onClick={handleAddBranch}
            >
              เพิ่มสาขา
            </Button>

            <Grid container justifyContent="flex-end" spacing={2} sx={{ mt: 2 }}>
              <Grid item>
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "#EE201C", "&:hover": { backgroundColor: "#A81F1D" } }}
                  onClick={handleBack}
                >
                  戻る
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "#47E499", "&:hover": { backgroundColor: "#46916D" } }}
                  onClick={handleSubmit}
                >
                  登録
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </ResponsiveDrawer>
  );
}

export default EditCompany;