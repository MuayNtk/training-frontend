import { useState, useEffect } from "react";
import {
  Button,
  Typography,
  Container,
  Paper,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import ResponsiveDrawer from "../sidebar/SideBar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EnrollCreate = () => {
  const [selectedUsers, setSelectedUsers] = useState([""]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const response = await axios.get(
          "http://localhost:3000/auth/users",
          config
        );
        const filteredUsers = response.data.filter(user => user.role === "User");
        setUsers(filteredUsers);
      } catch (error) {
        console.error("ユーザーの取得エラー:", error);
        setMessage("ユーザーの取得に失敗しました");
      }
    };

    const fetchCourses = async () => {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const response = await axios.get(
          "http://localhost:3000/courses/all-courses",
          config
        );
        setCourses(response.data.course);
      } catch (err) {
        console.error("コースの取得エラー:", err);
        setError("コースの取得に失敗しました");
      }
    };

    fetchUsers();
    fetchCourses();
  }, []);

  const handleDropdownChange = (index, event) => {
    const { value } = event.target;
    const newSelectedUsers = [...selectedUsers];
    newSelectedUsers[index] = value;
    setSelectedUsers(newSelectedUsers);
  };

  const handleCourseChange = (event) => {
    const { value } = event.target;
    setSelectedCourse(value);
  };

  const handleAddUserDropdown = () => {
    setSelectedUsers([...selectedUsers, ""]);
  };

  const handleRemoveUserDropdown = (index) => {
    const newSelectedUsers = selectedUsers.filter((_, i) => i !== index);
    setSelectedUsers(newSelectedUsers);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (selectedUsers.some((user) => !user) || !selectedCourse) {
      setMessage("ユーザーとコースを選択してください。");
      return;
    }

    try {
      const usersToEnroll = selectedUsers.map((userId) => ({ userId }));

      const response = await axios.post(
        `http://localhost:3000/courses/enroll/multiple`,
        {
          courseId: selectedCourse,
          users: usersToEnroll,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        setMessage(response.data.message);
        navigate("/admin/enrolluser");
      }
    } catch (error) {
      console.error(
        "ユーザー登録エラー:",
        error.response ? error.response.data : error.message
      );
      setMessage("ユーザーの登録に失敗しました。再試行してください。");
    }
  };

  const handleCancel = () => navigate("/admin/enrolluser");

  const getAvailableUsers = (index) => {
    const selectedUserIds = selectedUsers.filter((user, i) => i !== index);
    return users.filter((user) => !selectedUserIds.includes(user.id));
  };

  return (
    <ResponsiveDrawer>
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ padding: 3, marginTop: 3 }}>
          <Typography variant="h5" component="h1" gutterBottom>
            EnrollCreate
          </Typography>
          <form onSubmit={handleSubmit}>
            <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel>コースを選択</InputLabel>
              <Select
                value={selectedCourse}
                onChange={handleCourseChange}
                label="コースを選択"
              >
                {courses.map((course) => (
                  <MenuItem key={course.id} value={course.id}>
                    {`${course.title}`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <div style={{ display: "flex", alignItems: "center" }}>
              <FormControl fullWidth variant="outlined" margin="normal">
                <InputLabel>ユーザーを選択</InputLabel>
                <Select
                  value={selectedUsers[0]}
                  onChange={(event) => handleDropdownChange(0, event)}
                  label="ユーザーを選択"
                >
                  {getAvailableUsers(0).map((user) => (
                    <MenuItem key={user.id} value={user.id}>
                      {`${user.firstName} ${user.lastName}`}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            {selectedUsers.slice(1).map((user, index) => (
              <div
                key={index + 1}
                style={{ display: "flex", alignItems: "center" }}
              >
                <FormControl fullWidth variant="outlined" margin="normal">
                  <InputLabel>ユーザーを選択</InputLabel>
                  <Select
                    value={selectedUsers[index + 1]}
                    onChange={(event) => handleDropdownChange(index + 1, event)}
                    label="ユーザーを選択"
                  >
                    {getAvailableUsers(index + 1).map((user) => (
                      <MenuItem key={user.id} value={user.id}>
                        {`${user.firstName} ${user.lastName}`}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => handleRemoveUserDropdown(index + 1)}
                  sx={{ ml: 1 }}
                >
                  削除
                </Button>
              </div>
            ))}

            <Button
              variant="contained"
              color="primary"
              onClick={handleAddUserDropdown}
              sx={{ mt: 2 }}
            >
              + ユーザーを追加
            </Button>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: 2,
              }}
            >
              <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{ ml: 2 }}
              >
                提出する
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleCancel}
                sx={{ ml: 2 }}
              >
                キャンセル
              </Button>
            </div>

            {message && <Typography color="error">{message}</Typography>}
            {error && <Typography color="error">{error}</Typography>}
          </form>
        </Paper>
      </Container>
    </ResponsiveDrawer>
  );
};

export default EnrollCreate;
