//page for single product discreption
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../hooks/usefetch.js";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { useSelector } from "react-redux";
import ProductControl from "../components/productControl.js";
import Button from "@mui/material/Button";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Carousel from "react-material-ui-carousel";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";

export default function Product() {
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const { product, id } = useParams();
  const { data, isPending, error } = useFetch(
    `https://dummyjson.com/products/category/${product}`
  );
  let myProduct;
  if (data) {
    data.products.map((p) => {
      if (p.id == id) {
        myProduct = p;
      }
    });
  }
  let discount;
  let discountedPrice;
  if (myProduct) {
    discount =
      Math.round(myProduct.discountPercentage) > 15
        ? Math.round(myProduct.discountPercentage)
        : null;
    discountedPrice =
      myProduct.price - Math.round((myProduct.price * discount) / 100);
  }
  const isAdded = cart.find((item) => item.id == id);
  const dispatch = useDispatch();

  return (
    <>
      {isPending && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: { md: 500, xs: 700 },
          }}
        >
          <Box m="auto">
            <CircularProgress />
          </Box>
        </Box>
      )}
      {!isPending && myProduct && (
        <div>
          <Breadcrumbs
            sx={{ padding: { xs: 2, md: 4 } }}
            aria-label="breadcrumb"
          >
            <Link
              underline="hover"
              color="inherit"
              sx={{ cursor: "pointer" }}
              onClick={() => navigate(`/${myProduct.category}`)}
            >
              {myProduct.category}
            </Link>
            <Typography color="text.primary">{myProduct.title}</Typography>
          </Breadcrumbs>
          <Box sx={{ flexGrow: 1 }}>
            <Grid
              display="flex"
              alignItems="center"
              justifyContent="center"
              sx={{ flexDirection: { xs: "column", md: "row" }, padding: 3 }}
            >
              <Grid
                md={8}
                sx={{ alignItems: "center", minWidth: { xs: 300, md: 450 } }}
              >
                <Carousel navButtonsAlwaysVisible={true}>
                  {myProduct.images.map((image, index) => (
                    <Box
                      component="img"
                      sx={{
                        width: "-webkit-fill-available",
                        minHeight: { xs: 300, md: 400 },
                        maxHeight: { xs: 300, md: 400 },
                        maxWidth: { xs: 350, md: 400 },
                        borderRadius: 4,
                      }}
                      alt={myProduct.title}
                      src={image}
                      key={index}
                    />
                  ))}
                </Carousel>
              </Grid>
              <Grid md={4}>
                <Grid
                  display="flex"
                  sx={{
                    flexDirection: "column",
                    padding: { md: 10, xs: 2 },
                    gap: 3,
                  }}
                  alignItems="strech"
                  justifyContent="center"
                >
                  <h1>{myProduct.title}</h1>
                  <Typography
                    variant="h6"
                    sx={{
                      textDecoration: discount >= 15 ? "line-through" : "none",
                      textDecorationColor: "#ef2222bd",
                      color: discount >= 15 ? "#df0707" : "green",
                    }}
                  >
                    {myProduct.price} $
                  </Typography>
                  <Typography
                    variant="h6"
                    component="p"
                    sx={{ color: "green" }}
                  >
                    {discount >= 15 ? discountedPrice + " $" : ""}
                  </Typography>
                  {discount >= 15 && (
                    <Typography variant="body2" color="text.secondary">
                      discount: {discount}%
                    </Typography>
                  )}
                  <div>{myProduct.description}</div>
                  {!isAdded && (
                    <Button
                      sx={{ width: 1 / 1 }}
                      onClick={() =>
                        dispatch(
                          addToCart({
                            id,
                            title: myProduct.title,
                            price: myProduct.price,
                            image: myProduct.thumbnail,
                            discount: discount,
                            discountedPrice: discountedPrice,
                          })
                        )
                      }
                      variant="outlined"
                    >
                      Add to Cart
                      <ShoppingCartIcon />
                    </Button>
                  )}
                  {isAdded && (
                    <>
                      <ProductControl id={id} quantity={isAdded.quantity} />
                    </>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </div>
      )}
    </>
  );
}
