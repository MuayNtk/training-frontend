import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import SideBarUser from "../sidebar/SideBarUser";
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
  InputAdornment,
  Grid,
  TablePagination,
  Typography,
  Box,
  Button,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const AttemptReview = () => {
  const [examAttempts, setExamAttempts] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchExamAttempts = async () => {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const response = await axios.get(
          "http://localhost:3000/exam/attempt/user",
          config
        );

        const attempts = response.data;

        if (!Array.isArray(attempts)) {
          console.error("Expected an array but received:", attempts);
          return;
        }

        const examPromises = attempts.map(async (attempt) => {
          return await axios.get(
            `http://localhost:3000/exam/${attempt.id}`,
            config
          );
        });

        const examsResponses = await Promise.all(examPromises);
        const exams = examsResponses.map((res) => res.data);

        const combinedData = attempts.map((attempt, index) => ({
          ...attempt,
          examTitle: exams[index]?.exam.title,
          grade: attempt.grade,
        }));

        setExamAttempts(combinedData);
      } catch (error) {
        console.error("Error fetching exam attempts:", error);
      }
    };

    fetchExamAttempts();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const filteredExamAttempts = examAttempts.filter((attempt) => {
    const userFirstName = attempt.user.firstName.toLowerCase();
    const userLastName = attempt.user.lastName.toLowerCase();
    const examTitle = attempt.examTitle.toLowerCase();
    const userId = attempt.user.userId;

    return (
      userFirstName.includes(searchTerm.toLowerCase()) ||
      userLastName.includes(searchTerm.toLowerCase()) ||
      examTitle.includes(searchTerm.toLowerCase()) ||
      userId.includes(searchTerm)
    );
  });

  return (
    <SideBarUser>
      <Paper
        elevation={3}
        sx={{
          padding: 2,
          borderRadius: 2,
          ml: { xs: 0, lg: 2 },
          mr: { xs: 4, sm: "5rem", lg: 0 },
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
            社員評価
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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#FFA800",
                color: "#FFFFFF",
                height: "100%",
                width: { xs: "40%", md: "50%" },
              }}
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
                <TableCell sx={{ minWidth: 120 }}>ユーザーID</TableCell>
                <TableCell sx={{ minWidth: 120 }}>ファーストネーム</TableCell>
                <TableCell sx={{ minWidth: 120 }}>苗字</TableCell>
                <TableCell sx={{ minWidth: 120 }}>試験タイトル</TableCell>
                <TableCell sx={{ minWidth: 120 }}>試験結果</TableCell>
                <TableCell align="right" sx={{ minWidth: 120 }}>
                  アクション
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? filteredExamAttempts.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : filteredExamAttempts
              ).map((attempt) => (
                <TableRow key={attempt.id}>
                  <TableCell sx={{ minWidth: 120 }}>
                    {attempt.user.userId}
                  </TableCell>
                  <TableCell sx={{ minWidth: 120 }}>
                    {attempt.user.firstName}
                  </TableCell>
                  <TableCell sx={{ minWidth: 120 }}>
                    {attempt.user.lastName}
                  </TableCell>
                  <TableCell sx={{ minWidth: 120 }}>
                    {attempt.examTitle}
                  </TableCell>
                  <TableCell sx={{ minWidth: 120 }}>
                    {attempt.grade} %
                  </TableCell>
                  <TableCell align="right" sx={{ minWidth: 120 }}>
                    <Box
                      display="flex"
                      justifyContent="flex-end"
                      alignItems="center"
                    >
                      <IconButton color="warning">
                        <EditIcon />
                      </IconButton>
                      <IconButton color="error">
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
            `${from}-${to} of ${count}`
          }
          count={filteredExamAttempts.length}
          labelRowsPerPage="ページ :"
          rowsPerPageOptions={[5, 10, 25, 50]}
          rowsPerPage={rowsPerPage}
        />
      </Paper>
    </SideBarUser>
  );
};

export default AttemptReview;
