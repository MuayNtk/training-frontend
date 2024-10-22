import React, { useState } from "react";
import AuthWrapper from "../authwrap/AuthWrapper";
import Box from "@mui/material/Box";
import LoginInputs from "../inputs/LoginInputs";
import { Typography } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";
import EmailIcon from "@mui/icons-material/Email";;
import Alert from "@mui/material/Alert";
import Grid from '@mui/material/Grid';

const ForgotPass = () => {
  const [text, setText] = useState("");

  const handleForgotPass = () => {
    setText("電子メールに送信されたパスフレーズを確認してください ");
  };
  return (
    // เรียกฟังก์ชั่น กำหนดตัวแปรจาก chidrean จากไฟล์ Authwrap มาที่ login
    <AuthWrapper>
      {/* กำหนด Box โดยฟอร์มจะเรียงลำดับ   */}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", mb: 5 }}>
          {/* กำหนดฟอร์มให้ตัวอักษรอยู่ทางซ้าย */}
          <Box sx={{ textAlign: "left" }}>
            {/* กำหนดการเว้นบรรณทัด ระยะห่าง บรรทัด  */}
            <Box sx={{ mb: { xs: 2, xl: 2 } }}>
              {/* เพิ่มหัวข้อ  */}
              <Typography
                component="h2"
                sx={{
                  fontWeight: 700,
                  fontSize: 30,
                }}
              >
                パスワードが忘れて⽅
              </Typography>

              <Typography
                component="h2"
                sx={{
                  fontWeight: 500,
                  fontSize: { xs: 18, sm: 18 },
                }}
              >
                本人確認のため、情報を入力してください。
              </Typography>
            </Box>
            {/* สิ้นสุดการเพิ่มหัวข้อ  */}

            {/* กำหนดการเว้นบรรณทัด ระยะห่าง บรรทัด  */}
            <Box sx={{ mb: { xs: 2, xl: 2 } }}>
              {/* กำหนด input เรียกค่าของ username */}
              <LoginInputs
                placeholder="会社名/メールアドレス"
                name="username"
                variant="outlined"
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            {/* สิ้นสุดกำหนด input ของ username */}

            {/* กำหนดการเว้นบรรณทัด ระยะห่าง บรรทัด  */}
            <Box sx={{ mb: { xs: 2, xl: 2 } }}>
              {/* แสดง error เมื่อเกิดการผิดพลาดของ username และ passworld  */}
              {text && (
                // กำหนดระยะห่างการเว้นวรรค เป็นแถวเดียวกัน
                <Stack direction="row" spacing={2}>
                  {/* แสดง ข้อความจากการกด button ข้อผิดพลาดต่างๆ */}
                  <Alert severity="success">{text}</Alert>
                </Stack>
              )}
            </Box>
            {/* สิ้นสุด กำหนดการเว้นบรรณทัด ระยะห่าง บรรทัด  */}

            {/* กำหนดการเว้นบรรณทัด ระยะห่าง บรรทัด  */}
            <Box sx={{ mb: { xs: 2, xl: 2 } }}>
              {/* กำหนดระยะห่างการเว้นวรรค เป็นแถวเดียวกัน */}
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={6}>
                  <Button
                  onClick={handleForgotPass}
                    sx={{
                      
                      borderRadius: "56px",
                      backgroundColor: "#FFC107",
                      "&:hover": {
                        backgroundColor: "#C49917",
                      },
                    }}
                    variant="contained"
                  >
                確認する
                  </Button>
                </Grid>
                {/* เรียกใช้เร้าท์ ไปหน้าลืมรหัสผ่าน*/}
                <Grid item xs={6} textAlign="right">
                  <Link
                    underline="none"
                    component={RouterLink}
                    color="inherit"
                    to="/"
                    sx={{
                      pt: "5.5px",
                    }}
                  >
                    戻る
                  </Link>
                </Grid>
              </Grid>
            </Box>
            {/* สิ้นสุด กำหนดการเว้นบรรณทัด ระยะห่าง บรรทัด  */}
          </Box>
        </Box>
      </Box>
    </AuthWrapper>
  );
};

export default ForgotPass;
