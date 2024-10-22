import { useState } from "react";
import ResponsiveDrawer from "../sidebar/SideBar";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  TextField,
  Button,
  InputAdornment,
  Grid,
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
} from "@mui/material";
import { Search, Edit, Delete } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import { Link as RouterLink } from "react-router-dom";

const EmployeeManagementList = () => {
  const [employees, setEmployees] = useState([
    { id: 1, employeeName: "スタッフA", department: "製造部" },
    { id: 2, employeeName: "スタッフB", department: "製造部" },
    { id: 3, employeeName: "スタッフC", department: "製造部" },
    { id: 4, employeeName: "スタッフD", department: "⽣産管理部" },
    { id: 5, employeeName: "スタッフE", department: "⽣産管理部" },
    { id: 6, employeeName: "スタッフF", department: "⽣産管理部" },
    { id: 7, employeeName: "スタッフG", department: "技術部" },
    { id: 8, employeeName: "スタッフH", department: "技術部" },
    { id: 9, employeeName: "スタッフI", department: "技術部" },
  ]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleEditClick = (employee) => {
    setEditingEmployee(employee);
    setIsEditDialogOpen(true);
  };

  const handleEditSave = () => {
    setEmployees(
      employees.map((emp) =>
        emp.id === editingEmployee.id ? editingEmployee : emp
      )
    );
    setIsEditDialogOpen(false);
    setEditingEmployee(null);
  };

  const handleDeleteClick = (id) => {
    setEmployees(employees.filter((emp) => emp.id !== id));
  };

  const handleEditChange = (field, value) => {
    setEditingEmployee((prev) => ({ ...prev, [field]: value }));
  };

  const filteredEmployees = employees.filter((emp) =>
    emp.employeeName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ResponsiveDrawer>
      <Paper
        elevation={3}
        sx={{
          padding: 2,
          borderRadius: 2,
          ml: { xs: 0, lg: 2 },
          mr: {xs:4, sm:"5rem",lg:0},
          maxWidth: "1200px",
          width: "100%",
        }}
      >
        <Grid
          container
          alignItems="center"
          justifyContent="flex-end"
          sx={{ marginBottom: "10px" }}
        >
          <Typography variant="h5" sx={{ marginRight: "auto" }}>
            社員管理
          </Typography>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#3D386A", color: "#E0E0E0" }}
            startIcon={<AddIcon />}
            component={RouterLink}
            to="/admin/Employee-management"
          >
            新規作成
          </Button>
        </Grid>

        <Grid container spacing={2} alignItems="center">
          <Grid item xs={8}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="社員を検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
                sx: { backgroundColor: "#FFFFFF" },
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Button
        
              variant="contained"
              sx={{
                backgroundColor: "#FFA800",
                color: "#FFFFFF",
                height: "100%",
                width:{xs:"40%",md:"50%" },
              }}
              onClick={() => setSearchQuery(searchQuery)}
              startIcon={<Search />}
            >
              検索
            </Button>
          </Grid>
        </Grid>

        <TableContainer component={Paper} sx={{ marginTop: "20px" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ minWidth: 120 }}>社員名</TableCell>
                <TableCell sx={{ minWidth: 120 }}>部署</TableCell>
                <TableCell sx={{ textAlign: "right",minWidth: 120, }}>アクション</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? filteredEmployees.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : filteredEmployees
              ).map((emp) => (
                <TableRow key={emp.id}>
                  <TableCell sx={{ minWidth: 120 }} >{emp.employeeName}</TableCell>
                  <TableCell sx={{ minWidth: 120 }}>{emp.department}</TableCell>
                  <TableCell sx={{ textAlign: "right",minWidth: 120, }}>
                    <Box
                      display="flex"
                      justifyContent="flex-end"
                      alignItems="center"
                    >
                      <IconButton
                        onClick={() => handleEditClick(emp)}
                        sx={{ color: "#4CAF50" }}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDeleteClick(emp.id)}
                        sx={{ color: "#F44336" }}
                      >
                        <Delete />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelDisplayedRows={({ from, to, count }) =>
            `${from}-${to} から ${count}`
          }
          count={filteredEmployees.length}
          labelRowsPerPage="ページ :"
          rowsPerPageOptions={[3, 5, 10]}
          rowsPerPage={rowsPerPage}
          nextIconButtonProps={{ 'aria-label': '次へ' }}
          backIconButtonProps={{ 'aria-label': '前へ' }}
        />

        <Dialog
          open={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
        >
          <DialogTitle>社員情報を編集</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              margin="dense"
              label="社員名"
              value={editingEmployee ? editingEmployee.employeeName : ""}
              onChange={(e) =>
                handleEditChange("employeeName", e.target.value)
              }
            />
            <TextField
              fullWidth
              margin="dense"
              label="部署"
              value={editingEmployee ? editingEmployee.department : ""}
              onChange={(e) => handleEditChange("department", e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsEditDialogOpen(false)} color="primary">
              キャンセル
            </Button>
            <Button onClick={handleEditSave} color="primary">
              保存
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </ResponsiveDrawer>
  );
};

export default EmployeeManagementList;
