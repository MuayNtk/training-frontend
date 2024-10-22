import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import {
  ThemeProvider,
  Grid,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  useMediaQuery,
  IconButton,
  Pagination,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@mui/material";
import ResponsiveDrawer from "../../sidebar/SideBar";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';


const DepartmentDashboard = () => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const [departmentName, setDepartmentName] = useState([]);
  const [noData, setNoData] = useState(false);
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false); // เปิด/ปิด dialog
  const [selectedDepartment, setSelectedDepartment] = useState(null); // Department ที่เลือก

  const rowsPerPage = 5;
  const [searchParams, setSearchParams] = useState({
    departmentName: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  // Fetch data from the API
  const fetchData = (params = {}) => {
    axios.get('http://localhost:3000/department/getDepartmentList', { params })
      .then(response => {
        if (response.data.length === 0) {
          setNoData(true);
          setDepartmentName([]);
        } else {
          setNoData(false);
          setDepartmentName(response.data);
        }
      })
      .catch(error => {
        console.error("There was an error fetching the data!", error);
        setNoData(true);
        setDepartmentName([]);
      });
  };

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };
  
  const handleDeleteClick = (departmentName) => {
    setSelectedDepartment(departmentName);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedDepartment(null);
  };

  const handleDeleteConfirm = () => {
    if (selectedDepartment) {
      axios
        .get(`http://localhost:3000/department/departmentDelete/${selectedDepartment.id}`)
        .then(() => {
          fetchData();
          setOpen(false);
          setSelectedDepartment(null);
        })
        .catch((error) => {
          console.error("Error deleting department:", error);
          // You can add error handling here, such as showing an error message to the user
        });
    }
  };
  const paginatedngName = departmentName.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  // Handle input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSearchParams(prevParams => ({
      ...prevParams,
      [name]: value
    }));
  };

  // Handle search functionality
  const handleSearch = () => {
    if (!searchParams.departmentName.trim()) {
      alert("Please enter a reason name to search.");
      return;
    }
    fetchData({ departmentName: searchParams.departmentName });
  };

  return (
      <ResponsiveDrawer>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "85vh",
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
                maxWidth: isMobile ? "100%" : 600,
                width: "100%",
                textAlign: "center",
                borderRadius: 2,
                bgcolor: "#ffffff", 
                color: "#000000",
              }}
            >
              <Grid container spacing={1} sx={{ marginBottom: 2 }}>
                <Grid item xs={12} sm={9}>
                  <Typography variant="h5" gutterBottom align="left">
                   DepartmentLIST
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Link to="/admin/department/create" style={{ textDecoration: 'none' }}>
                    <Button fullWidth variant="contained" color="secondary">
                      CREATE
                    </Button>
                  </Link>
                </Grid>
              </Grid>
              <Grid container spacing={1} alignItems="center" sx={{ marginBottom: 2 }}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="DepartmentName"
                    name="departmentName"
                    value={searchParams.departmentName}
                    onChange={handleInputChange}
                    variant="outlined"
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
                      mb: 1,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button fullWidth variant="contained" color="secondary" onClick={handleSearch}>
                    SEARCH
                  </Button>
                </Grid>
              </Grid>

              <TableContainer
                component={Paper}
                sx={{ marginTop: 2, bgcolor: "#ffffff" }}
              >
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ color: "#000000" }}>NG Name</TableCell>
                      <TableCell sx={{ color: "#000000" }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {noData ? (
                      <TableRow>
                        <TableCell colSpan={2} align="center" sx={{ color: "#000000" }}>
                          <Typography variant="body1">No data</Typography>
                        </TableCell>
                      </TableRow>
                    ) : (
                    paginatedngName.map((dataDepartment) => (
                        <TableRow key={dataDepartment.id}>
                          <TableCell sx={{ color: "#000000" }}>
                            {dataDepartment.departmentName}
                          </TableCell>
                          <TableCell sx={{ color: "#000000" }}>
                            <IconButton aria-label="edit" component={Link} to={`/admin/department/edit/${dataDepartment.id}`}>
                              <EditIcon color="info" />
                            </IconButton>
                            <IconButton aria-label="delete" onClick={() => handleDeleteClick(dataDepartment)}>
                              <DeleteForeverIcon sx={{ color: "#ee201c" }} />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <Box sx={{ display: "flex", justifyContent: "right", mt: 2 }}>
                <Pagination
                  count={Math.ceil(departmentName.length / rowsPerPage)}
                  page={page}
                  shape="rounded"
                  onChange={handleChangePage}
                  color="primary" 
                />
            </Box>
            </Paper>
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Confirm Delete</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Do you want to delete stock ID {selectedDepartment?.id} - {selectedDepartment?.departmentName}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ mt: 1 }}>
                  <Grid item xs={12} sx={{ textAlign: "right" }}>
                    <Button
                      sx={{ mr: 1, backgroundColor: "#EE201C", "&:hover": { backgroundColor: "#A81F1D" } }}
                      variant="contained"
                      onClick={handleClose}
                    >
                      戻る
                    </Button>
                    <Button
                      sx={{ backgroundColor: "#47E499", "&:hover": { backgroundColor: "#46916D" } }}
                      variant="contained"
                      onClick={handleDeleteConfirm}
                    >
                      登録
                    </Button>
                  </Grid>
                </Grid>
              </DialogActions>
            </Dialog>        

          </Box>
        </Box>
      </ResponsiveDrawer>
  );
};

export default DepartmentDashboard;

