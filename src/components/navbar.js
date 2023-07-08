//navbar component
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { handleCartModal } from "../redux/cartSlice";
import { useDispatch } from "react-redux";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MuiSideNav from "./mui/muiSideNav.js";
import TextField from "@mui/material/TextField";
import NavbarSearch from "./navbarSearch.js";
import Grow from "@mui/material/Grow";

//styled component for links in home page
const linkrSX = {
  fontSize: 25,
  fontFamily: "revicons",
  textDecoration: "none",
  transitionProperty: "text-decoration",
  transitionDuration: 3,
  transitionTimingFunction: "ease-in-out",
  "&::after": {
    content: "''",
    width: 0,
    height: "1px",
    display: "block",
    background: "#fff",
    transition: "300ms",
  },
  "&:hover::after": {
    width: "100%",
  },
};

export default function PrimarySearchAppBar(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  //total cart items
  const getTotalQuantity = () => {
    let total = 0;
    cart.forEach((item) => {
      total += item.quantity;
    });
    return total;
  };

  const pages = ["Products", "Categories", "favourite"];
  //open side bar
  const [sliderOpen, setSliderOpen] = React.useState(false);
  const toggleSlider = () => {
    setSliderOpen(!sliderOpen);
  };
  //open search dialog for mobile
  const [searchOpen, setSearchOpen] = React.useState(false);
  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ background: "#000" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={toggleSlider}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              display: { sm: "block" },
              overflow: "visible",
              cursor: "pointer",
              fontFamily: "fantasy",
              fontSize: { xs: 50, md: 70 },
            }}
            onClick={() => navigate("/")}
          >
            Story
          </Typography>
          <Box
            m="auto"
            sx={{ display: { xs: "none", md: "flex" }, gap: 5, padding: 5 }}
          >
            <Box sx={{ cursor: "pointer" }} onClick={() => navigate("/")}>
              <Typography sx={linkrSX} textAlign="center">
                Home
              </Typography>
            </Box>
            {pages.map((page) => (
              <Box
                sx={{ cursor: "pointer" }}
                key={page}
                onClick={() => navigate(page)}
              >
                <Typography sx={linkrSX} textAlign="center">
                  {page}
                </Typography>
              </Box>
            ))}
          </Box>
          <div></div>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", lg: "flex" }, width: "80%" }}>
            <NavbarSearch />
          </Box>
          <Box sx={{ display: "flex" }}>
            <IconButton
              sx={{ display: { lg: "none" } }}
              size="large"
              aria-label="show Search"
              color="inherit"
              onClick={toggleSearch}
            >
              <SearchIcon fontSize="inherit" />
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
              onClick={() => dispatch(handleCartModal())}
            >
              <Badge badgeContent={getTotalQuantity() || 0} color="error">
                <ShoppingCartIcon fontSize="inherit" />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              color="inherit"
              sx={{ display: { xs: "none", md: "flex" } }}
            >
              <AccountCircle fontSize="inherit" />
            </IconButton>
          </Box>
          <MuiSideNav
            data={props.data}
            open={sliderOpen}
            toggleSlider={toggleSlider}
          />
        </Toolbar>

        <Box sx={{ flexGrow: 1 }} />
        <Box
          m="auto"
          sx={{
            display: { xs: searchOpen ? "flex" : "none", lg: "none" },
            width: "80%",
            padding: 2,
          }}
        >
          <NavbarSearch />
        </Box>
      </AppBar>
      <Toolbar sx={{ height: { xs: 80, md: 115 } }} />
      <Grow
        in={searchOpen}
        style={{ transformOrigin: "0 0 0" }}
        {...(searchOpen ? { timeout: 1000 } : {})}
      >
        <Toolbar
          sx={{
            height: { xs: 80, md: 115 },
            display: searchOpen ? "block" : "none",
          }}
        />
      </Grow>
    </Box>
  );
}
