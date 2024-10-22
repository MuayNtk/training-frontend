import { useState, useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import AuthWrapper from "./authwrap/AuthWrapper";
import LoginInputs from "./inputs/LoginInputs";
import {
  Box,
  Typography,
  Grid,
  InputAdornment,
  FormControlLabel,
  Checkbox,
  Button,
  Link,
  Alert,
  Stack,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import PasswordIcon from "@mui/icons-material/Password";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameTouched, setUsernameTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [errors, setErrors] = useState({ username: "", password: "" });
  const [Text, setText] = useState("");
  const [role, setRole] = useState("");
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const tokenDecode = jwtDecode(localStorage.getItem("token"));
      setToken(tokenDecode);
    } catch (error) {
      setToken("")
    }
    if (token) {
      if (token.role.toLocaleLowerCase() === "admin") {
        navigate("/admin/dashboard");
      } else if (token.role.toLocaleLowerCase() === "user") {
        navigate("/user/dashboard");
      } else {
        setText("無効なメールアドレスまたはパスワード。");
      }
    }
  }, [token]);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleUsername = () => {
    setUsernameTouched(true);

    // Check for empty username
    if (username.trim() === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        username: "ユーザー名またはメールアドレスは必須です。",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        username: "",
      }));
    }
  };

  const handlePassword = () => {
    setPasswordTouched(true);
    // Check for empty password
    if (password.trim() === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "パスワードが必要。",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "",
      }));
    }
  };
  const handleLogin = () => {
    setUsernameTouched(true);
    setPasswordTouched(true);
    // Check for empty fields
    if (username.trim() === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        username: "社員ID",
      }));
    }
    if (password.trim() === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "パスワードが必要。",
      }));
    }

    // Proceed with login only if both fields are non-empty
    if (username.trim() !== "" && password.trim() !== "") {
      axios
        .post("http://localhost:3000/auth/login", {
          userId: username,
          password: password,
        })
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          setToken(jwtDecode(localStorage.getItem("token")));
          setRole(token.role);
        });

      console.log(role);
      if (role.toLocaleLowerCase() === "admin") {
        navigate("/admin/dashboard");
      } else if (role.toLocaleLowerCase() === "user") {
        navigate("/user/dashboard");
      } else {
        setText("無効なメールアドレスまたはパスワード。");
      }
    }
  };

  return (
    <AuthWrapper>
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", mb: 5 }}>
          <Box sx={{ textAlign: "left" }}>
            <Box sx={{ mb: { xs: 2, xl: 2 } }}>
              <Typography
                component="h2"
                sx={{
                  fontWeight: "bold",
                  fontSize: 25,
                }}
              >
                サインイン
              </Typography>

              <Typography
                component="h2"
                sx={{
                  fontWeight: 500,
                  fontSize: { xs: 14, sm: 15, lg: 18 },
                }}
              >
                続行するにはログインしてください
              </Typography>
            </Box>

            <Box sx={{ mb: { xs: 2, xl: 2 } }}>
              <LoginInputs
                field={{ value: username, onChange: handleUsernameChange }}
                meta={{ error: errors.username, touched: usernameTouched }}
                placeholder="会社ID"
                name="username"
                variant="outlined"
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                }}
                onBlur={handleUsername} // Call handleBlur on blur
              />
            </Box>

            <Box sx={{ mb: { xs: 2, xl: 2 } }}>
              <LoginInputs
                field={{ value: password, onChange: handlePasswordChange }}
                meta={{ error: errors.password, touched: passwordTouched }}
                placeholder="パスワード"
                type="password"
                name="password"
                variant="outlined"
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PasswordIcon />
                    </InputAdornment>
                  ),
                }}
                onBlur={handlePassword} // Call handleBlur on blur
              />
            </Box>

            <Box sx={{ mb: { xs: 2, xl: 2 } }}>
              {/* แสดง error เมื่อเกิดการผิดพลาดของ username และ passworld  */}
              {Text && (
                // กำหนดระยะห่างการเว้นวรรค เป็นแถวเดียวกัน
                <Stack direction="row" spacing={2}>
                  {/* แสดง ข้อความจากการกด button ข้อผิดพลาดต่างๆ */}
                  <Alert severity="error">{Text}</Alert>
                </Stack>
              )}
            </Box>

            <Box sx={{ mb: { xs: 2, xl: 2 } }}>
              <FormControlLabel
                control={
                  <Checkbox
                    defaultChecked
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 26 } }}
                  />
                }
                label="私を覚えてますか ?"
              />
            </Box>

            <Box sx={{ mb: { xs: 2, xl: 2 } }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={5} sm={6} lg={6}>
                  <Button
                    onClick={handleLogin} // Call handleLogin on button click
                    sx={{
                      borderRadius: "56px",
                      fontSize: { xs: 12, sm: 12, lg: 14 },
                      backgroundColor: "#FFC107",
                      "&:hover": {
                        backgroundColor: "#C49917",
                      },
                    }}
                    variant="contained"
                  >
                    ログイン
                  </Button>
                </Grid>
                <Grid item xs={6} sm={6} lg={6} textAlign="right">
                  <Link
                    underline="none"
                    component={RouterLink}
                    color="primary"
                    to="/forgot-password"
                    sx={{
                      fontSize: { xs: 8, sm: 8, md: 14, lg: 14 },
                    }}
                  >
                    パスワードが忘れて⽅ ?
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Box>
    </AuthWrapper>
  );
};

export default Login;
