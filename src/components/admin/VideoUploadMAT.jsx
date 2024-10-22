import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Paper,
} from "@mui/material";
import ResponsiveDrawer from "../sidebar/SideBar";
import { useNavigate } from "react-router-dom";

export default function VideoUploadMAT() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // ถ้าเลือกไฟล์จะทำการแปลงเป็น base64
    let fileBase64 = null;
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        fileBase64 = reader.result;
        
        // ส่งข้อมูลไปยังหน้า PDFEducation
        navigate("/admin/pdfeducationPage", {
          state: {
            title,
            description,
            file: fileBase64, // ส่งข้อมูลไฟล์เป็น base64
          },
        });
      };
      return; // หยุดการทำงานจนกว่า FileReader จะโหลดเสร็จ
    }

    // ถ้าไม่มีไฟล์ให้ส่งแค่ title และ description
    navigate("/admin/pdfeducationPage", {
      state: {
        title,
        description,
        file: null,
      },
    });
  };

  const handleCancel = () => {
    // Navigate ไปที่หน้าการจัดการการศึกษาเมื่อกดปุ่มยกเลิก
    navigate("/admin/dashboard-management/");
  };

  return (
    <ResponsiveDrawer>
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ padding: 3, marginTop: 3 }}>
          <Typography variant="h5" component="h1" gutterBottom>
          工程教育資料管理 
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="タイトル"
              fullWidth
              variant="outlined"
              margin="normal"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
                accept="image/*,video/*,.pdf,.xlsx"
                style={{ display: "none" }}
                id="file-upload"
                type="file"
                onChange={handleFileChange}
              />
              <label htmlFor="file-upload">
                <Button variant="contained" component="span">
                  画像・動画 (.jpg, .mov, .pdf, .excel)
                </Button>
              </label>
              {file && <Typography variant="body2">{file.name}</Typography>}
            </Box>
            <TextField
              label="説明"
              fullWidth
              variant="outlined"
              margin="normal"
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
