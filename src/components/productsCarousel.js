//products carousel component on home page
import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Carousel from "react-multi-carousel";
import ProductCard from "./productCard.js";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

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
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

export default function ProductsCarousel({
  data,
  error,
  isPending,
  title,
  path,
}) {
  const navigate = useNavigate();

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h4"
          component="h2"
          sx={{ display: "block", margin: { xs: 1, md: 2 } }}
        >
          {title}
        </Typography>
        <Typography
          variant="overline"
          onClick={() => navigate(path)}
          sx={{
            display: "block",
            margin: { md: 2 },
            fontWeight: "bold",
            textDecoration: "underline",
            cursor: "pointer",
          }}
        >
          View more
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
      {!isPending && !error && (
        <Carousel
          swipeable={true}
          infinite={true}
          responsive={responsive}
          keyBoardControl={true}
          //removeArrowOnDeviceType={["tablet", "mobile"]}
        >
          {data.map((product, index) => (
            <Box key={product.id}>
              <ProductCard product={product} />
            </Box>
          ))}
        </Carousel>
      )}
    </>
  );
}
