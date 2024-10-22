import React from "react";
import { useEffect, useState } from "react";
import ResponsiveDrawer from "../sidebar/SideBarUser";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  TextField,
  Button,
  InputAdornment,
  Grid,
  TablePagination,
  Typography,
  Box,
  Tabs,
  Tab,
} from "@mui/material";
import { Search } from "@mui/icons-material";

import { Link as RouterLink, useLocation } from "react-router-dom";
import DownloadIcon from "@mui/icons-material/Download";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import DescriptionIcon from "@mui/icons-material/Description";
import axios from "axios";

const OplFileTemplate = () => {
  const [opl, setOpl] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const location = useLocation();

  // กำหนดค่า tabValue ตามเส้นทางปัจจุบัน
  const getCurrentTabValue = () => {
    if (location.pathname === "/user/opl") return 0;
    if (location.pathname === "/user/opl/template") return 1;
    return false;
  };

  const [tabValue, setTabValue] = React.useState(getCurrentTabValue());

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    fetchOpl();
  }, []);

  const fetchOpl = async () => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.get("http://localhost:3000/opl/all", {
        ...config,
        params: { template: true },
      });

      console.log("API Response:", response.data); // ตรวจสอบข้อมูลที่ตอบกลับ

      // กรองข้อมูลเพื่อแสดงเฉพาะที่ template เป็น true
      const filteredData = response.data.filter(
        (item) => item.template === true
      );

      setOpl(
        filteredData.map((item) => ({
          ...item,
          filePath: `http://localhost:3000/uploads/opl/${item.fileName}`,
        }))
      );

      console.log("Filtered Data:", filteredData); // ตรวจสอบข้อมูลที่กรองแล้ว
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");

    if (!window.confirm("Are you sure you want to delete this course?")) {
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      await axios.delete(`http://localhost:3000/opl/delete/${id}`, config);
      console.log(`File with id ${id} deleted successfully.`);
      // Refresh the data after deletion
      fetchOpl();
    } catch (error) {
      console.error("Error deleting file: ", error);
    }
  };

  const handleDeleteClick = (id) => {
    handleDelete(id);
  };

  const handleDownload = async (file) => {
    const configForBlob = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: "blob",
    };

    const fileUrl = `http://localhost:3000/media/download/${file.id}`;
    const response = await axios.get(fileUrl, configForBlob);
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", file.fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderFileIcon = (fileType) => {
    switch (fileType) {
      case "pdf":
        return <PictureAsPdfIcon />;
      case "docx":
        return <InsertDriveFileIcon />;
      case "xlsx":
        return <DescriptionIcon />;
      default:
        return <TextSnippetIcon />;
    }
  };

  return (
    <ResponsiveDrawer>
      <Paper
        elevation={3}
        sx={{
          padding: 2,
          borderRadius: 2,
          ml: { xs: 0, lg: 2 },
          maxWidth: "1200px",
          width: "100%",
        }}
      >
        <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
          <Tabs value={tabValue} onChange={handleChangeTab}>
            <Tab label="Opl Management" component={RouterLink} to="/user/opl" />
            <Tab
              label="Opl FileTemplate"
              component={RouterLink}
              to="/user/opl/template"
            />
          </Tabs>
        </Box>

        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          sx={{ mb: 2 }}
        >
          <Typography variant="h5" sx={{ mr: "auto" }}>
            Opl Template
          </Typography>
        </Grid>

        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={8}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="タイトルで検索..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
                sx: { bgcolor: "#FFFFFF" },
              }}
            />
          </Grid>
          <Grid item xs={6} md={2}>
            <Button
              fullWidth
              variant="contained"
              sx={{ bgcolor: "#FFA800", color: "#FFFFFF", height: "100%" }}
              startIcon={<Search />}
            >
              検索
            </Button>
          </Grid>
        </Grid>

        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ minWidth: 120 }}>ファイル</TableCell>
                <TableCell sx={{ minWidth: 120 }}>タイトル</TableCell>
                <TableCell sx={{ minWidth: 120 }}>説明</TableCell>
                <TableCell sx={{ minWidth: 120 }}>更新日</TableCell>
                <TableCell sx={{ minWidth: 120 }}>作成日</TableCell>
                <TableCell align="right" sx={{ minWidth: 120 }}>
                  アクション
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? opl.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : opl
              ).map((opl) => (
                <TableRow key={opl.id}>
                  <TableCell sx={{ minWidth: 120 }}>
                    {opl.fileName.endsWith(".mp4") ||
                    opl.fileName.endsWith(".avi") ? (
                      <video
                        width="90"
                        height="70"
                        controls
                        src={opl.filePath}
                        alt={opl.title}
                      />
                    ) : opl.fileName.endsWith(".png") ||
                      opl.fileName.endsWith(".jpg") ||
                      opl.fileName.endsWith(".jpeg") ? (
                      <img
                        src={opl.filePath}
                        alt={opl.title}
                        width="90"
                        height="70"
                        style={{ cursor: "pointer" }}
                      />
                    ) : opl.fileName.endsWith(".pdf") ? (
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="left"
                      >
                        {renderFileIcon("pdf")}
                        <Typography variant="body2" sx={{ marginLeft: 1 }}>
                          {opl.fileName}
                        </Typography>
                      </Box>
                    ) : opl.fileName.endsWith(".docx") ? (
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="left"
                      >
                        {renderFileIcon("docx")}
                        <Typography variant="body2" sx={{ marginLeft: 1 }}>
                          {opl.fileName}
                        </Typography>
                      </Box>
                    ) : opl.fileName.endsWith(".xlsx") ? (
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="left"
                      >
                        {renderFileIcon("xlsx")}
                        <Typography variant="body2" sx={{ marginLeft: 1 }}>
                          {opl.fileName}
                        </Typography>
                      </Box>
                    ) : null}
                  </TableCell>
                  <TableCell sx={{ minWidth: 120 }}>{opl.title}</TableCell>
                  <TableCell sx={{ minWidth: 120 }}>
                    {opl.description}
                  </TableCell>
                  <TableCell sx={{ minWidth: 120 }}>
                    {new Date(opl.updatedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell sx={{ minWidth: 120 }}>
                    {new Date(opl.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell align="right" sx={{ minWidth: 120 }}>
                    <Box
                      display="flex"
                      justifyContent="flex-end"
                      alignItems="center"
                    >
                      <IconButton
                        color="primary"
                        onClick={() => handleDownload(opl)}
                      >
                        <DownloadIcon />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelDisplayedRows={({ from, to, count }) =>
            `${from}-${to} から ${count}`
          }
          count={opl.length}
          labelRowsPerPage="ページ :"
          rowsPerPageOptions={[5, 10, 25]}
          rowsPerPage={rowsPerPage}
        />
      </Paper>
    </ResponsiveDrawer>
  );
};

export default OplFileTemplate;
