import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Paper,
} from "@mui/material";
import axios from "axios";

import ResponsiveDrawer from "../sidebar/SideBar";
import { useNavigate } from "react-router-dom";

export default function LessonCreate() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [FileUrl, setFileUrl] = useState("");
  const [course, setCourse] = useState("");
  const [filePath, setFilePath] = useState("");

  const navigate = useNavigate();

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleDescChange = (event) => {
    setDescription(event.target.value);
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFileUrl(file);
    // if (file) {
    //   const uploadDate = new Date().toLocaleDateString();
    //   setFileUrl((prevFiles) => [
    //     ...prevFiles,
    //     { id: prevFiles.length + 1, name: file.name, uploadDate },
    //   ]);
    // }
  };
  const handleSubmitForm = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem("token");

    const formData = new FormData();
    if (FileUrl instanceof File) {
      formData.append("file", FileUrl);
    } else {
      formData.append("file", String(FileUrl));
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Include JWT in Authorization header
      },
    };
    const courseData = {
      title: title,
      description: description,
    };

    try {
      const createCourseResponse = await axios.post(
        "http://localhost:3000/courses/create-courses?typeId=1",
        courseData,
        config
      );

      const courseId = parseInt(createCourseResponse.data.course.id);
      setCourse(courseId + 1);
      formData.append("courseId", courseId);

      const uploadFileResponse = await axios.post(
        "http://localhost:3000/media/upload",
        formData,
        config
      );
      const filePath = uploadFileResponse.data.filePath;
      setFilePath(filePath);

      const updateCourseResponse = await axios.put(
        `http://localhost:3000/courses/update/${courseId}`,
        {
          title: title,
          description: description,
          pdfUrl: filePath,
          videoUrl: filePath,
        },
        config
      );

      console.log(updateCourseResponse.data.course);
      alert(`Create course complete (id: ${courseId})`);

      navigate("/admin/dashboard-management/");
    } catch (error) {
      console.error("An error occurred:", error);
      alert("An error occurred during the course creation process.");
    }
  };

  const handleCancel = () => {
    navigate("/admin/dashboard-management");
  };

  return (
    <ResponsiveDrawer>
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ padding: 3, marginTop: 3 }}>
          <Typography variant="h5" component="h1" gutterBottom>
            教育内容管理
          </Typography>
          <form onSubmit={handleSubmitForm}>
            <TextField
              size="small"
              label="タイトル"
              fullWidth
              variant="outlined"
              margin="normal"
              onChange={handleTitleChange}
            />
            <Box
              sx={{
                border: "1px dashed grey",
                padding: 2,
                textAlign: "center",
                marginBottom: 2,
              }}
            >
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
              {FileUrl && (
                <Typography variant="body2">{FileUrl.name}</Typography>
              )}
            </Box>
            <TextField
              size="small"
              label="説明"
              fullWidth
              variant="outlined"
              margin="normal"
              multiline
              rows={4}
              onChange={handleDescChange}
            />
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{ marginBottom: 2 }}
            >
              ビデオおよびすべての音楽と画像を使用する権利を私が所有していることを確認してください。ビデオが不適切な言語、画像、音声が含まれていないことを確認してください。
            </Typography>
            <Box display="flex" justifyContent="right">
              <Button type="submit" variant="contained" color="primary">
                提出する
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={handleCancel}
                sx={{ marginLeft: 2 }}
              >
                キャンセル
              </Button>
            </Box>
          </form>
        </Paper>
      </Container>
    </ResponsiveDrawer>
  );
}
