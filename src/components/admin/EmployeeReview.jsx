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
  TextField,
  InputAdornment,
  Grid,
  TablePagination,
  Typography,
  Button,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import Checkbox from "@mui/material/Checkbox";

const EmployeeReview = () => {
  const [examAttempts, setExamAttempts] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchExamAttempts = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const response = await axios.get(
          "http://localhost:3000/exam/attempt/all",
          config
        );

        const attempts = response.data.attempts;

        if (!Array.isArray(attempts)) {
          console.error("Expected an array but received:", attempts);
          return;
        }

        // console.log("Fetched exam attempts:", attempts);

        const examPromises = attempts.map(async (attempt) => {
          // console.log(`Fetching exam for attempt ID: ${attempt.id}`);
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
          answers: exams[index]?.answers || [],
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
    <ResponsiveDrawer>
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
                <TableCell align="center" sx={{ minWidth: 80 }}>
                  No.
                </TableCell>
                <TableCell align="center" sx={{ minWidth: 80 }}>
                  所属部署
                </TableCell>
                <TableCell align="center" sx={{ minWidth: 80 }}>
                  氏名
                </TableCell>
                <TableCell align="center" sx={{ minWidth: 80 }}>
                  1
                </TableCell>
                <TableCell align="center" sx={{ minWidth: 80 }}>
                  2
                </TableCell>
                <TableCell align="center" sx={{ minWidth: 80 }}>
                  3
                </TableCell>
                <TableCell align="center" sx={{ minWidth: 80 }}>
                  4
                </TableCell>
                <TableCell align="center" sx={{ minWidth: 80 }}>
                  5
                </TableCell>
                <TableCell align="center" sx={{ minWidth: 80 }}>
                  6
                </TableCell>
                <TableCell align="center" sx={{ minWidth: 80 }}>
                  7
                </TableCell>
                <TableCell align="center" sx={{ minWidth: 80 }}>
                  8
                </TableCell>
                <TableCell align="center" sx={{ minWidth: 80 }}>
                  9
                </TableCell>
                <TableCell align="center" sx={{ minWidth: 80 }}>
                  10
                </TableCell>
                <TableCell align="center" sx={{ minWidth: 80 }}>
                  11
                </TableCell>
                <TableCell align="center" sx={{ minWidth: 80 }}>
                  12
                </TableCell>
                <TableCell align="center" sx={{ minWidth: 80 }}>
                  13
                </TableCell>
                <TableCell align="center" sx={{ minWidth: 80 }}>
                  14
                </TableCell>
                <TableCell align="center" sx={{ minWidth: 80 }}>
                  15
                </TableCell>
                <TableCell align="center" sx={{ minWidth: 80 }}>
                  16
                </TableCell>
                <TableCell align="center" sx={{ minWidth: 80 }}>
                  17
                </TableCell>
                <TableCell align="center" sx={{ minWidth: 80 }}>
                  18
                </TableCell>
                <TableCell align="center" sx={{ minWidth: 80 }}>
                  19
                </TableCell>
                <TableCell align="center" sx={{ minWidth: 80 }}>
                  20
                </TableCell>
                <TableCell align="center" sx={{ minWidth: 80 }}>
                  合計点
                </TableCell>
                <TableCell align="center" sx={{ minWidth: 80 }}>
                  評価点
                </TableCell>
                <TableCell align="center" sx={{ minWidth: 80 }}>
                  評価
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(filteredExamAttempts) &&
              filteredExamAttempts.length > 0 ? (
                (rowsPerPage > 0
                  ? filteredExamAttempts.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : filteredExamAttempts
                ).map((attempt, index) => {
                  const correctAnswersCount = Array.isArray(attempt.answers)
                    ? attempt.answers.filter((answer) => answer.isCorrect)
                        .length
                    : 0;

                  const getGrade = (grade) => {
                    if (grade >= 0 && grade <= 39) return "D";
                    if (grade >= 40 && grade <= 69) return "C";
                    if (grade >= 70 && grade <= 79) return "B-";
                    if (grade >= 80 && grade <= 84) return "B";
                    if (grade >= 85 && grade <= 89) return "B+";
                    if (grade >= 90 && grade <= 95) return "A";
                    if (grade >= 96 && grade <= 100) return "S";
                    return "N/A";
                  };

                  const totalAnswersCount = Array.isArray(attempt.answers)
                    ? attempt.answers.length
                    : 0;

                  const percentage =
                    totalAnswersCount > 0
                      ? (
                          (correctAnswersCount / totalAnswersCount) *
                          100
                        ).toFixed(2) // คำนวณเปอร์เซ็นต์และปัดเศษให้เป็นทศนิยม 2 ตำแหน่ง
                      : 0;

                  return (
                    <TableRow key={`${attempt.userId}-${attempt.examId}`}>
                      <TableCell sx={{ minWidth: 50 }} align="center">
                        {page * rowsPerPage + index + 1}
                      </TableCell>
                      <TableCell sx={{ minWidth: 90 }} align="center">
                        {attempt?.user?.department?.departmentName || "N/A"}
                      </TableCell>
                      <TableCell sx={{ minWidth: 250 }} align="center">
                        {`${attempt?.user?.firstName || ""}\u00A0\u00A0\u00A0 ${
                          attempt?.user?.lastName || ""
                        }`}
                      </TableCell>
                      {Array.isArray(attempt.answers) &&
                      attempt.answers.length > 0 ? (
                        attempt.answers.map((answer, answerIndex) => (
                          <TableCell
                            align="center"
                            key={answerIndex}
                            sx={{ minWidth: 70 }}
                          >
                            <Checkbox checked={answer?.isCorrect || false} />
                          </TableCell>
                        ))
                      ) : (
                        <TableCell align="center" colSpan={6}>
                          No answers available
                        </TableCell>
                      )}
                      <TableCell align="center" sx={{ minWidth: 90 }}>
                        {percentage}
                      </TableCell>
                      <TableCell sx={{ minWidth: 120 }} align="center">
                        {getGrade(attempt.grade) || "N/A"}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{ minWidth: 90 }}
                      ></TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    No data available
                  </TableCell>
                </TableRow>
              )}
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
    </ResponsiveDrawer>
  );
};

export default EmployeeReview;
