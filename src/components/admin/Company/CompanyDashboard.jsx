import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
  Modal,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import ResponsiveDrawer from "../../sidebar/SideBar";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import axios from "axios";

const CompanyDashboard = () => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const [company, setcompany] = useState([]);

  const [noData, setNoData] = useState(false);
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;
  const [searchParams, setSearchParams] = useState({
    companyName: "",
  });
  const [open, setOpen] = useState(false); // เปิด/ปิด dialog
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [deleteCompany, setDeleteCompany] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  // Fetch data from the API
  const fetchData = (params = {}) => {
    axios
      .get("http://localhost:3000/company/getcompany", { params })
      .then((response) => {
        const companyData = response.data.getcompany;
        if (companyData.length === 0) {
          setNoData(true);
          setcompany([]);
        } else {
          setNoData(false);
          setcompany(companyData);
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
        setNoData(true);
        setcompany([]);
      });
  };

  const handleViewCompany = (id) => {
    axios
      .get(`http://localhost:3000/company/getCompanyById/${id}`)
      .then((response) => {
        setSelectedCompany(response.data);
        setModalOpen(true);
      })
      .catch((error) => {
        console.error("Error fetching company details:", error);
        alert("Error fetching company details. Please try again.");
      });
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedCompany(null);
  };

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const paginatedngName = company.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );
  // Handle input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSearchParams((prevParams) => ({
      ...prevParams,
      [name]: value,
    }));
  };

  const handleDeleteClick = (company) => {
    setDeleteCompany(company);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDeleteCompany(null);
  };

  const handleDeleteConfirm = () => {
    if (deleteCompany) {
      axios
        .get(`http://localhost:3000/company/CompanyDelete/${deleteCompany.id}`)
        .then(() => {
          fetchData();
          setOpen(false);
          setDeleteCompany(null);
        })
        .catch((error) => {
          console.error("Error deleting department:", error);
          // You can add error handling here, such as showing an error message to the user
        });
    }
  };

  // Handle search functionality
  const handleSearch = () => {
    if (!searchParams.companyName.trim()) {
      alert("Please enter a reason name to search.");
      return;
    }
    fetchData({ companyName: searchParams.companyName });
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
                  COMPANYLIST
                </Typography>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Link
                  to="/admin/company/create"
                  style={{ textDecoration: "none" }}
                >
                  <Button fullWidth variant="contained" color="secondary">
                    CREATE
                  </Button>
                </Link>
              </Grid>
            </Grid>
            <Grid
              container
              spacing={1}
              alignItems="center"
              sx={{ marginBottom: 2 }}
            >
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Reason Name"
                  name="companyName"
                  value={searchParams.companyName}
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
                <Button
                  fullWidth
                  variant="contained"
                  color="secondary"
                  onClick={handleSearch}
                >
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
                    <TableCell sx={{ color: "#000000" }}>CompanyName</TableCell>
                    <TableCell sx={{ color: "#000000" }}></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {noData ? (
                    <TableRow>
                      <TableCell
                        colSpan={2}
                        align="center"
                        sx={{ color: "#000000" }}
                      >
                        <Typography variant="body1">No data</Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    paginatedngName.map((dataCompany) => (
                      <TableRow key={dataCompany.id}>
                        <TableCell sx={{ color: "#000000" }}>
                          {dataCompany.companyName}
                        </TableCell>
                        <TableCell sx={{ color: "#000000" }}>
                          <IconButton
                            aria-label="edit"
                            component={Link}
                            to={`/admin/company/edit/${dataCompany.id}`}
                          >
                            <EditIcon color="info" />
                          </IconButton>
                          <IconButton
                            aria-label="delete"
                            onClick={() => handleDeleteClick(dataCompany)}
                          >
                            <DeleteForeverIcon sx={{ color: "#ee201c" }} />
                          </IconButton>
                          <IconButton
                            aria-label="view"
                            onClick={() => handleViewCompany(dataCompany.id)}
                          >
                            <VisibilityIcon sx={{ color: "#ffba4b" }} />
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
                count={Math.ceil(company.length / rowsPerPage)}
                page={page}
                shape="rounded"
                onChange={handleChangePage}
                color="primary"
              />
            </Box>
          </Paper>
        </Box>
      </Box>
      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        aria-labelledby="company-details-modal"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Company Details
          </Typography>
          {selectedCompany && (
            <Box>
              <Typography variant="body1">
                Company Name: {selectedCompany.companyName}
              </Typography>
              <Typography variant="body1">Branches:</Typography>
              <ul>
                {selectedCompany.companyBranch.map((branch, index) => (
                  <li key={index}>{branch.companyBranchName}</li>
                ))}
              </ul>
            </Box>
          )}
          <Button onClick={handleCloseModal}>Close</Button>
        </Box>
      </Modal>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Do you want to delete stock ID {deleteCompany?.id} -{" "}
            {deleteCompany?.companyName}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
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
                onClick={handleClose}
              >
                戻る
              </Button>
              <Button
                sx={{
                  backgroundColor: "#47E499",
                  "&:hover": { backgroundColor: "#46916D" },
                }}
                variant="contained"
                onClick={handleDeleteConfirm}
              >
                登録
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </ResponsiveDrawer>
  );
};

export default CompanyDashboard;
