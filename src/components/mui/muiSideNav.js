//side bar
import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import Drawer from "@mui/material/Drawer";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import CategoryIcon from "@mui/icons-material/Category";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import AutoAwesomeMotionIcon from "@mui/icons-material/AutoAwesomeMotion";

export default function MuiSideNav(props) {
  const data = props.data;
  var categories = [];
  if (data) {
    data.map((category) => {
      categories.push({ name: category, path: category });
    });
  }
  const listItems = [
    {
      listIcon: <HomeIcon style={{ color: "#fff" }} />,
      listText: "Home",
      path: "/",
    },
    {
      listIcon: <StarIcon style={{ color: "#fff" }} />,
      listText: "Favourite",
      path: "favourite",
    },
    {
      listIcon: <AutoAwesomeMotionIcon style={{ color: "#fff" }} />,
      listText: "Products",
      path: "products",
    },
    {
      listIcon: <CategoryIcon style={{ color: "#fff" }} />,
      listText: "Categories",
      categories: categories,
    },
  ];

  const navigate = useNavigate();
  const toggleNavigate = (listItem) => {
    navigate(listItem.path);
    if (listItem.path) {
      props.toggleSlider();
    }
  };

  const [categoryOpen, setCategoryOpen] = React.useState(true);

  const handleCategory = () => {
    setCategoryOpen(!categoryOpen);
  };

  const sideList = () => (
    <Box
      sx={{ width: { xs: 250, md: 400 }, background: "#111", height: "100%" }}
    >
      <Avatar
        src="https://i.ibb.co/rx5DFbs/avatar.png"
        alt="Juaneme8"
        sx={{
          margin: "0.5rem auto",
          padding: "1rem",
          width: 150,
          height: 150,
          background: "#eaf0f1",
        }}
      />
      <Divider />
      <List>
        {listItems.map((listItem, index) => (
          <>
            <ListItem
              onClick={() => toggleNavigate(listItem)}
              sx={{ color: "white" }}
              button
              key={index}
            >
              <ListItemIcon>{listItem.listIcon}</ListItemIcon>
              <ListItemText primary={listItem.listText} />
              {listItem.listText == "Categories" && (
                <>
                  <Box onClick={handleCategory}>
                    {categoryOpen ? <ExpandLess /> : <ExpandMore />}
                  </Box>
                </>
              )}
            </ListItem>
            {listItem.listText == "Categories" && (
              <Collapse in={categoryOpen} timeout="auto" unmountOnExit>
                <List
                  sx={{ background: "#111" }}
                  component="div"
                  disablePadding
                >
                  {listItem.categories.map((category, index) => (
                    <ListItemButton
                      key={index}
                      sx={{ pl: 13 }}
                      onClick={() => toggleNavigate(category)}
                    >
                      <ListItemText
                        primary={category.name}
                        sx={{ color: "#fff" }}
                      />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            )}
          </>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <Drawer open={props.open} anchor="left" onClose={props.toggleSlider}>
        {sideList()}
      </Drawer>
    </div>
  );
}
