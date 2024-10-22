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

const UserDashboard = () => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const [users, setUsers] = useState([]);
  const [noData, setNoData] = useState(false);
  const [searchParams, setSearchParams] = useState({
    userId: '',
    userName: ''
  });

  const [selectedUsers, setSelectedUsers] = useState(null); // stock ที่เลือก
  const [open, setOpen] = useState(false); // เปิด/ปิด dialog

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = (params = {}) => {
    axios.get('http://localhost:3000/auth/users', { params })
      .then(response => {
        if (response.data.length === 0) {
          setNoData(true);
          setUsers([]);
        } else {
          setNoData(false);
          setUsers(response.data);
        }
      })
      .catch(error => {
        console.error("There was an error fetching the data!", error);
        setNoData(true);
        setUsers([]);
      });
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSearchParams(prevParams => ({
      ...prevParams,
      [name]: value
    }));
  };

  const handleSearch = () => {
    const params = {};
    if (searchParams.userId) params.userId = searchParams.userId;
    if (searchParams.userName) params.userName = searchParams.userName;
    fetchUsers(params);
  };

const handleDeleteClick = (users) => {
    setSelectedUsers(users);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedUsers(null);
  };

  const handleDeleteConfirm = () => {
    if (selectedUsers) {
      axios
        .get(`http://localhost:3000/auth/softDeleteUser/${selectedUsers.id}`)
        .then(() => {
          fetchUsers(); // รีเฟรชรายการ fetchUsers หลังจากลบ
          setOpen(false); // ปิด Modal หลังจากลบสำเร็จ
          setSelectedUsers(null); // ล้างค่า selectedStock
        })
        .catch((error) => {
          console.error("Error deleting Users:", error);
        });
    }
  };

  return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          maxHeight: 400,
          overflow: "auto",
        }}
      >
        <ResponsiveDrawer>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "100vh", 
            
            }}
          >
            <Paper
              sx={{
                margin: "auto",
                padding: isMobile ? 2 : 4,
                maxWidth: isMobile ? "100%" : 800,
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
                    LISTUSER
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Link to="/admin/user-manage/create" style={{ textDecoration: 'none' }}>
                    <Button fullWidth variant="contained" color="secondary">
                      CREATE
                    </Button>
                  </Link>
                </Grid>
              </Grid>
              <Grid container spacing={1} alignItems="center" sx={{ marginBottom: 2 }}>
           
                <Grid item xs={6}>
                  <TextField
                    size="small"
                    fullWidth
                    label="CodeUser"
                    name="userId"
                    value={searchParams.userId}
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
               
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Name"
                    name="userName"
                    value={searchParams.userName}
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
                  <Button fullWidth variant="contained" color="secondary"  onClick={handleSearch}>
                    SEARCH
                  </Button>
                </Grid>
              </Grid>

          
              <Grid
                container
                spacing={2}
                justifyContent="center"
                alignItems="center"
              >
                <Grid item>
                  <Typography variant="h6">工程</Typography>
                </Grid>
              </Grid>
              <TableContainer
                component={Paper}
                sx={{ marginTop: 2, bgcolor: "#ffffff" }}
                
              >
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ color: "#000000" }}>Code User</TableCell>
                      <TableCell sx={{ color: "#000000" }}>UserName</TableCell>
                      <TableCell sx={{ color: "#000000" }}></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                  {noData ? (
                    <TableRow>
                      <TableCell colSpan={3} align="center" sx={{ color: "#000000" }}>
                        <Typography variant="body1">No data</Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell sx={{ color: "#000000" }}>
                          <Link to="">
                            {user.userId}
                          </Link>
                        </TableCell>
                        <TableCell sx={{ color: "#000000" }}>
                          {user.firstName} {user.lastName}
                        </TableCell>
                        <TableCell sx={{ color: "#000000" }}>
                          <IconButton aria-label="edit" component={Link} to={`/admin/user-manage/edit/${user.id}`}>
                            <EditIcon color="info"/>
                          </IconButton>
                          <IconButton aria-label="delete" onClick={() => handleDeleteClick(user)}>
                            <DeleteForeverIcon sx={{ color: "#ee201c" }} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Box>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Do you want to delete user ID {selectedUsers?.userId} - {selectedUsers?.firstName} {selectedUsers?.lastName}
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

        </ResponsiveDrawer>
      </Box>

  );
};

export default UserDashboard;