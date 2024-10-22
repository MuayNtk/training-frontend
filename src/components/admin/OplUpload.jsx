import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import axios from "axios";
import ResponsiveDrawer from "../sidebar/SideBar";
import { useNavigate } from "react-router-dom";

const OplUpload = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fileName, setFileName] = useState(null);
  const [message, setMessage] = useState("");
  const [isTemplateChecked, setIsTemplateChecked] = useState(false);

  const navigate = useNavigate();

  const handleTitleChange = (event) => setTitle(event.target.value);
  const handleDescChange = (event) => setDescription(event.target.value);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    const allowedTypes =
      /mp4|mkv|avi|mov|jpg|jpeg|png|gif|pdf|doc|docx|xls|xlsx|ppt|pptx/;

    if (selectedFile && allowedTypes.test(selectedFile.type)) {
      setFileName(selectedFile);
      setMessage("");
    } else {
      setFileName(null);
      setMessage("Invalid file type. Please select a valid file.");
    }
  };

  const handleCheckboxChange = (event) => {
    console.log("Checkbox checked:", event.target.checked); 
    setIsTemplateChecked(event.target.checked);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log("Submitting form with template:", isTemplateChecked);

    if (!fileName) {

      setMessage("Please select a file to upload.");
      return;
  }

    const token = localStorage.getItem("token");
    const config = { headers: { Authorization: `Bearer ${token}` } };

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("file", fileName);

    formData.append("template", isTemplateChecked ? "true" : "false");

    try {
      const response = await axios.post(
        "http://localhost:3000/opl/upload",
        formData,
        config
      );

      setMessage(response.data.message);
      setTitle("");
      setDescription("");
      setFileName(null);
      setIsTemplateChecked(false); // Reset checkbox state

      navigate("/admin/lesson-management");
  } catch (error) {
      console.error("Error uploading file:", error);
      setMessage("Unable to upload file. Please try again.");
  }
};

  const handleCancel = () => navigate("/admin/lesson-management");

  return (
    <ResponsiveDrawer>
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ padding: 3, marginTop: 3 }}>
          <Typography variant="h5" component="h1" gutterBottom>
            Opl Upload
          </Typography>
          <form onSubmit={handleSubmit}>
            
            <TextField
              size="small"
              label="タイトル"
              fullWidth
              variant="outlined"
              margin="normal"
              onChange={handleTitleChange}
              value={title}
            />
            <Box sx={{ border: "1px dashed grey", padding: 2, textAlign: "center", marginBottom: 2 }}>
              <input
                accept=".jpg,.jpeg,.png,.gif,.bmp,.mov,.mp4,.avi,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                style={{ display: "none" }}
                id="file-upload-1"
                type="file"
                onChange={handleFileChange}
              />
              <label htmlFor="file-upload-1">
                <Button variant="contained" component="span">
                  画像・動画 (.jpg, .mov, .File, .excel)
                </Button>
              </label>
              {fileName && (
                <Typography variant="body2">{fileName.name}</Typography>
              )}
            </Box>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isTemplateChecked}
                  onChange={handleCheckboxChange}
                />
              }
              label="このファイルをファイルテンプレートとしてアップロードしますか？"
            />
            <TextField
              size="small"
              label="説明"
              fullWidth
              variant="outlined"
              margin="normal"
              multiline
              rows={4}
              onChange={handleDescChange}
              value={description}
            />
            <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 2 }}>
              ビデオおよびすべての音楽と画像を使用する権利を私が所有していることを確認してください。ビデオが不適切な言語、画像、音声が含まれていないことを確認してください。
            </Typography>
            <Box display="flex" justifyContent="right">
              <Button type="submit" variant="contained" color="primary">提出する</Button>
              <Button variant="contained" color="error" onClick={handleCancel} sx={{ marginLeft: 2 }}>キャンセル</Button>
            </Box>
            {message && <Typography color="error">{message}</Typography>}
          </form>
        </Paper>
      </Container>
    </ResponsiveDrawer>
  );
};

export default OplUpload;
