//categories carousel at home page
import React from "react";
import CategoryCard from "./categoryCard.js";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Carousel from "react-multi-carousel";
import Stack from "@mui/material/Stack";
import "react-multi-carousel/lib/styles.css";
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2.5,
  },
};

export default function CategoryList(props) {
  const data = props.data;
  const error = props.error;
  const isPending = props.isPending;
  const navigate = useNavigate();

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h4"
          component="h2"
          sx={{ display: "block", margin: { xs: 1, md: 2 } }}
        >
          Categories
        </Typography>
        <Typography
          variant="overline"
          onClick={() => navigate("categories")}
          sx={{
            display: "block",
            margin: { md: 2 },
            fontWeight: "bold",
            textDecoration: "underline",
            cursor: "pointer",
          }}
        >
          Show all
        </Typography>
      </Box>
      {error}
      {isPending && (
        <Stack>
          <Box m="auto">
            <CircularProgress />
          </Box>
        </Stack>
      )}
      <Carousel
        swipeable={true}
        infinite={true}
        responsive={responsive}
        autoPlay={props.deviceType == "mobile" || "tablet" ? true : false}
        autoPlaySpeed={1000}
        keyBoardControl={true}
        //removeArrowOnDeviceType={["tablet", "mobile"]}
      >
        {!isPending &&
          !error &&
          data.map((category, index) => (
            <div onClick={() => navigate(category)} key={category}>
              <CategoryCard
                mywidth={props.mywidth}
                images={props.images[index]}
                category={category}
              />
            </div>
          ))}
      </Carousel>
    </>
  );
}
