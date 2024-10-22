import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  CircularProgress,
  Container,
  Paper,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import ResponsiveDrawer from "../sidebar/SideBar";

const CreateExam = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [departments, setDepartments] = useState([]);
  
  const [courses, setCourses] = useState([]); // State to store the fetched courses
  const [selectedCourse, setSelectedCourse] = useState(""); // State to hold the selected course ID
  const [loading, setLoading] = useState(true); // State to handle loading indicator
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      const token = localStorage.getItem("token"); 
  
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      };
  
      try {
        const response = await axios.get(
          "http://localhost:3000/courses/all-courses?typeId=1",
          config // Pass the config object here
        );
        setCourses(response.data.course); // Assuming the API returns data in a `courses` array
        setLoading(false); // Stop loading once data is fetched
      } catch (err) {
        setError("Failed to fetch courses");
        setLoading(false);
      }
    };
  
    fetchCourses(); // Trigger the API call
    fetchDepartments();
  }, []);
  
  const fetchDepartments = async () => {
    try {
      const response = await axios.get("http://localhost:3000/department/getDepartmentList");
      setDepartments(response.data);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };
  // Handle input changes
  const handleTitleChange = (event) => setTitle(event.target.value);
  const handleDescChange = (event) => setDescription(event.target.value);
  const handleDepartmentChange = (event) => setDepartmentId(event.target.value);

  // Handle form submission
  const handleSubmitForm = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Include JWT in Authorization header
      },
    };

    const examData = {
      title: title,
      description: description,
      departmentId: departmentId,
      courseId: selectedCourse,
    };
    console.log(examData)
    try {
      // Make the Axios POST request
      const response = await axios.post(
        "http://localhost:3000/exam/create-exam",
        examData,
        config
      );
      alert("Exam created successfully!");
      navigate("/admin/problem/");
    } catch (error) {
      console.error(
        "Error creating exam:",
        error.response?.data || error.message
      );
      alert("Error creating exam");
    }
  };

  const handleChange = (event) => {
    setSelectedCourse(event.target.value); // Update state with the selected course ID
  };

  if (loading) return <CircularProgress />; // Show loading spinner while fetching data
  if (error) return <div>{error}</div>;

  return (
    <ResponsiveDrawer>
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ padding: 3, marginTop: 3 }}>
          <form onSubmit={handleSubmitForm}>
            {/* Title input */}
            <Box marginY={2}>
              <Typography variant="body1">タイトル</Typography>
              <TextField
                size="small"
                fullWidth
                value={title}
                onChange={handleTitleChange}
              />
            </Box>

            {/* Description input */}
            <Box marginY={2}>
              <Typography variant="body1">説明</Typography>
              <TextField
                size="small"
                fullWidth
                value={description}
                onChange={handleDescChange}
                multiline
                rows={4} 
              />
            </Box>

            {/* Department input */}
            <Box marginY={2}>
              <Typography variant="body1">部署</Typography>
              <FormControl fullWidth>
                  <Select
                    labelId="department-label"
                    id="department-select"
                    name="departmentId"
                    value={departmentId}
                    onChange={handleDepartmentChange}
                    displayEmpty
                    sx={{ "& .MuiSelect-select": { fontSize: 14 } }}
                  >
                    <MenuItem value="" disabled>Select a Department</MenuItem>
                    {departments.map((department) => (
                      <MenuItem key={department.id} value={department.id}>{department.departmentName}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
            </Box>

            {/* Course ID input */}
            <Box marginY={2}>
              <FormControl fullWidth>
                <Typography id="course-select-label">
                  コースを選択してください
                </Typography>
                <Select
                  labelId="course-select-label"
                  value={selectedCourse} 
                  onChange={handleChange} 
                  size="small"
                >
                  {/* Map through courses and display title with ID */}
                  {courses?.length > 0 ? (
                    courses.map((course) => (
                      <MenuItem key={course.id} value={course.id}>
                        {`${course.title} (id:${course.id})`}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>コースはありません。</MenuItem> 
                  )}
                </Select>
              </FormControl>
            </Box>

            {/* Button section */}
            <Box display="flex" justifyContent="flex-end" marginTop={5}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ marginRight: 2 }} 
              >
                提出する
              </Button>
              <Button
                variant="contained"
                onClick={() => navigate("/admin/problem/")}
                sx={{
                  backgroundColor: "red",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "darkred",
                  },
                  "&:active": {
                    backgroundColor: "darkred",
                  },
                }}
              >
                キャンセル
              </Button>
            </Box>
          </form>
        </Paper>
      </Container>
    </ResponsiveDrawer>
  );
};

export default CreateExam;
