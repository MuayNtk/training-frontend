import { useState } from "react";
import ResponsiveDrawer from "../sidebar/SideBar";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Typography,
  Container,
  Grid,
  Paper,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from '@mui/material';
import { Link as RouterLink } from "react-router-dom";

const QuizSelect = () => {
  const [questions, setQuestions] = useState([
    { question: "", options: ["", "", "", ""] }
  ]);

  const handleQuestionChange = (index, event) => {
    const newQuestions = [...questions];
    newQuestions[index].question = event.target.value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (qIndex, oIndex, event) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[oIndex] = event.target.value;
    setQuestions(newQuestions);
  };

  const addOption = (qIndex) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options.push("");
    setQuestions(newQuestions);
  };

  const removeOption = (qIndex, oIndex) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options.splice(oIndex, 1);
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, { question: "", options: ["", "", "", ""] }]);
  };

  const removeQuestion = (qIndex) => {
    const newQuestions = [...questions];
    newQuestions.splice(qIndex, 1);
    setQuestions(newQuestions);
  };

  return (
    <ResponsiveDrawer>
      <Container>
        <Typography variant="h4" gutterBottom>
          問題集管理
        </Typography>
        {questions.map((q, qIndex) => (
          <Paper key={qIndex} style={{ marginBottom: "16px", padding: "16px" }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label={`テスト${qIndex + 1}: 正しい選択肢は何ですか？`}
                  value={q.question}
                  onChange={(e) => handleQuestionChange(qIndex, e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>オプション</TableCell>
                        <TableCell>削除</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {q.options.map((option, oIndex) => (
                        <TableRow key={oIndex}>
                          <TableCell>
                            <FormControlLabel
                              control={<Checkbox />}
                              label={
                                <TextField
                                  fullWidth
                                  placeholder={`オプション${oIndex + 1}`}
                                  value={option}
                                  onChange={(e) => handleOptionChange(qIndex, oIndex, e)}
                                />
                              }
                            />
                          </TableCell>
                          <TableCell>
                            <IconButton onClick={() => removeOption(qIndex, oIndex)}>
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
              <Grid item xs={12}>
                <Button
                  startIcon={<AddCircleOutlineIcon />}
                  onClick={() => addOption(qIndex)}
                >
                  オプションを追加する
                </Button>
              </Grid>
            </Grid>
            <Grid container justifyContent="flex-end" style={{ marginTop: "16px" }}>
              <Button
                startIcon={<DeleteIcon />}
                onClick={() => removeQuestion(qIndex)}
              >
                質問を削除する
              </Button>
            </Grid>
          </Paper>
        ))}
        <Button
          variant="contained"
          color="primary"
          onClick={addQuestion}
          style={{ marginRight: "8px" }}
        >
          質問を追加する
        </Button>
        <Button
          component={RouterLink}
            to="/admin/problem"
          variant="contained"
          color="secondary"
        >
          キャンセル
        </Button>
        <Button
          variant="contained"
          color="primary"
          style={{ marginLeft: "8px" }}
        >
          アップデート
        </Button>
      </Container>
    </ResponsiveDrawer>
  );
};

export default QuizSelect;
