import { Paper, Typography, Button, Container, Box } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ResponsiveDrawer from "../sidebar/SideBar";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

const QuizWatch = () => { // ลบ setHasQuestions
  const navigate = useNavigate();
  const location = useLocation();
  const { examId, examTitle } = location.state || { examId: null, examTitle: "" };

  const [questions, setQuestions] = useState([]);

  const handleEditQuestion = (index) => {
    const question = questions[index];
    navigate(`/admin/editquestionpage`, {
      state: { questionId: question.id, questionText: question.text, choices: question.choices }
    });
  };
  
  const handleDeleteQuestion = (index) => {
    console.log("Delete question at index:", index);
    const token = localStorage.getItem("token"); 
  
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    };
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      if (examId) {
        try {
          const response = await axios.get(`http://localhost:3000/exam/question/${examId}`);
          setQuestions(response.data.message);
          // setHasQuestions(response.data.message.length > 0); // ลบการใช้งาน
        } catch (error) {
          console.error("Error fetching questions:", error);
        }
      }
    };

    fetchQuestions();
  }, [examId]);

  return (
    <ResponsiveDrawer>
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ padding: 3, marginTop: 3 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h5" sx={{ marginTop: 2 }}>
              Exam Questions : {examTitle}
            </Typography>
            <Box>
              <Button
                variant="contained"
                color="primary"
                onClick={() =>
                  navigate(`/admin/problem/create-quiz`, { state: { examId } })
                }
                sx={{ marginRight: 2 }}
              >
                質問を追加する
              </Button>
              <Button
                variant="contained"
                onClick={() => navigate("/admin/problem")}
                sx={{
                  backgroundColor: "red",
                  color: "white",
                  "&:hover": { backgroundColor: "darkred" },
                }}
              >
                戻る
              </Button>
            </Box>
          </Box>

          {questions.length === 0 ? (
            <Typography variant="h6" color="textSecondary">
              No questions
            </Typography>
          ) : (
            questions.map((question, qIndex) => (
              <Box
                key={qIndex}
                marginY={2}
                padding={2}
                border={1}
                borderRadius={4}
                sx={{ position: "relative" }}
              >
                <IconButton
                  size="small"
                  sx={{ position: "absolute", top: 8, right: 40 }}
                  onClick={() => handleEditQuestion(qIndex)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  size="small"
                  sx={{ position: "absolute", top: 8, right: 8 }}
                  onClick={() => handleDeleteQuestion(qIndex)}
                >
                  <DeleteIcon />
                </IconButton>

                <Typography variant="h6">Question {qIndex + 1}</Typography>
                <Typography>Question: {question.text}</Typography>
                {question.choices.map((choice, cIndex) => (
                  <Typography key={cIndex}>
                    Choice {cIndex + 1}: {choice.text}{" "}
                    {choice.correct && "(Correct)"}
                  </Typography>
                ))}
              </Box>
            ))
          )}
        </Paper>
      </Container>
    </ResponsiveDrawer>
  );
};

export default QuizWatch;
