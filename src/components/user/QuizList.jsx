import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBarUser from "../sidebar/SideBarUser";
import {
  Typography,
  Container,
  Card,
  CardContent,
  CardActions,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Collapse,
} from "@mui/material";
import axios from "axios";
import { useLocation } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

const QuizList = () => {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedExamId, setSelectedExamId] = useState(null);
  const [completedExams, setCompletedExams] = useState(new Set());
  const navigate = useNavigate();
  const location = useLocation();
  const [showSuccessMessage, setShowSuccessMessage] = useState(true);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/Exam/get-all-exam"
        );
        setExams(response.data.message);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchExams();
  }, []);

  useEffect(() => {
    if (showSuccessMessage) {
      const timer = setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessMessage]);

  const handleStartQuiz = (examId) => {
    setSelectedExamId(examId);
    setOpenDialog(true);
  };

  const handleConfirmStart = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        `http://localhost:3000/exam/${selectedExamId}/attempts`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const attemptId = response.data.data.id;
      console.log(response.data);

      setCompletedExams((prev) => new Set(prev).add(selectedExamId));

      navigate(`/user/quiz-do/${selectedExamId}/${attemptId}`);
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
    } finally {
      setOpenDialog(false);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const successMessage = location.state?.successMessage;

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error: {error}</Typography>;
  }

  return (
    <SideBarUser>
      <Container maxWidth="md">
        <Typography variant="h4" sx={{ mb: 4, textAlign: "center" }}>
          クイズの選択
        </Typography>
        <Collapse in={showSuccessMessage}>
          {successMessage && (
            <Alert
              severity="success"
              sx={{ mb: 2 }}
              action={
                <IconButton
                  color="inherit"
                  onClick={() => setShowSuccessMessage(false)}
                  aria-label="close"
                >
                  <CloseIcon />
                </IconButton>
              }
            >
              {successMessage}
            </Alert>
          )}
        </Collapse>

        {exams.map((exam) => (
          <Card key={exam.id} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6">{exam.title}</Typography>
              <Typography variant="body2" color="textSecondary">
                {exam.description}
              </Typography>
            </CardContent>
            <CardActions>
              {completedExams.has(exam.id) ? (
                <Button variant="contained" disabled>
                  Completed
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleStartQuiz(exam.id)}
                >
                  Start Quiz
                </Button>
              )}
            </CardActions>
          </Card>
        ))}
      </Container>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>試験の開始を確認する?</DialogTitle>
        <DialogContent>
          <Alert severity="warning">
            試験を完了してください。早めに退室した場合は試験を続行できません。
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="error" variant="contained">
            キャンセル
          </Button>
          <Button
            onClick={handleConfirmStart}
            color="primary"
            variant="contained"
          >
            確認する
          </Button>
        </DialogActions>
      </Dialog>
    </SideBarUser>
  );
};

export default QuizList;
