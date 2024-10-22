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
import { Search } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

const CompanyManagement = () => {
  const [companies, setCompanies] = useState([
    { id: 1, companyName: "会社A", department: "オフィス" },
    { id: 2, companyName: "会社B", department: "オフィス" },
    { id: 3, companyName: "工房A", department: "工房" },
    { id: 4, companyName: "工房B", department: "工房" },
    { id: 5, companyName: "工房C", department: "工房" },
    { id: 6, companyName: "タイ会社", department: "オフィス" },
    { id: 7, companyName: "ベトナム会社", department: "オフィス" },
    { id: 8, companyName: "インド会社", department: "オフィス" },
    { id: 9, companyName: "タイ工房A", department: "工房" },
  ]);

  const [filteredCompanies, setFilteredCompanies] = useState(companies);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [editingCompany, setEditingCompany] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [filterText, setFilterText] = useState("");
  const navigate = useNavigate();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleEditClick = (company) => {
    setEditingCompany(company);
    setIsEditDialogOpen(true);
  };

  const handleEditSave = () => {
    setCompanies(
      companies.map((c) => (c.id === editingCompany.id ? editingCompany : c))
    );
    setFilteredCompanies(
      filteredCompanies.map((c) =>
        c.id === editingCompany.id ? editingCompany : c
      )
    );
    setIsEditDialogOpen(false);
    setEditingCompany(null);
  };

  const handleDeleteClick = (id) => {
    setCompanies((prevCompanies) =>
      prevCompanies.filter((company) => company.id !== id)
    );
    setFilteredCompanies((prevCompanies) =>
      prevCompanies.filter((company) => company.id !== id)
    );
  };

  const handleFilterChange = (event) => {
    const value = event.target.value;
    setFilterText(value);
    setFilteredCompanies(
      companies.filter(
        (company) =>
          company.companyName.includes(value) ||
          company.department.includes(value)
      )
    );
  };

  const handleCreate = () => {
    navigate("/admin/company-management-list");
  };

  return (
    <ResponsiveDrawer>
      <Paper
        elevation={3}
        sx={{
          padding: 2,
          borderRadius: 2,
          ml: { xs: 0, lg: 2 },
          mr: { xs: 4, sm: "5rem", lg: 0 },
          maxWidth: "1200px",
          width: "100%",
        }}
      >
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          sx={{ mb: 2 }}
        >
          <Typography variant="h5" sx={{ mr: "auto" }}>
            会社管理
          </Typography>
          <Button
            variant="contained"
            sx={{ bgcolor: "#3D386A", color: "#E0E0E0" }}
            startIcon={<AddIcon />}
            onClick={handleCreate}
          >
            作成済み
          </Button>{" "}
          {/* Navigate to Create Company page */}
        </Grid>

        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={8}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="会社管理..."
              value={filterText}
              onChange={handleFilterChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
                sx: { bgcolor: "#FFFFFF" },
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
                width: { xs: "40%", md: "50%" },
              }}
              startIcon={<Search />}
            >
              検索
            </Button>
          </Grid>
        </Grid>

        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ minWidth: 120 }}>会社名</TableCell>
                <TableCell sx={{ minWidth: 120 }}>部署</TableCell>
                <TableCell align="right" sx={{ minWidth: 120 }}>
                  アクション
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? filteredCompanies.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : filteredCompanies
              ).map((company) => (
                <TableRow key={company.id}>
                  <TableCell sx={{ minWidth: 120 }}>
                    {company.companyName}
                  </TableCell>
                  <TableCell sx={{ minWidth: 120 }}>
                    {company.department}
                  </TableCell>
                  <TableCell align="right" sx={{ minWidth: 120 }}>
                    <Box
                      display="flex"
                      justifyContent="flex-end"
                      alignItems="center"
                    >
                      <IconButton
                        color="success"
                        onClick={() => handleEditClick(company)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleDeleteClick(company.id)}
                      >
                        <DeleteIcon />
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
          count={filteredCompanies.length}
          labelRowsPerPage="ページ :"
          rowsPerPageOptions={[1, 2, 3, 4, 5, 6, 7, 8]}
          rowsPerPage={rowsPerPage}
          nextIconButtonProps={{ "aria-label": "次へ" }}
          backIconButtonProps={{ "aria-label": "前へ" }}
        />
      </Paper>

      <Dialog
        open={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
      >
        <DialogTitle>会社を編集する</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="会社名"
            type="text"
            fullWidth
            value={editingCompany?.companyName || ""}
            onChange={(e) =>
              setEditingCompany({
                ...editingCompany,
                companyName: e.target.value,
              })
            }
          />
          <TextField
            margin="dense"
            label="部署"
            type="text"
            fullWidth
            value={editingCompany?.department || ""}
            onChange={(e) =>
              setEditingCompany({
                ...editingCompany,
                department: e.target.value,
              })
            }
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
    </ResponsiveDrawer>
  );
};

export default CompanyManagement;
