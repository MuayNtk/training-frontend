import { useState, useEffect } from "react";
import axios from "axios";
import ResponsiveDrawer from "../sidebar/SideBar";
import {
  Paper,
  TextField,
  Button,
  InputAdornment,
  Grid,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

const EnrollUser = () => {
  const [editingCourse, setEditingCourse] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [enrollments, setEnrollments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchEnrollmentsUsersAndCourses = async () => {
      try {
        const enrollResponse = await axios.get(
          "http://localhost:3000/enrollments/all",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const usersResponse = await axios.get(
          "http://localhost:3000/auth/users",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const coursesResponse = await axios.get(
          "http://localhost:3000/courses/all-courses",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const enrollmentsData = enrollResponse.data.enrollment;
        const usersData = usersResponse.data;
        const coursesData = coursesResponse.data.course;

        const combinedData = enrollmentsData.map((enroll) => {
          const user = usersData.find((user) => user.id === enroll.userId);
          const course = coursesData.find(
            (course) => course.id === enroll.courseId
          );

          return {
            ...enroll,
            firstName: user ? user.firstName : "不明",
            lastName: user ? user.lastName : "ユーザー",
            courseTitle: course ? course.title : "不明なコース",
          };
        });

        setEnrollments(combinedData);
        setCourses(coursesData);
      } catch (error) {
        setError("登録またはユーザーの取得に失敗しました");
        console.error(error);
      }
    };
    fetchEnrollmentsUsersAndCourses();
  }, []);

  const handleEditClick = (course) => {
    setEditingCourse(course);
    setIsEditDialogOpen(true);
  };

  const handleEditSave = () => {
    setIsEditDialogOpen(false);
    setEditingCourse(null);
  };

  const handleEnrollCreate = () => {
    navigate("/admin/enrollCreate");
  };

  const filteredEnrollments = enrollments.filter(
    (enroll) =>
      enroll.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enroll.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enroll.courseTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          sx={{ mb: 2 }}
        >
          <Typography variant="h5" sx={{ mr: "auto" }}>
            Enroll
          </Typography>
          <Button
            variant="contained"
            sx={{ bgcolor: "#3D386A", color: "#E0E0E0" }}
            startIcon={<AddIcon />}
            onClick={handleEnrollCreate}
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
         
        </Grid>

        <TableContainer component={Paper} sx={{ mt: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ textAlign: "left" }}>
                  ファーストネーム
                </TableCell>
                <TableCell sx={{ textAlign: "left" }}>苗字</TableCell>
                <TableCell sx={{ textAlign: "center" }}>コース名</TableCell>
                <TableCell sx={{ textAlign: "center" }}>進捗 </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  すでにダウンロード済み
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredEnrollments
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((enroll) => (
                  <TableRow key={enroll.id}>
                    <TableCell sx={{ textAlign: "left" }}>
                      {enroll.firstName}
                    </TableCell>
                    <TableCell sx={{ textAlign: "left" }}>
                      {enroll.lastName}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {enroll.courseTitle}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {enroll.progress}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {enroll.isDownloaded}
                    </TableCell>
                    
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredEnrollments.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(event, newPage) => setPage(newPage)}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="ページあたりの行数"
          labelDisplayedRows={({ from, to, count }) =>
            `${from}–${to} / ${count}`
          }
        />
      </Paper>

      <Dialog
        open={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
      >
        <DialogTitle>問題を編集する</DialogTitle>
        <DialogContent>
          <TextField
            label="タイトル"
            variant="outlined"
            fullWidth
            value={editingCourse?.title || ""}
            onChange={(e) =>
              setEditingCourse({ ...editingCourse, title: e.target.value })
            }
            sx={{ mb: 2 }}
          />
          <TextField
            label="説明"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={editingCourse?.description || ""}
            onChange={(e) =>
              setEditingCourse({
                ...editingCourse,
                description: e.target.value,
              })
            }
            sx={{ mb: 2 }}
          />
          <TextField
            label="コースID"
            variant="outlined"
            fullWidth
            value={editingCourse?.courseId || ""}
            onChange={(e) =>
              setEditingCourse({ ...editingCourse, courseId: e.target.value })
            }
            sx={{ mb: 2 }}
            InputProps={{ readOnly: true }}
            disabled
          />
          {error && <Typography color="error">{error}</Typography>}
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

export default EnrollUser;
