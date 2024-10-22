import { useState } from "react";
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import uploadTemplate from "../../asserts/Upload-Template.png";
import ResponsiveDrawer from "../sidebar/SideBar";

import logoImage from "../../../public/jpspng.png";

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

const OPLManagement = () => {
  const [tem, setTem] = useState(uploadTemplate);
  const [companyName, setCompanyName] = useState("");
  const [title, setTitle] = useState("");
  const [purpose, setPurpose] = useState("");
  const [scope, setScope] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setImage(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = () => {
    if (!companyName || !title) {
      alert("Please fill in all information completely.");
      return;
    }

    const formData = {
      companyName,
      title,
      purpose,
      scope,
      image,
    };

    console.log(formData);
    navigate("/admin/pdf-lession", { state: formData });
  };

  const handleCancel = () => {
    navigate("/admin/lesson-management");
  };

  return (
    <ResponsiveDrawer>
      <Paper
        elevation={3}
        sx={{
          padding: 2,
          borderRadius: 2,
          ml: { xs: 0, lg: 2 },
          maxWidth: '1200px',
          width: "100%",
        }}
      >
        {/* Header Section */}
        <Table sx={{ marginBottom: 3 }} size="small">
          <TableHead>
            <TableRow>
              <TableCell rowSpan={2} sx={{ width: "15%", border: 1 }}>
                <img
                  src={logoImage}
                  alt="Logo"
                  style={{ width: "100%", height: "auto" }}
                />
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  backgroundColor: "#3333FF",
                  color: "white",
                  border: 1,
                  fontSize: 28,
                }}
              >
                OPL ワンポイントレッスン
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align="left" sx={{ border: 1 }}>
                <TextField
                  size="small"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  fullWidth
                />
              </TableCell>
              <TableCell align="left" sx={{ border: 1 }}>
                <TextField
                  size="small"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  fullWidth
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center" sx={{ border: 1 }}>
                目的
              </TableCell>
              <TableCell align="left" sx={{ border: 1 }}>
                <TextField
                  size="small"
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  fullWidth
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center" sx={{ border: 1 }}>
                範囲
              </TableCell>
              <TableCell align="left" sx={{ border: 1 }}>
                <TextField
                  size="small"
                  value={scope}
                  onChange={(e) => setScope(e.target.value)}
                  fullWidth
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        {/* Image Upload Section */}
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          marginBottom={3}
        >
          <Box
            display="flex"
            flexDirection="column-reverse"
            justifyContent="center"
            alignItems="center"
            width="35%"
          >
            <Box
              display="flex"
              alignItems="center"
              marginTop={1}
              marginBottom={3}
            >
              <Button component="label" variant="contained">
                <Typography component="span" variant="caption">
                  Upload image (.jpg .png)
                </Typography>
                <VisuallyHiddenInput type="file" onChange={handleImageChange} />
              </Button>
            </Box>
            <Box
              width="auto"
              height="auto"
              border={1}
              borderRadius={3}
              component="label"
              overflow="hidden"
            >
              <img
                src={imagePreview || tem}
                width="100%"
                height="100%"
                alt="Image Preview"
              />
              <VisuallyHiddenInput type="file" onChange={handleImageChange} />
            </Box>
            <Typography variant="body1" component="label" marginTop={2}>
              アップロードされた画像
            </Typography>
          </Box>
        </Box>

        {/* Footer Table Section */}
        <Table size="small">
          <TableBody>
            <TableRow align="center" sx={{ backgroundColor: "#3333FF", border: 1 }}>
              <TableCell align="center" sx={{ minWidth: "100px", color: "white", border: 1 }}>
                管理記号
              </TableCell>
              <TableCell align="center" sx={{ color: "white", border: 1 }}>
                改訂記号
              </TableCell>
              <TableCell align="center" sx={{ color: "white", border: 1 }} colSpan={3}>
                改訂内容
              </TableCell>
              <TableCell align="center" sx={{ color: "white", border: 1 }}>
                作成部署
              </TableCell>
              <TableCell align="center" sx={{ color: "white", border: 1 }} colSpan={2}>
                作成日
              </TableCell>
              <TableCell align="center" sx={{ color: "white", border: 1 }}>
                承認
              </TableCell>
              <TableCell align="center" sx={{ color: "white", border: 1 }}>
                検討
              </TableCell>
              <TableCell align="center" sx={{ color: "white", border: 1 }}>
                作成
              </TableCell>
            </TableRow>

            <TableRow align="center" sx={{ border: 1 }}>
              <TableCell align="center" sx={{ border: 1 }}></TableCell>
              <TableCell align="center" sx={{ border: 1 }}></TableCell>
              <TableCell align="center" sx={{ border: 1 }} colSpan={3}></TableCell>
              <TableCell align="center" sx={{ border: 1 }}></TableCell>
              <TableCell align="center" sx={{ border: 1 }} colSpan={2}>/　　/　　</TableCell>
              <TableCell align="center" sx={{ border: 1 }}></TableCell>
              <TableCell align="center" sx={{ border: 1 }}></TableCell>
              <TableCell align="center" sx={{ border: 1 }}></TableCell>
            </TableRow>

            <TableRow sx={{ backgroundColor: "#00CC66", color: "white", border: 1 }}>
              <TableCell colSpan={11} align="center" sx={{ border: 1 }}>
                教育訓練記録
              </TableCell>
            </TableRow>

            <TableRow align="center" sx={{ border: 1 }}>
              <TableCell align="center" sx={{ border: 1 }}>所属部署</TableCell>
              <TableCell align="center" sx={{ border: 1 }}></TableCell>
              <TableCell align="center" sx={{ border: 1 }}></TableCell>
              <TableCell align="center" sx={{ border: 1 }}></TableCell>
              <TableCell align="center" sx={{ border: 1 }}></TableCell>
              <TableCell align="center" sx={{ border: 1 }}></TableCell>
              <TableCell align="center" sx={{ border: 1 }}></TableCell>
              <TableCell align="center" sx={{ border: 1 }}></TableCell>
              <TableCell align="center" sx={{ border: 1 }}></TableCell>
              <TableCell align="center" sx={{ border: 1 }}></TableCell>
              <TableCell align="center" sx={{ border: 1 }}></TableCell>
            </TableRow>

            <TableRow align="center" sx={{ border: 1 }}>
              <TableCell align="center" sx={{ border: 1 }}>実施日</TableCell>
              <TableCell align="center" sx={{ border: 1 }}>/　　/　　</TableCell>
              <TableCell align="center" sx={{ border: 1 }}>/　　/　　</TableCell>
              <TableCell align="center" sx={{ border: 1 }}>/　　/　　</TableCell>
              <TableCell align="center" sx={{ border: 1 }}>/　　/　　</TableCell>
              <TableCell align="center" sx={{ border: 1 }}>/　　/　　</TableCell>
              <TableCell align="center" sx={{ border: 1 }}>/　　/　　</TableCell>
              <TableCell align="center" sx={{ border: 1 }}>/　　/　　</TableCell>
              <TableCell align="center" sx={{ border: 1 }}>/　　/　　</TableCell>
              <TableCell align="center" sx={{ border: 1 }}>/　　/　　</TableCell>
              <TableCell align="center" sx={{ border: 1 }}>/　　/　　</TableCell>
            </TableRow>

            <TableRow align="center" sx={{ border: 1 }}>
              <TableCell align="center" sx={{ border: 1 }}>氏名</TableCell>
              <TableCell align="center" sx={{ border: 1 }}></TableCell>
              <TableCell align="center" sx={{ border: 1 }}></TableCell>
              <TableCell align="center" sx={{ border: 1 }}></TableCell>
              <TableCell align="center" sx={{ border: 1 }}></TableCell>
              <TableCell align="center" sx={{ border: 1 }}></TableCell>
              <TableCell align="center" sx={{ border: 1 }}></TableCell>
              <TableCell align="center" sx={{ border: 1 }}></TableCell>
              <TableCell align="center" sx={{ border: 1 }}></TableCell>
              <TableCell align="center" sx={{ border: 1 }}></TableCell>
              <TableCell align="center" sx={{ border: 1 }}></TableCell>
            </TableRow>
          </TableBody>
        </Table>

        {/* Submit and Cancel Buttons */}
        <Box
          display="flex"
          justifyContent="right"
          sx={{ padding: 3, marginTop: 3 }}
        >
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
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
      </Paper>
    </ResponsiveDrawer>
  );
};

export default OPLManagement;
