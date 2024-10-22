import React, { useEffect } from "react";
import ResponsiveDrawer from "../sidebar/SideBar";
import {
  Box,
  Toolbar,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import axios from "axios";

const columns = [
  {
    id: "name",
    label: "カテゴリー",
    minWidth: 170,
    align: "left",
  },
  {
    id: "count",
    label: "総数",
    minWidth: 170,
    align: "right",
  },
];

const columns2 = [
  {
    label: "すべて",
    minWidth: 170,
    align: "left",
  },
  {
    label: "もっと見る",
    minWidth: 170,
    align: "right",
  },
];

function createData(name, count) {
  return { name, count };
}



export default function AdminDashboard() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [dashboardData, setDashboardData] = React.useState({});
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`, // Include JWT in Authorization header
    },
  };

  const rows = [
    createData("教育内容", dashboardData.courseTypeTwo),
    createData("製品や作業要領書", dashboardData.courseTypeThree),
    createData("⼯程教育資料", dashboardData.courseTypeOne),
    createData("ワンポイントレッスン", dashboardData.opls),
  ];

  const fetchDashboard = async () => {
    const response = await axios.get("http://localhost:3000/dashboard/",config);
    console.log(response.data);
    setDashboardData(response.data.result)
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <ResponsiveDrawer>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={8}>
          <Card
            sx={{
              minWidth: 275,
              backgroundColor: "#252240",
              mb: 1,
              borderRadius: "16px",
            }}
          >
            <CardContent>
              <Typography variant="h6" color="white" gutterBottom>
                システムへようこそ。
              </Typography>
              <Typography
                color="white"
                sx={{ fontSize: { xs: 12, sm: 14, lg: 16 } }}
              >
                こんにちは！高橋さん、お疲れ様です。今日も一日頑張りましょう！
              </Typography>
              {/* <Toolbar sx={{ justifyContent: "flex-end" }}>
                <Button
                  sx={{
                    borderRadius: "56px",
                    backgroundColor: "#FFC107",
                    "&:hover": {
                      backgroundColor: "#D79507",
                    },
                  }}
                  variant="contained"
                >
                  プロフィール
                </Button>
              </Toolbar> */}
            </CardContent>
          </Card>

          <Box sx={{ mb: 1 }}>
            <Typography variant="h5" color="black" component="div">
              概要
            </Typography>
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={4} sm={4}>
              <Card
                sx={{ backgroundColor: "#252240", mb: 1, borderRadius: "16px" }}
              >
                <CardContent sx={{ textAlign: "right" }}>
                  <Typography variant="h6" color="white" gutterBottom>
                    会社
                  </Typography>
                  <Typography variant="h6" color="white">
                    {dashboardData.departments} 社
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={4} sm={4}>
              <Card
                sx={{ backgroundColor: "#252240", mb: 1, borderRadius: "16px" }}
              >
                <CardContent sx={{ textAlign: "right" }}>
                  <Typography variant="h6" color="white" gutterBottom>
                    社員
                  </Typography>
                  <Typography variant="h6" color="white">
                  {dashboardData.users} ⼈
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={4} sm={4}>
              <Card
                sx={{ backgroundColor: "#252240", mb: 1, borderRadius: "16px" }}
              >
                <CardContent sx={{ textAlign: "right" }}>
                  <Typography variant="h6" color="white" gutterBottom>
                    コース
                  </Typography>
                  <Typography variant="h6" color="white">
                  {dashboardData.courses} 件
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Paper
            sx={{
              minWidth: 275,
              backgroundColor: "#FFFFFF",
              mb: 2,
              borderRadius: "16px",
              color: "#000000",
            }}
          >
            <CardContent>
              <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {columns2.map((column, index) => (
                        <TableCell
                          key={index} // Use `index` if `column.id` is not available
                          align={column.align}
                          style={{ minWidth: column.minWidth }}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {rows
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row, index) => (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={index}
                        >
                          {columns.map((column) => (
                            <TableCell key={column.id} align={column.align}>
                              {column.format &&
                              typeof row[column.id] === "number"
                                ? column.format(row[column.id])
                                : row[column.id]}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                labelRowsPerPage="ページあたりの行数"
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </CardContent>
          </Paper>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Card
            sx={{
              backgroundColor: "#FFFFFF",
              mb: 2,
              borderRadius: "16px",
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar />
            </LocalizationProvider>
          </Card>

          {/* <Card
            sx={{
              backgroundColor: "#FFFFFF",
              borderRadius: "16px",
              ml: { xs: 0, lg: 2 },
            }}
          >
            <CardContent>
              <Typography variant="h6" color="black" sx={{ mb: 4 }}>
                今日のリスト
              </Typography>

              <Box
                sx={{
                  padding: "10px",
                  backgroundColor: "#252240",
                  borderRadius: "8px",
                  mb: 2,
                  color: "#FFFFFF",
                }}
              >
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={6}>
                    <Typography>試験1</Typography>
                  </Grid>
                  <Grid item xs={6} textAlign="right">
                    <Typography>21/06/2024</Typography>
                  </Grid>
                </Grid>
              </Box>
              <Box
                sx={{
                  padding: "10px",
                  backgroundColor: "#3D386A",
                  borderRadius: "8px",
                  mb: 2,
                  color: "#FFFFFF",
                }}
              >
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={6}>
                    <Typography>試験2</Typography>
                  </Grid>
                  <Grid item xs={6} textAlign="right">
                    <Typography>21/06/2024</Typography>
                  </Grid>
                </Grid>
              </Box>
              <Box
                sx={{
                  padding: "10px",
                  backgroundColor: "#252240",
                  borderRadius: "8px",
                  mb: 2,
                  color: "#FFFFFF",
                }}
              >
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={6}>
                    <Typography>試験3</Typography>
                  </Grid>
                  <Grid item xs={6} textAlign="right">
                    <Typography>21/06/2024</Typography>
                  </Grid>
                </Grid>
              </Box>
              <Box
                sx={{
                  padding: "10px",
                  backgroundColor: "#3D386A",
                  borderRadius: "8px",
                  mb: 2,
                  color: "#FFFFFF",
                }}
              >
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={6}>
                    <Typography>試験4</Typography>
                  </Grid>
                  <Grid item xs={6} textAlign="right">
                    <Typography>21/06/2024</Typography>
                  </Grid>
                </Grid>
              </Box>
              <Button
                sx={{
                  width: "100%",
                  borderRadius: "12px",
                  backgroundColor: "#FFC107",
                  "&:hover": {
                    backgroundColor: "#D79507",
                  },
                }}
                variant="contained"
              >
                Add
              </Button>
            </CardContent>
          </Card> */}
        </Grid>
      </Grid>
    </ResponsiveDrawer>
  );
}
