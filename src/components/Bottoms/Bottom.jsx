import * as React from "react";

import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);

  const useStyles = {
    position: "fixed",
    display: { lg: 'none',sm: 'none',xs: 'flex' },
    bottom: 0,
    width: "100%",
  };

  const bottom = {
    padding: "0px 0px",
  '.Mui-selected':{
        
    }

  };
  return (
 
      <BottomNavigation
        showLabels
        sx={useStyles}
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction sx={bottom} label="ホーム" icon={<HomeIcon />} />
        <BottomNavigationAction sx={bottom} label="検索" icon={<SearchIcon />} />
        <BottomNavigationAction sx={bottom} label="カテゴリー" icon={<LibraryBooksIcon />} />
        <BottomNavigationAction sx={bottom} label="プロフィール" icon={<AccountCircleIcon />} />
      </BottomNavigation>
  );
}
