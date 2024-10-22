import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Grid,
  MenuItem,
  Select,
  FormControl,
  Button,
  Alert
} from "@mui/material";
import ResponsiveDrawer from "../../sidebar/SideBar";
import axios from "axios";

const gradientTheme = "linear-gradient(to left bottom, #455a64, #111111)";

const themeOptions = {
  palette: {
    primary: {
      main: "#C1CFFF",
    },
    secondary: {
      main: "#60d7a5",
    },
    error: {
      main: "#FED3D1",
      lightMain: "#FFD79D",
      textMain: "#E65F2B",
      textLightMain: "#916a00",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#455a64",
          backgroundImage: gradientTheme,
        },
      },
    },
  },
};
const defaultTheme = createTheme(themeOptions);

function CreateUser() {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    userId: "",
    firstName: "",
    lastName: "",
    role: "",
    password: "",
    confirmPassword: "",
    companyId: 0,
    departmentId: 0,
    companyBranchId: 0
  });
  const [error, setError] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [companyBranches, setCompanyBranches] = useState([]);

  useEffect(() => {
    fetchCompanies();
    fetchDepartments();
  }, []);

  useEffect(() => {
    if (formValues.companyId) {
      fetchCompanyBranches(formValues.companyId);
    }
  }, [formValues.companyId]);

  const fetchCompanies = async () => {
    try {
      const response = await axios.get("http://localhost:3000/company/getcompany");
      setCompanies(response.data.getcompany);
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  const fetchDepartments = async () => {
    try {
      const response = await axios.get("http://localhost:3000/department/getDepartmentList");
      setDepartments(response.data);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  const fetchCompanyBranches = async (companyId) => {
    try {
      const response = await axios.get(`http://localhost:3000/company/getBranchById/${companyId}`);
      setCompanyBranches(response.data.getcompanyBranch || []);
    } catch (error) {
      console.error("Error fetching company branches:", error);
      setCompanyBranches([]);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues(prevValues => ({
      ...prevValues,
      [name]: value,
    }));
    if (name === "companyId") {
      setFormValues(prevValues => ({
        ...prevValues,
        companyBranchId: "",
      }));
    }
    setError(false);
  };

  const handleSubmit = async () => {
    const allFieldsFilled = Object.values(formValues).every((value) => value.toString().trim() !== "");
  
    if (!allFieldsFilled) {
      setError(true);
      return;
    }
  
    try {
      const responsePararel = await axios.post("http://localhost:4000/auth/register", formValues);
      const response = await axios.post("http://localhost:3000/auth/register", formValues);
      console.log("Success:", response.data);
      navigate("/admin/user-manage/");
    } catch (error) {
      console.error("Error:", error);
    }
  };
  
  return (
      <ResponsiveDrawer>
        <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center", paddingTop: 4 }}>
          <Paper elevation={3} sx={{ padding: 4, borderRadius: 2, backgroundColor: "#FFFFFF", width: "100%", maxWidth: 900, color: "#111111" }}>
            <Box sx={{ mb: 2 }}>
              <Typography
                component="h2"
                sx={{
                  fontWeight: "bold",
                  fontSize: { xs: 18, sm: 20, lg: 25 },
                }}
              >
                ManagementUser (ADD)
              </Typography>
            </Box>

            {error && (
              <Alert variant="filled" severity="error" sx={{ mb: 2 }}>
                Please fill out all required fields.
              </Alert>
            )}
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={12} sm={6} md={6}>
                <Typography component="h6" sx={{ fontSize: { xs: 14, sm: 16, lg: 18 }, mb: 1 }}>
                  会社名
                </Typography>
                <FormControl fullWidth>
                  <Select
                    labelId="company-label"
                    id="company-select"
                    name="companyId"
                    value={formValues.companyId}
                    onChange={handleChange}
                    displayEmpty
                    sx={{ "& .MuiSelect-select": { fontSize: 14 } }}
                  >
                    <MenuItem value="" disabled>Select a Company</MenuItem>
                    {companies.map((company) => (
                      <MenuItem key={company.id} value={company.id}>{company.companyName}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <Typography component="h6" sx={{ fontSize: { xs: 14, sm: 16, lg: 18 }, mb: 1 }}>
                  カテゴリー
                </Typography>
                <FormControl fullWidth>
                  <Select
                    labelId="company-branch-label"
                    id="company-branch-select"
                    name="companyBranchId"
                    value={formValues.companyBranchId}
                    onChange={handleChange}
                    displayEmpty
                    sx={{ "& .MuiSelect-select": { fontSize: 14 } }}
                  >
                    <MenuItem value="" disabled>
                      {companyBranches.length === 0 ? "NoData" : "Select a Branch"}
                    </MenuItem>
                    {companyBranches.map((branch) => (
                      <MenuItem key={branch.id} value={branch.id}>{branch.companyBranchName}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={12} sm={6} md={4}>
                <Typography component="h6" sx={{ fontSize: { xs: 14, sm: 16, lg: 18 }, mb: 1 }}>
                  ID User
                </Typography>
                <TextField
                  label="Code"
                  name="userId"
                  fullWidth
                  value={formValues.userId}
                  onChange={handleChange}
                  sx={{ "& .MuiInputBase-input": { fontSize: 14 } }}
                />
              </Grid>
            </Grid>
            
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={12} sm={6} md={6}>
                <Typography component="h6" sx={{ fontSize: { xs: 14, sm: 16, lg: 18 }, mb: 1 }}>
                  部署
                </Typography>
                <FormControl fullWidth>
                  <Select
                    labelId="department-label"
                    id="department-select"
                    name="departmentId"
                    value={formValues.departmentId}
                    onChange={handleChange}
                    displayEmpty
                    sx={{ "& .MuiSelect-select": { fontSize: 14 } }}
                  >
                    <MenuItem value="" disabled>Select a Department</MenuItem>
                    {departments.map((department) => (
                      <MenuItem key={department.id} value={department.id}>{department.departmentName}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <Typography component="h6" sx={{ fontSize: { xs: 14, sm: 16, lg: 18 }, mb: 1 }}>
                  Position
                </Typography>
                <FormControl fullWidth>
                  <Select
                    labelId="role-label"
                    id="role-select"
                    name="role"
                    value={formValues.role}
                    onChange={handleChange}
                    displayEmpty
                    sx={{ "& .MuiSelect-select": { fontSize: 14 } }}
                  >
                    <MenuItem value="" disabled>Select a Role</MenuItem>
                    <MenuItem value="Admin">Admin</MenuItem>
                    <MenuItem value="Pm">PM</MenuItem>
                    <MenuItem value="User">User</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={12} sm={6} md={6}>
                <Typography component="h6" sx={{ fontSize: { xs: 14, sm: 16, lg: 18 }, mb: 1 }}>
                  FirstName
                </Typography>
                <TextField
                  label="FirstName"
                  name="firstName"
                  fullWidth
                  value={formValues.firstName}
                  onChange={handleChange}
                  sx={{ "& .MuiInputBase-input": { fontSize: 14 } }}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <Typography component="h6" sx={{ fontSize: { xs: 14, sm: 16, lg: 18 }, mb: 1 }}>
                  LastName
                </Typography>
                <TextField
                  label="LastName"
                  name="lastName"
                  fullWidth
                  value={formValues.lastName}
                  onChange={handleChange}
                  sx={{ "& .MuiInputBase-input": { fontSize: 14 } }}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={12} sm={6} md={6}>
                <Typography component="h6" sx={{ fontSize: { xs: 14, sm: 16, lg: 18 }, mb: 1 }}>
                  PassWord
                </Typography>
                <TextField
                  label="PassWord"
                  name="password"
                  type="password"
                  fullWidth
                  value={formValues.password}
                  onChange={handleChange}
                  sx={{ "& .MuiInputBase-input": { fontSize: 14 } }}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <Typography component="h6" sx={{ fontSize: { xs: 14, sm: 16, lg: 18 }, mb: 1 }}>
                  ConfirmPassWord
                </Typography>
                <TextField
                  label="ConfirmPassWord"
                  name="confirmPassword"
                  type="password"
                  fullWidth
                  value={formValues.confirmPassword}
                  onChange={handleChange}
                  sx={{ "& .MuiInputBase-input": { fontSize: 14 } }}
                />
              </Grid>
            </Grid>

            <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ mb: 3 }}>
              <Grid item xs={12} sx={{ textAlign: "right" }}>
                <Button
                  sx={{ mr: 1, backgroundColor: "#EE201C", "&:hover": { backgroundColor: "#A81F1D" } }}
                  variant="contained"
                >
                  CANCEL
                </Button>
                <Button
                  sx={{ backgroundColor: "#47E499", "&:hover": { backgroundColor: "#46916D" } }}
                  variant="contained"
                  onClick={handleSubmit}
                >
                  OK
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </ResponsiveDrawer>
  );
}

export default CreateUser;