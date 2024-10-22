import { useState } from 'react';
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
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function CompanyManagementList() {
  const [category, setCategory] = useState("オフィス"); // Initial value

  const handleChange = (event) => {
    setCategory(event.target.value);
  };
  return (
    <ResponsiveDrawer>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "40vh" }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: "20px",
            borderRadius: "10px",
            maxWidth: "800px",
            width: "100%",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h5" gutterBottom>
                会社管理
              </Typography>
              <form noValidate autoComplete="off">
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="会社名"
                      variant="outlined"
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth variant="outlined" margin="normal">
                      <InputLabel>カテゴリー</InputLabel>
                      <Select
                        value={category}
                        onChange={handleChange}
                        label="カテゴリー"
                      >
                        <MenuItem value="オフィス">オフィス</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="社所在地"
                      variant="outlined"
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="連絡先"
                      variant="outlined"
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="会社名"
                      variant="outlined"
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="営業品目"
                      variant="outlined"
                      margin="normal"
                      multiline
                      rows={4}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container spacing={2} justifyContent="flex-end">
                      <Grid item xs={6} sm={3}>
                        <Button
                          component={RouterLink}
                          to="/admin/company-management"
                          fullWidth
                          variant="contained"
                          color="error"
                          sx={{ padding: "10px 0", fontSize: "16px" }}
                        >
                          キャンセル
                        </Button>
                      </Grid>
                      <Grid item xs={6} sm={3}>
                        <Button
                          fullWidth
                          variant="contained"
                          color="primary"
                          sx={{ padding: "10px 0", fontSize: "16px" }}
                        >
                          提出する
                        </Button>
                      </Grid>
                    </Grid>
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

