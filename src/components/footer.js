//app footer
import React from "react";
import { styled } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import IconButton from "@mui/material/IconButton";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";

const FooterLink = styled("div")(({ theme }) => ({
  marginLeft: theme.spacing(3),
  marginRight: theme.spacing(3),
  color: "#fff",
  fontSize: 25,
  cursor: "pointer",
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
  [theme.breakpoints.down("md")]: {
    marginBottom: theme.spacing(2),
  },
}));
const FooterNav = styled("div")(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  marginBottom: theme.spacing(0),
  width: "100%",
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(2),
}));

const RootBox = styled("div")(({ theme }) => ({
  background: "#000",
  marginTop: 100,
  [theme.breakpoints.down("md")]: {
    justifyContent: "center",
  },
}));

export default function Footer(props) {
  const navigate = useNavigate();
  const content = {
    brand: {
      /*image: 'https://img.freepik.com/premium-vector/shopping-data-logo-design-template_145155-372.jpg?w=2000', width: 90 */
    },
    copy: "© 2022 Story All rights reserved.",
    link1: "Home",
    link2: "Products",
    link3: "About us",
    link4: "Contact us",
    ...props.content,
  };

  let brand;

  if (content.brand.image) {
    brand = (
      <img
        src={content.brand.image}
        alt=""
        width={content.brand.width}
        style={{ borderRadius: 50 }}
      />
    );
  } else {
    brand = content.brand.text || (
      <Typography
        variant="h6"
        noWrap
        component="div"
        sx={{
          display: { sm: "block" },
          overflow: "visible",
          cursor: "pointer",
          fontFamily: "fantasy",
          color: "#fff",
          marginLeft: 3,
          fontSize: { xs: 50, md: 70 },
        }}
        onClick={() => navigate("/")}
      >
        Story
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        position: "absolute",
        bottom: "0",
        width: "100%",
        height: "2.5rem",
        marginTop: 5,
      }}
    >
      <RootBox py={6} display="flex" flexWrap="wrap" alignItems="center">
        <Link
          style={{ marginLeft: "25px", marginTop: "25px" }}
          href="#"
          color="inherit"
          underline="none"
        >
          {brand}
        </Link>
        <FooterNav component="nav">
          <FooterLink
            onClick={() => navigate("/")}
            href="#"
            variant="body1"
            color="textPrimary"
          >
            {content["link1"]}
          </FooterLink>
          <FooterLink
            onClick={() => navigate(content["link2"])}
            href="#"
            variant="body1"
            color="textPrimary"
          >
            {content["link2"]}
          </FooterLink>
          <FooterLink
            onClick={() => navigate(content["link3"])}
            href="#"
            variant="body1"
            color="textPrimary"
          >
            {content["link3"]}
          </FooterLink>
          <FooterLink
            onClick={() => navigate(content["link4"])}
            href="#"
            variant="body1"
            color="textPrimary"
          >
            {content["link4"]}
          </FooterLink>
        </FooterNav>
        <ButtonGroup
          sx={{ marginLeft: 3 }}
          variant="contained"
          aria-label="outlined primary button group"
        >
          <IconButton aria-label="facebook">
            <FacebookIcon style={{ color: "#fff" }} />
          </IconButton>
          <IconButton aria-label="facebook">
            <TwitterIcon style={{ color: "#fff" }} />
          </IconButton>
          <IconButton aria-label="facebook">
            <InstagramIcon style={{ color: "#fff" }} />
          </IconButton>
          <IconButton aria-label="facebook">
            <YouTubeIcon style={{ color: "#fff" }} />
          </IconButton>
        </ButtonGroup>
        <Typography
          sx={{ marginLeft: 3 }}
          color="#fff"
          component="p"
          variant="caption"
          gutterBottom={false}
        >
          {content["copy"]}
        </Typography>
      </RootBox>
    </Box>
  );
}
