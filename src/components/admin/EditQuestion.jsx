import {
  Paper,
  Typography,
  TextField,
  Button,
  Container,
  Box,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ResponsiveDrawer from "../sidebar/SideBar";
import axios from "axios";

const EditQuestion = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { questionId, questionText, choices } = location.state;

  // Initialize state with the passed question text and choices
  const [text, setText] = useState(questionText);
  const [choiceList, setChoiceList] = useState(
    choices.map((choice) => ({
      text: choice.text,
      correct: choice.correct, // Include correct option status
    }))
  );

  const handleUpdate = async () => {
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Include JWT in Authorization header
      },
    };

    const updatedChoices = choiceList.map((choice, index) => ({
      id: choices[index].id, // เพิ่ม ID ของตัวเลือก
      text: choice.text,
      correct: choice.correct,
    }));

    try {
      const response = await axios.put(
        `http://localhost:3000/exam/question/${questionId}`,
        {
          text,
          choices: updatedChoices, // ส่งข้อมูลตัวเลือกที่อัปเดต
        },
        config
      );
      console.log("Question updated:", response.data);
      navigate(-1);
    } catch (error) {
      console.error(
        "Error updating question:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <ResponsiveDrawer>
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ padding: 3, marginTop: 3 }}>
          <Box>
            <Typography variant="h4" gutterBottom>
              Edit Exam Questions
            </Typography>

            <Box marginY={2} padding={2} border={1} borderRadius={4}>
              <TextField
                fullWidth
                label="Question Text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                margin="normal"
              />
              {choiceList.map((choice, index) => (
                <Box
                  key={index}
                  display="flex"
                  alignItems="center"
                  marginBottom={1}
                >
                  <TextField
                    fullWidth
                    label={`Choice ${index + 1}`}
                    value={choice.text}
                    onChange={(e) => {
                      const newChoices = [...choiceList];
                      newChoices[index].text = e.target.value;
                      setChoiceList(newChoices);
                    }}
                    margin="normal"
                  />
                  <Button
                    onClick={() => {
                      // Set correct status for the selected choice and reset others
                      const newChoices = choiceList.map((c, i) => ({
                        ...c,
                        correct: i === index, // Set correct for selected index, false for others
                      }));
                      setChoiceList(newChoices);
                    }}
                  >
                    {choice.correct ? "Correct" : "Mark as Correct"}
                  </Button>
                </Box>
              ))}
            </Box>

            {/* Submit Button */}
            <Box marginTop={4}>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleUpdate}
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

export default EditQuestion;
