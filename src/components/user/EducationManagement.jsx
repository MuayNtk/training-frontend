import { useState, useEffect } from "react";
import ResponsiveDrawer from "../sidebar/SideBarUser";
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
  Typography,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DownloadIcon from "@mui/icons-material/Download";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import DescriptionIcon from "@mui/icons-material/Description";
import axios from "axios";

const DashboardManagement = () => {
  const [courses, setCourses] = useState([]);
  const [files, setFiles] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [mediaOpen, setMediaOpen] = useState(false);
  const [currentMedia, setCurrentMedia] = useState({
    type: "",
    src: "",
    title: "",
  });

  const [updateOpen, setUpdateOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [FileUrl, setFileUrl] = useState(null);
  
  const token = localStorage.getItem("token");

  const fetchCourses = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.get(
        "http://localhost:3000/courses/all-courses?typeId=2",
        config
      );
      const courses = response.data.course;

      if (!Array.isArray(courses)) {
        console.error("Expected an array for courses:", courses);
        return;
      }

      const filesResponse = await axios.get(
        "http://localhost:3000/media/all",
        config
      );
      const files = filesResponse.data;

      const courseFilesMap = files.reduce((acc, file) => {
        if (!acc[file.courseId]) {
          acc[file.courseId] = [];
        }
        acc[file.courseId].push(file);
        return acc;
      }, {});

      setCourses(courses);
      setFiles(courseFilesMap);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };
  useEffect(() => {
    fetchCourses();
  }, []);

  const handleOpenUpdate = (course) => {
    setSelectedCourse(course);
    setTitle(course.title);
    setDescription(course.description);
    setFileUrl(course.pdfUrl);
    setUpdateOpen(true);
  };

  const handleCloseUpdate = () => {
    setUpdateOpen(false);
    setSelectedCourse(null);
    setTitle("");
    setDescription("");
    setFileUrl(null);
  };

  const handleUpdateCourse = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    const courseId = selectedCourse.id;

    if (FileUrl instanceof File) {
      formData.append("file", FileUrl);
    } else {
      formData.append("file", null);
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      let filePath;
      if (FileUrl instanceof File) {
        const uploadFileResponse = await axios.post(
          "http://localhost:3000/media/upload",
          formData,
          config
        );
        filePath = uploadFileResponse.data.filePath;
      } else {
        filePath = selectedCourse.pdfUrl;
      }

      const updateCourseResponse = await axios.put(
        `http://localhost:3000/courses/update/${courseId}`,
        {
          title: title,
          description: description,
          pdfUrl: filePath,
          videoUrl: filePath,
          updatedAt: new Date().toISOString(),
        },
        config
      );

      console.log(updateCourseResponse.data.course);
      alert(`Course updated successfully (id: ${courseId})`);

      const updatedCourses = courses.map((course) =>
        course.id === courseId
          ? {
              ...course,
              title,
              description,
              pdfUrl: filePath,
              videoUrl: filePath,
              updatedAt: new Date().toISOString(),
            }
          : course
      );

      setCourses(updatedCourses);

      handleCloseUpdate();
    } catch (error) {
      console.error("An error occurred:", error);
      alert(
        "An error occurred during the course update process: " +
          error.response.data.message
      );
    }
  };

  const handleDeleteCourse = async (courseId) => {
    if (!window.confirm("Are you sure you want to delete this course?")) {
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.delete(
        `http://localhost:3000/courses/delete/${courseId}`,
        config
      );

      setCourses((prevCourses) =>
        prevCourses.filter((course) => course.id !== courseId)
      );

      alert(`Course deleted successfully (id: ${courseId})`);
    } catch (error) {
      console.error("Error deleting course:", error);
      alert("Failed to delete the course.");
    }
  };

  const getFileUrl = (filePath) => {
    if (!filePath) {
      console.warn("File path is undefined or null");
      return null;
    }

    const baseUrl = "http://localhost:3000/uploads/courses/";

    const fileName = filePath.split("\\").pop().split("/").pop();

    const extension = fileName.split(".").pop().toLowerCase();

    let folder = "";
    if (["jpg", "jpeg", "png", "gif", "bmp"].includes(extension)) {
      folder = "images";
    } else if (["mp4", "avi", "mov", "wmv", "mkv"].includes(extension)) {
      folder = "videos";
    } else if (["pdf"].includes(extension)) {
      folder = "pdfs";
    } else if (["docx", "doc"].includes(extension)) {
      folder = "words";
    } else if (["xlsx", "xls"].includes(extension)) {
      folder = "excels";
    } else if (["pptx", "ppt"].includes(extension)) {
      folder = "powerpoints";
    } else {
      console.warn(`Unknown file type for ${fileName}`);
      return null;
    }

    return `${baseUrl}${folder}/${fileName}`;
  };

  const renderFileIcon = (fileType) => {
    switch (fileType) {
      case "pdf":
        return <PictureAsPdfIcon />;
      case "docx":
        return <InsertDriveFileIcon />;
      case "ppt":
        return <SlideshowIcon />;
      case "xlsx":
        return <DescriptionIcon />;
      default:
        return <TextSnippetIcon />;
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleDownloadClick = async (file) => {
    const configForBlob = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: "blob",
    };

    const fileUrl = `http://localhost:3000/media/download/${file.id}`;
    const response = await axios.get(fileUrl, configForBlob);
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", file.originalName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenMedia = (type, src, title) => {
    setCurrentMedia({ type, src, title });
    setMediaOpen(true);
  };

  const handleCloseMedia = () => {
    setMediaOpen(false);
    setCurrentMedia({ type: "", src: "" });
  };

  const renderFilePreview = (fileUrl) => {
    const fileName = fileUrl.replace(/\\/g, "/").split("/").pop();

    const extension = fileName.split(".").pop().toLowerCase();

    if (["jpg", "jpeg", "png", "gif", "bmp"].includes(extension)) {
      return (
        <img
          src={getFileUrl(fileUrl)}
          alt="Current File"
          style={{ maxWidth: "30%", height: "auto" }}
        />
      );
    } else if (["mp4", "avi", "mov", "wmv", "mkv"].includes(extension)) {
      return (
        <video
          src={getFileUrl(fileUrl)}
          controls
          style={{ maxWidth: "30%", height: "auto" }}
        />
      );
    } else if (["pdf"].includes(extension)) {
      return (
        <embed
          src={getFileUrl(fileUrl)}
          type="application/pdf"
          width="100%"
          height="300px"
        />
      );
    } else {
      return <Typography variant="body2">{fileName}</Typography>;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  return (
    <ResponsiveDrawer>
      <Paper
        elevation={3}
        sx={{
          padding: 2,
          borderRadius: 2,
          ml: { xs: 0, lg: 2 },
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
            教育内容管理
          </Typography>
        </Grid>

        <Dialog
          open={mediaOpen}
          onClose={handleCloseMedia}
          fullWidth
          maxWidth="md"
        >
          <DialogTitle>{currentMedia.title}</DialogTitle>
          <DialogContent
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {currentMedia.type === "video" ? (
              <video
                style={{
                  width: "30%",
                }}
                controls
                src={currentMedia.src}
              />
            ) : (
              <img
                src={currentMedia.src}
                alt="Preview"
                style={{
                  maxWidth: "30%",
                  height: "auto",
                  objectFit: "contain",
                }}
              />
            )}
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleCloseMedia}
              variant="contained"
              sx={{
                bgcolor: "#ff0000",
                color: "white",
                "&:hover": {
                  bgcolor: "#ff6262",
                },
              }}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={updateOpen}
          onClose={handleCloseUpdate}
          fullWidth
          maxWidth="md"
        >
          <DialogTitle>Update Course</DialogTitle>
          <DialogContent
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <TextField
              autoFocus
              margin="dense"
              label="Title"
              type="text"
              fullWidth
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Description"
              type="text"
              fullWidth
              variant="outlined"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            {selectedCourse && selectedCourse.pdfUrl && (
              <Box mt={2} mb={1} textAlign="center">
                {renderFilePreview(selectedCourse.pdfUrl)}
              </Box>
            )}

            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              my={2}
            >
              <input
                accept=".jpg,.jpeg,.png,.gif,.bmp,.mov,.mp4,.avi,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                style={{ display: "none" }}
                id="file-upload"
                type="file"
                onChange={(e) => {
                  setFileUrl(e.target.files[0]);
                  const fileType = e.target.files[0].type;
                  if (fileType.startsWith("video/")) {
                    setCurrentMedia({
                      type: "video",
                      src: URL.createObjectURL(e.target.files[0]),
                      title: e.target.files[0].name,
                    });
                  } else if (fileType.startsWith("image/")) {
                    setCurrentMedia({
                      type: "image",
                      src: URL.createObjectURL(e.target.files[0]),
                      title: e.target.files[0].name,
                    });
                  }
                }}
              />
              <label htmlFor="file-upload">
                <Button variant="contained" component="span">
                  Upload New File
                </Button>
              </label>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleCloseUpdate}
              color="error"
              variant="contained"
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpdateCourse}
              color="primary"
              variant="contained"
            >
              Update
            </Button>
          </DialogActions>
        </Dialog>

        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={8}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="タイトルで検索..."
              value={searchQuery}
              onChange={handleSearchChange}
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
          <Grid item xs={6} md={2}>
            <Button
              fullWidth
              variant="contained"
              sx={{ bgcolor: "#FFA800", color: "#FFFFFF", height: "100%" }}
              startIcon={<Search />}
              onClick={() =>
                handleSearchChange({ target: { value: searchQuery } })
              }
            >
              検索
            </Button>
          </Grid>
        </Grid>

        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ minWidth: 120 }}>ファイル</TableCell>
                <TableCell sx={{ minWidth: 120 }}>タイトル</TableCell>
                <TableCell sx={{ minWidth: 120 }}>部署</TableCell>
                <TableCell sx={{ minWidth: 120 }}>更新日</TableCell>
                <TableCell sx={{ minWidth: 120 }}>作成日</TableCell>
                <TableCell align="right" sx={{ minWidth: 120 }}>
                  アクション
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? filteredCourses.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : filteredCourses
              ).map((course) => (
                <TableRow key={course.id}>
                  <TableCell align="left">
                    {course.videoUrl ? (
                      <>
                        {course.videoUrl.endsWith(".mp4") ||
                        course.videoUrl.endsWith(".avi") ? (
                          <video
                            width="90"
                            height="70"
                            controls
                            src={getFileUrl(course.videoUrl)}
                            alt={course.title}
                          />
                        ) : course.videoUrl.endsWith(".png") ||
                          course.videoUrl.endsWith(".jpg") ||
                          course.videoUrl.endsWith(".jpeg") ? (
                          <img
                            src={getFileUrl(course.videoUrl)}
                            alt={course.title}
                            width="90"
                            height="70"
                            style={{ cursor: "pointer" }}
                          />
                        ) : course.videoUrl.endsWith(".pdf") ? (
                          <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                          >
                            {renderFileIcon("pdf")}
                          </Box>
                        ) : course.videoUrl.endsWith(".docx") ? (
                          <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                          >
                            {renderFileIcon("docx")}
                          </Box>
                        ) : course.videoUrl.endsWith(".ppt") ||
                          course.videoUrl.endsWith(".pptx") ? (
                          <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                          >
                            {renderFileIcon("ppt")}
                          </Box>
                        ) : course.videoUrl.endsWith(".xlsx") ? (
                          <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                          >
                            {renderFileIcon("xlsx")}
                          </Box>
                        ) : null}
                      </>
                    ) : null}
                  </TableCell>
                  <TableCell sx={{ minWidth: 120 }}>{course.title}</TableCell>
                  <TableCell sx={{ minWidth: 120 }}>
                    {course.description}
                  </TableCell>
                  <TableCell sx={{ minWidth: 120 }}>
                    {formatDate(course.updatedAt)}
                  </TableCell>
                  <TableCell sx={{ minWidth: 120 }}>
                    {formatDate(course.createdAt)}
                  </TableCell>
                  <TableCell align="right" sx={{ minWidth: 120 }}>
                    <Box
                      display="flex"
                      justifyContent="flex-end"
                      alignItems="center"
                    >
                      {course.videoUrl &&
                      (course.videoUrl.endsWith(".mp4") ||
                        course.videoUrl.endsWith(".avi") ||
                        course.videoUrl.endsWith(".png") ||
                        course.videoUrl.endsWith(".jpg") ||
                        course.videoUrl.endsWith(".jpeg")) ? (
                        <IconButton
                          color="primary"
                          onClick={() =>
                            handleOpenMedia(
                              course.videoUrl.endsWith(".mp4") ||
                                course.videoUrl.endsWith(".avi")
                                ? "video"
                                : "image",
                              getFileUrl(course.videoUrl),
                              course.title
                            )
                          }
                        >
                          <VisibilityIcon />
                        </IconButton>
                      ) : (
                        files[course.id] &&
                        files[course.id].map((file) => (
                          <IconButton
                            key={file.id}
                            color="primary"
                            onClick={() => handleDownloadClick(file)}
                          >
                            <DownloadIcon />
                          </IconButton>
                        ))
                      )}
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
          count={filteredCourses.length}
          labelRowsPerPage="ページ :"
          rowsPerPageOptions={[5, 10, 25]}
          rowsPerPage={rowsPerPage}
        />
      </Paper>
    </ResponsiveDrawer>
  );
};

export default DashboardManagement;
