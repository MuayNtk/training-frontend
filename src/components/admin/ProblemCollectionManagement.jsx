import { useState, useEffect } from "react";
import axios from "axios";
import ResponsiveDrawer from "../sidebar/SideBar";
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link as RouterLink } from "react-router-dom";
import QuizIcon from "@mui/icons-material/Quiz";
import VisibilityIcon from "@mui/icons-material/Visibility";

const ProblemCollectionManagement = () => {
  const [companies, setCompanies] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [editingCompany, setEditingCompany] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/Exam/get-all-exam"
      );
      setCompanies(response.data.message);
    } catch (error) {
      console.error("Error fetching exams:", error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleEditClick = (company) => {
    setEditingCompany(company);
    setIsEditDialogOpen(true);
  };

  const handleEditSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:3000/Exam/edit-exam/${editingCompany.id}`,
        {
          title: editingCompany.title,
          description: editingCompany.description,
          departmentId: editingCompany.departmentId,
          courseId: editingCompany.courseId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update the companies list with the new data
      setCompanies(
        companies.map((company) =>
          company.id === editingCompany.id ? response.data.message : company
        )
      );

      setIsEditDialogOpen(false);
      setEditingCompany(null);
    } catch (error) {
      console.error("Error editing the exam:", error);
      setError(error.response?.data.message || "An error occurred"); // Handle error state
    }
  };

  const handleDeleteClick = async (id) => {
    const token = localStorage.getItem("token");
  
    if (window.confirm("คุณแน่ใจหรือว่าต้องการลบ?")) { // Confirm deletion
      try {
        const response = await axios.delete(
          `http://localhost:3000/Exam/delete-exam/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        // Remove the deleted company from the state
        setCompanies(companies.filter((company) => company.id !== id));
        console.log("ลบการสอบ:", response.data.message);
      } catch (error) {
        console.error("เกิดข้อผิดพลาดในการลบการสอบ:", error);
        setError(error.response?.data.message || "เกิดข้อผิดพลาด");
      }
    }
  };

  const filteredCompanies = companies.filter((company) =>
    company.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          sx={{ mb: 2 }}
        >
          <Typography variant="h5" sx={{ mr: "auto" }}>
            問題集管理
          </Typography>
          <Button
            component={RouterLink}
            to="/admin/problem/create-exam"
            variant="contained"
            sx={{ bgcolor: "#3D386A", color: "#E0E0E0" }}
            startIcon={<AddIcon />}
          >
            作成済み
          </Button>
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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
                <TableCell sx={{ minWidth: 120 }}>タイトル</TableCell>
                <TableCell sx={{ minWidth: 200 }}>説明</TableCell>
                <TableCell sx={{ minWidth: 120 }}>部署</TableCell>
                <TableCell sx={{ minWidth: 120 }}>コースID</TableCell>
                <TableCell sx={{ minWidth: 150 }}>作成日</TableCell>
                <TableCell sx={{ minWidth: 150 }}>更新日</TableCell>
                <TableCell align="center" sx={{ minWidth: 120 }}>
                  アクション
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? filteredCompanies.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : filteredCompanies
              ).map((company) => (
                <TableRow key={company.id}>
                  <TableCell sx={{ minWidth: 120 }}>{company.title}</TableCell>
                  <TableCell sx={{ minWidth: 200 }}>
                    {company.description}
                  </TableCell>
                  <TableCell sx={{ minWidth: 120 }}>
                    {company.departmentId}
                  </TableCell>
                  <TableCell sx={{ minWidth: 120 }}>
                    {company.courseId}
                  </TableCell>
                  <TableCell sx={{ minWidth: 150 }}>
                    {new Date(company.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell sx={{ minWidth: 150 }}>
                    {new Date(company.updatedAt).toLocaleString()}
                  </TableCell>

                  <TableCell align="right" sx={{ minWidth: 120 }}>
                    <Box
                      display="flex"
                      justifyContent="flex-end"
                      alignItems="center"
                    >
                      <IconButton
                        color="inherit"
                        component={RouterLink}
                        to="/admin/quizwatch"
                        state={{ examId: company.id, examTitle: company.title }} // ส่งค่า examTitle ไปด้วย
                      >
                        <QuizIcon sx={{ color: "#A3C1DA" }} />
                      </IconButton>
                      <IconButton
                        color="success"
                        onClick={() => handleEditClick(company)}
                      >
                        <EditIcon sx={{ color: "orange" }} />{" "}
                        {/* Change color to orange */}
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleDeleteClick(company.id)} 
                      >
                        <DeleteIcon />
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
          count={filteredCompanies.length}
          labelRowsPerPage="ページ :"
          rowsPerPageOptions={[1, 2, 3, 4, 5, 6, 7, 8]}
          rowsPerPage={rowsPerPage}
          nextIconButtonProps={{ "aria-label": "次へ" }}
          backIconButtonProps={{ "aria-label": "前へ" }}
        />
      </Paper>

      {/* Edit Dialog */}
      <Dialog
        open={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
      >
        <DialogTitle>問題を編集する</DialogTitle> {/* Updated title */}
        <DialogContent>
          <TextField
            label="タイトル"
            variant="outlined"
            fullWidth
            value={editingCompany?.title || ""}
            onChange={(e) =>
              setEditingCompany({ ...editingCompany, title: e.target.value })
            }
            sx={{ mb: 2 }}
          />
          <TextField
            label="説明"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={editingCompany?.description || ""}
            onChange={(e) =>
              setEditingCompany({
                ...editingCompany,
                description: e.target.value,
              })
            }
            sx={{ mb: 2 }}
          />
          <TextField
            label="部署"
            variant="outlined"
            fullWidth
            value={editingCompany?.departmentId || ""}
            onChange={(e) =>
              setEditingCompany({
                ...editingCompany,
                departmentId: e.target.value,
              })
            }
            sx={{ mb: 2 }}
          />
          <TextField
            label="コースID"
            variant="outlined"
            fullWidth
            value={editingCompany?.courseId || ""}
            onChange={(e) =>
              setEditingCompany({ ...editingCompany, courseId: e.target.value })
            }
            sx={{ mb: 2 }}
            InputProps={{
              readOnly: true,
            }}
            disabled
          />
          {error && <Typography color="error">{error}</Typography>}{" "}
          {/* Display error */}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsEditDialogOpen(false)}>キャンセル</Button>
          <Button onClick={handleEditSave} variant="contained" color="primary">
            保存
          </Button>
        </DialogActions>
      </Dialog>
    </ResponsiveDrawer>
  );
};

export default ProblemCollectionManagement;
