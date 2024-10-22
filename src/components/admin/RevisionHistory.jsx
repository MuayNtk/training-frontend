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
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

import uploadTemplate from "../../asserts/Upload-Template.png";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 0,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 0,
});

const RevisionHistory = () => {
  const [file, setFile] = useState(null);
  const [tem, setTem] = useState(uploadTemplate);

  const [oplFirst, setOplFirst] = useState();

  // Add states for text field values
  const [companyName, setCompanyName] = useState("");
  const [title, setTitle] = useState("");
  const [purpose, setPurpose] = useState("");
  const [scope, setScope] = useState("");

  const navigate = useNavigate();

  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  function oplFirstFile(e) {
    console.log(e.target.files);
    setOplFirst(URL.createObjectURL(e.target.files[0]));
  }

  const handleSubmit = () => {
    const formData = {
      companyName,
      title,
      purpose,
      scope,
    };

    console.log(formData);

    navigate("/admin/pdfrevisionhistory", { state: formData });
  };

  const handleCancel = () => {
    // Navigate to the specified URL when cancelled
    navigate("/admin/work-management");
  };
  return (
    <ResponsiveDrawer>
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ padding: 3, marginTop: 3 }}>
          <Typography variant="h5" component="h1" gutterBottom>
            作業要領書
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="会社名"
              fullWidth
              variant="outlined"
              margin="normal"
              id="companyName"
              name="companyName"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
            <TextField
              label="フリー"
              fullWidth
              variant="outlined"
              margin="normal"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              label="フリー"
              fullWidth
              variant="outlined"
              margin="normal"
              id="purpose"
              name="purpose"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
            />
            <TextField
              label="フリー"
              fullWidth
              variant="outlined"
              margin="normal"
              id="scope"
              name="scope"
              value={scope}
              onChange={(e) => setScope(e.target.value)}
            />
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              width="100%"
              marginBottom={5}
            >
              <Box
                display="flex"
                flexDirection="column-reverse"
                justifyContent="center"
                alignItems="center"
                margin={1}
                marginLeft={2}
                width="40%"
              >
                <Box display="flex" alignItems="center">
                  <Button component="label" variant="contained" tabIndex={-1}>
                    Upload File (.pptx .ppt)
                    <VisuallyHiddenInput type="file" onChange={oplFirstFile} />
                  </Button>
                </Box>
                <Box
                  width="100%"
                  height={200}
                  border={1}
                  borderRadius={3}
                  component="label"
                  marginY={1}
                  overflow="hidden"
                >
                  <img src={oplFirst || tem} width="100%" height="100%" />
                  <VisuallyHiddenInput type="file" onChange={oplFirstFile} />
                </Box>
              </Box>
            </Box>
            <Box display="flex" justifyContent="right">
              <Button type="submit" variant="contained" color="primary">
                提出する
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={handleCancel}
                sx={{ marginLeft: 2 }} // เพิ่มระยะห่างระหว่างปุ่ม
              >
                キャンセル
              </Button>
            </Box>
          </form>
        </Paper>
      </Container>
    </ResponsiveDrawer>
  );
};

export default RevisionHistory;
