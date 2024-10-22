import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SideBarUser from "../sidebar/SideBarUser";
import {
  Typography,
  Container,
  Card,
  CardContent,
  CardActions,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
} from "@mui/material";
import axios from "axios";

const QuizDo = () => {
  const { examId, attemptId } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showIncompleteDialog, setShowIncompleteDialog] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/exam/question/${examId}`
        );
        setQuestions(response.data.message);
        setAnswers(
          response.data.message.map((q) => ({
            questionId: q.id,
            selectedChoiceId: null,
          }))
        );
      } catch (err) {
        setError("Error fetching questions");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [examId]);

  const handleOptionChange = (qIndex, selectedChoiceId) => {
    setAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      newAnswers[qIndex] = {
        ...newAnswers[qIndex],
        selectedChoiceId: Number(selectedChoiceId),
      };
      return newAnswers;
    });
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");

    if (!attemptId) {
      console.error("Attempt ID is undefined");
      setError("Error: No attempt ID found");
      return;
    }

    const allAnswered = answers.every(
      (answer) => answer.selectedChoiceId !== null
    );
    if (!allAnswered) {
      setShowIncompleteDialog(true); 
      return;
    }

    try {
      console.log("Submitting exam with attemptId:", attemptId);
      const response = await axios.post(
        `http://localhost:3000/exam/${attemptId}/submit`,
        { answers },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Exam submitted successfully:", response.data);
      setError(null);
      setShowSuccessAlert(true); 

      navigate("/user/quiz-list", {
        state: { successMessage: "試験は送信されました。" },
      });
    } catch (err) {
      console.error(
        "Error submitting exam:",
        err.response ? err.response.data : err.message
      );
      setError("Error submitting exam");
    } finally {
      setOpenDialog(false);
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleCancel = async () => {
    const token = localStorage.getItem("token");

    const confirmation = window.confirm(
      "คุณแน่ใจหรือไม่ที่จะยกเลิก? คำตอบของคุณจะถูกลบและไม่สามารถกู้คืนได้"
    );

    if (!confirmation) {
      return;
    }

    try {
      console.log("Attempting to cancel quiz with attemptId:", attemptId);
      const response = await axios.delete(
        `http://localhost:3000/exam/${attemptId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Quiz attempt cancelled:", response.data);
      navigate("/user/quiz-list");
    } catch (err) {
      console.error(
        "Error cancelling quiz:",
        err.response ? err.response.data : err.message
      );
      setError(
        "Error cancelling quiz: " + (err.response?.data?.message || err.message)
      );
    }
  };

  if (loading) return <Typography variant="h6">Loading...</Typography>;

  if (error)
    return (
      <Typography variant="h6" color="error">
        {error}
      </Typography>
    );

  return (
    <SideBarUser>
      <Container maxWidth="md">
        <Typography variant="h4" sx={{ mb: 4, textAlign: "center" }}>
          クイズフォーム
        </Typography>

        {showSuccessAlert && (
          <Alert severity="success" onClose={() => setShowSuccessAlert(false)}>
            ส่งคำตอบสำเร็จ!
          </Alert>
        )}

        {questions.map((question, qIndex) => (
          <Card key={qIndex} sx={{ mb: 2 }}>
            <CardContent>
              <Typography>
                Question {qIndex + 1}: {question.text}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <FormControl component="fieldset">
                <RadioGroup
                  value={answers[qIndex]?.selectedChoiceId || ""}
                  onChange={(e) => handleOptionChange(qIndex, e.target.value)}
                >
                  {question.choices.map((choice) => (
                    <FormControlLabel
                      key={choice.id}
                      value={choice.id.toString()}
                      control={<Radio />}
                      label={choice.text}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </CardContent>
          </Card>
        ))}

        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button color="error" variant="contained" onClick={handleCancel}>
            キャンセル
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenDialog}
          >
            アップデート
          </Button>
        </CardActions>
      </Container>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>回答の送信を確認する</DialogTitle>
        <DialogContent>
          <Alert severity="warning">
            回答を送信したら応答を送信してもよろしいですか?編集することはできません。
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="error" variant="contained">
            キャンセル
          </Button>
          <Button onClick={handleSubmit} color="primary" variant="contained">
            確認する
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={showIncompleteDialog}
        onClose={() => setShowIncompleteDialog(false)}
      >
        <DialogTitle>警告</DialogTitle>
        <DialogContent>
          <Typography variant="body1">すべての回答を選択してください。</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setShowIncompleteDialog(false)}
            color="primary"
          >
            同意する
          </Button>
        </DialogActions>
      </Dialog>
    </SideBarUser>
  );
};

export default QuizDo;
