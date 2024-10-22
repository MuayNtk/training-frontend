import {
  Paper,
  Typography,
  TextField,
  Button,
  Container,
  Box,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import ResponsiveDrawer from "../sidebar/SideBar";
import axios from "axios";

const CreateQuiz = () => {
  const navigate = useNavigate();

  const [filepath, setFilepath] = useState("");
  const [questions, setQuestions] = useState([
    {
      text: "", // Question text
      choices: [
        { text: "", correct: false }, // Each question has multiple choices
        { text: "", correct: false },
        { text: "", correct: false },
        { text: "", correct: false },
      ],
    },
  ]);

  // Handle change in question text
  const handleQuestionChange = (index, event) => {
    const newQuestions = [...questions];
    newQuestions[index].text = event.target.value;
    setQuestions(newQuestions);
  };

  // Handle change in choice text
  const handleChoiceChange = (qIndex, cIndex, event) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].choices[cIndex].text = event.target.value;
    setQuestions(newQuestions);
  };

  // Handle change for correct choice
  const handleCorrectChange = (qIndex, cIndex) => {
    const newQuestions = [...questions];
    // Mark the selected choice as correct and others as false
    newQuestions[qIndex].choices.forEach((choice, index) => {
      newQuestions[qIndex].choices[index].correct = index === cIndex;
    });
    setQuestions(newQuestions);
  };

  // Add a new question
  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        text: "", // New question text
        choices: [
          { text: "", correct: false }, // New question has 4 empty choices
          { text: "", correct: false },
          { text: "", correct: false },
          { text: "", correct: false },
        ],
      },
    ]);
  };

  // Remove a question
  const removeQuestion = (index) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1); // Remove the question at index
    setQuestions(newQuestions);
  };

  // Handle form submission (for example, you can send the questions to an API)

  const location = useLocation();
  const { examId } = location.state || { examId: null }; // Get examId from state

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const questTemp = [...questions];
    const editedQuest = questTemp.map((question) => ({
      question: {
        examId: examId,
        text: question.text,
        choice: question.choices,
      },
    }));

    try {
      const createQuestion = await axios.post(
        "http://localhost:3000/exam/question",
        editedQuest,
        config
      );
      alert("Questions submitted!");
      // Navigate back to QuizWatch with examId and examTitle
      navigate(`/admin/quizwatch`, { state: { examId } });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <ResponsiveDrawer>
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ padding: 3, marginTop: 3 }}>
          <Box>
            <Typography variant="h4" gutterBottom>
              Create Exam Questions
            </Typography>

            {/* Dynamic question fields */}
            {questions?.map((question, qIndex) => (
              <Box
                key={qIndex}
                marginY={2}
                padding={2}
                border={1}
                borderRadius={4}
              >
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="h6">Question {qIndex + 1}</Typography>
                  <IconButton onClick={() => removeQuestion(qIndex)}>
                    <RemoveIcon />
                  </IconButton>
                </Box>
                <TextField
                  fullWidth
                  label="Question Text"
                  value={question.text}
                  onChange={(e) => handleQuestionChange(qIndex, e)}
                  margin="normal"
                />

                {/* Choices for the question */}
                {question?.choices?.map((choice, cIndex) => (
                  <Box
                    key={cIndex}
                    display="flex"
                    alignItems="center"
                    marginBottom={1}
                  >
                    <TextField
                      fullWidth
                      label={`Choice ${cIndex + 1}`}
                      value={choice.text}
                      onChange={(e) => handleChoiceChange(qIndex, cIndex, e)}
                      margin="normal"
                    />
                    <Button
                      // variant={choice.correct ? "contained" : "outlined"}
                      // color={choice.correct ? "primary" : "default"}
                      onClick={() => handleCorrectChange(qIndex, cIndex)}
                    >
                      {choice.correct ? "Correct" : "Mark as Correct"}
                    </Button>
                  </Box>
                ))}
              </Box>
            ))}

            {/* Add Question Button */}
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={addQuestion}
            >
              Add New Question
            </Button>


            {/* Submit Button */}
            <Box marginTop={4}>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleSubmit}
              >
                Submit Questions
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </ResponsiveDrawer>
  );
};

export default CreateQuiz;
