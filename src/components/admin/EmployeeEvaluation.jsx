
import ResponsiveDrawer from "../sidebar/SideBar";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
} from "@mui/material";

export default function EmployeeEvaluation() {
  return (
    <ResponsiveDrawer>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "50vh" }}
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
            {/* Form Section */}
            <Grid item xs={12} md={6}>
              <form noValidate autoComplete="off">
                <TextField
                  fullWidth
                  label="社員名"
                  variant="outlined"
                  margin="normal"
                />
                <FormControl fullWidth variant="outlined" margin="normal">
                  <InputLabel>部署</InputLabel>
                  <Select label="部署">
                    <MenuItem value="Level 1">Level 1</MenuItem>
                    <MenuItem value="Level 2">Level 2</MenuItem>
                    {/* Add more levels as needed */}
                  </Select>
                </FormControl>
                <FormControl fullWidth variant="outlined" margin="normal">
                  <InputLabel>レベル</InputLabel>
                  <Select label="レベル">
                    <MenuItem value="製造部">製造部</MenuItem>
                    {/* Add more options as needed */}
                  </Select>
                </FormControl>
                <FormControl fullWidth variant="outlined" margin="normal">
                  <InputLabel>資格</InputLabel>
                  <Select label="資格">
                    <MenuItem value="あり">あり</MenuItem>
                    <MenuItem value="なし">なし</MenuItem>
                  </Select>
                </FormControl>
                <FormControl component="fieldset" margin="normal">
                  <RadioGroup row>
                    <FormControlLabel
                      value="合格"
                      control={<Radio />}
                      label="合格"
                    />
                    <FormControlLabel
                      value="不合格"
                      control={<Radio />}
                      label="不合格"
                    />
                  </RadioGroup>
                </FormControl>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Button fullWidth variant="contained" color="primary">
                      提出する
                    </Button>{" "}
                    {/* กดแล้วไปหน้า EmployeeReview */}
                  </Grid>
                  <Grid item xs={6}>
                    <Button fullWidth variant="contained" color="error">
                      キャンセル
                    </Button>{" "}
                    {/* กดแล้วไปหน้า EmployeeReview */}
                  </Grid>
                </Grid>
              </form>
            </Grid>

            {/* List Section */}
            <Grid item xs={12} md={6}>
              <List>
                {[
                  "ビジネスマナーコースA",
                  "作業要領書A",
                  "作品Aの作り方",
                  "テストA",
                  "ビジネスマナーコースB",
                ].map((text, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={text}
                      secondary={`日付 : 06/24/2024 回数 : 8/10`}
                    />
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </ResponsiveDrawer>
  );
}
