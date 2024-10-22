import { useState, useEffect } from "react";
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import jpspng from "../../asserts/jpspng.svg";
import CategoryIcon from "@mui/icons-material/Category";
import HomeIcon from "@mui/icons-material/Home";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import EngineeringIcon from "@mui/icons-material/Engineering";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import BallotIcon from "@mui/icons-material/Ballot";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import RoomPreferencesIcon from "@mui/icons-material/RoomPreferences";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LocalPostOfficeIcon from "@mui/icons-material/LocalPostOffice";

const drawerWidth = 240;

const ResponsiveDrawer = ({ window, children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  //เพิ่ม
  const menuItems = [
    { text: "ホーム", icon: <HomeIcon />, path: "/admin/dashboard/" },
    {
      text: "工程教育資料管理",
      icon: <EngineeringIcon />,
      path: "/admin/dashboard-management",
      path2: "/admin/dashboard-management/video-upload",
    },
    {
      text: "教育内容管理",
      icon: <LibraryBooksIcon />,
      path: "/admin/education-management",
      path2: "/admin/education-management/video-upload",
    },
    {
      text: "作業要領書管理",
      icon: <AccountTreeIcon />,
      path: "/admin/work-management",
      path2: "/admin/work-management/video-upload",
    },
    {
      text: "ワンポイントレッスン管理",
      icon: <NoteAltIcon />,
      path: "/admin/lesson-management",
      path2: "/admin/lesson-management/opl-create",
    },
    {
      text: "問題集管理",
      icon: <BallotIcon />,
      path: "/admin/problem",
      path2: "/admin/quiz-select",
    },

    {
      text: "社員評価",
      icon: <HowToRegIcon />,
      path: "/admin/employee-review",
    },
    {
      text: "会社管理",
      icon: <RoomPreferencesIcon />,
      path: "/admin/company/",
      path3: "/admin/company/edit/:id",
      path2: "/admin/company/create",
    },
    {
      text: "社員管理",
      icon: <ManageAccountsIcon />,
      path: "/admin/user-manage/",
      path3: "/admin/user-manage/edit/:id",
      path2: "/admin/user-manage/create",
    },
    {
      text: "所属部署",
      icon: <RoomPreferencesIcon />,
      path: "/admin/department/",
      path3: "/admin/department/edit/:id",
      path2: "/admin/department/create",
    },
    {
      text: "UserEnroll",
      icon: <ManageAccountsIcon />,
      path: "/admin/enrolluser/",
      path2: "/admin/enrollCreate",
    },
  ];
  //เพิ่ม
  const appbarItems = [
    { text: "ダッシュボード", path: "/admin/dashboard/" },
    {
      text: "教育内容管理 ► リスト",
      path: "/admin/education-management",
    },
    {
      text: "作業要領書管理 ► リスト",
      path: "/admin/work-management",
    },
    {
      text: "工程教育資料管理 ► リスト",
      path: "/admin/dashboard-management",
    },
    {
      text: "ワンポイントレッスン管理 ► リスト",
      path: "/admin/lesson-management",
    },
    { text: "問題集管理 ► リスト", path: "/admin/problem" },

    {
      text: "社員評価 ► リスト",
      path: "/admin/employee-review",
    },
    {
      text: "会社管理 ► リスト",
      path: "/admin/company/",
    },
    {
      text: "社員管理 ► リスト",
      path: "/admin/user-manage/",
    },
    {
      text: "社員管理 ► edit",
      path: "/admin/user-manage/edit",
    },
    {
      text: "教育内容管理 ► 作成済み",
      path: "/admin/education-management/video-upload",
    },
    {
      text: "工程教育資料管理 ► 作成済み",
      path: "/admin/dashboard-management/video-upload",
    },
    {
      text: "作業要領書管理 ► 作成済み",
      path: "/admin/work-management/video-upload",
    },
    {
      text: "ワンポイントレッスン管理 ► 作成済み",
      path: "/admin/lesson-management/opl-create",
    },
    {
      text: "会社管理 ► edit",
      path: "/admin/company/edit",
    },
    {
      text: "社員管理 ► 作成済み",
      path: "/admin/user-manage/create",
    },
    {
      text: "会社管理 ► 作成済み",
      path: "/admin/company/create",
    },
    {
      text: "問題集管理 ► 作成済み",
      path: "/admin/quiz-select",
    },
    {
      text: "Enroll Dashboard",
      path: "/admin/enrolluser/",
    },
    {
      text: "Enroll user",
      path: "/admin/enrollCreate",
    },
  ];

  const icons = {
    minWidth: "30px",
    maxHeight: "25px",
    color: "#FFFFFF",
  };

  const ul = {
    padding: "10px",
    pl: "20px",
    pr: "20px",
    display: "flex",
    flexDirection: "column",
    textDecoration: "none",
  };

  const divider = {
    ml: "20px",
    mr: "20px",
    borderColor: "#FFFFFF",
    border: "1px solid",
  };

  const logo = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };

  const hover = {
    borderRadius: "8px",
    pt: "4px",
    pb: "4px",
    pl: "8px",
    pr: "10px",
    mt: 1,
    "&:hover": {
      backgroundColor: "#A6B1E1",
      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.25)",
      borderRadius: "8px",
    },

    "&.Mui-selected:hover": {
      backgroundColor: "#A6B1E1",
    },

    "&.Mui-selected": {
      backgroundColor: "#424874",
    },
  };

  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  //เพิ่ม

  const [currentMenuItem, setCurrentMenuItem] = useState("");
  const [auth] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const { pathname } = useLocation();

  //เพิ่ม
  useEffect(() => {
    // ตรวจสอบเมื่อ pathname เปลี่ยนแปลงและอัพเดต currentMenuItem
    const appbarItem = appbarItems.find((item) => item.path === pathname);
    if (appbarItem) {
      setCurrentMenuItem(appbarItem.text);
    }
  }, [pathname, appbarItems]);

  const drawer = (
    <div>
      <Toolbar sx={{ mb: "20px" }}>
        <Box sx={logo}>
          <img width="200px" height="81.95px" src={jpspng} />
        </Box>
      </Toolbar>
      {/* เพิ่ม */}
      <List sx={ul}>
        {menuItems.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              component={RouterLink}
              to={item.path}
              sx={hover}
              selected={
                pathname === item.path ||
                (item.path2 && pathname === item.path2) ||
                (item.path3 && pathname === item.path3) ||
                (pathname.includes(item.path)) ||
                (pathname.includes(item.path2)) 
              }
            >
              <ListItemIcon sx={icons}>{item.icon}</ListItemIcon>
              <ListItemText
                primaryTypographyProps={{ fontSize: "12px", fontWeight: 700 }}
                primary={item.text}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="fixed"
          sx={{
            width: { lg: `calc(100% - ${drawerWidth}px)` },
            ml: { lg: `${drawerWidth}px` },
            backgroundColor: "#35314E",
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { lg: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            {/* เพิ่ม */}
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1 }}
            >
              {currentMenuItem}
            </Typography>

            {auth && (
              <div>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  {/* <MenuItem onClick={handleClose}>Profile</MenuItem> */}
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </Box>

      <Box
        component="nav"
        sx={{ width: { lg: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", lg: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#535C91",
              color: "#FFFFFF",
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", lg: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#535C91",
              color: "#FFFFFF",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: "12px", sm: 3, lg: 3 },
          width: { lg: `calc(100% - ${drawerWidth}px)` },
          mr: { md: "4rem", lg: 0 },
          display: "flex",
          justifyContent: "center",
          mt: 8,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default ResponsiveDrawer;
