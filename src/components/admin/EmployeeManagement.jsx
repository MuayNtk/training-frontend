import { useState } from "react";
import ResponsiveDrawer from "../sidebar/SideBar";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Paper,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function EmployeeManagement() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [level, setLevel] = useState("");
  const [qualification, setQualification] = useState("");
  const [department, setDepartment] = useState("");
  
  // Pagination states
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <ResponsiveDrawer>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ mt: 5 }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: "30px",
            borderRadius: "15px",
            maxWidth: "900px",
            width: "100%",
            backgroundColor: "#F7F7F7",
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <form noValidate autoComplete="off">
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="社員名"
                      variant="outlined"
                      margin="normal"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth variant="outlined" margin="normal">
                      <InputLabel>レベル</InputLabel>
                      <Select
                        label="レベル"
                        value={level}
                        onChange={(e) => setLevel(e.target.value)}
                      >
                        <MenuItem value="レベル1">レベル1</MenuItem>
                        <MenuItem value="レベル2">レベル2</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="メールアドレス"
                      variant="outlined"
                      margin="normal"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth variant="outlined" margin="normal">
                      <InputLabel>資格</InputLabel>
                      <Select
                        label="資格"
                        value={qualification}
                        onChange={(e) => setQualification(e.target.value)}
                      >
                        <MenuItem value="あり">あり</MenuItem>
                        <MenuItem value="なし">なし</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="パスワード"
                      variant="outlined"
                      type="password"
                      margin="normal"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth variant="outlined" margin="normal">
                      <InputLabel>部署</InputLabel>
                      <Select
                        label="部署"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                      >
                        <MenuItem value="製造部">製造部</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Button
                      component={RouterLink}
                      to="/admin/employee-management-list"
                      fullWidth
                      variant="contained"
                      color="error"
                      sx={{ borderRadius: "10px", fontWeight: "bold" }}
                    >
                      キャンセル
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      sx={{ borderRadius: "10px", fontWeight: "bold" }}
                    >
                      提出する
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Grid>
          </Grid>
        </Paper>

      
      </Grid>
    </ResponsiveDrawer>
  );
}