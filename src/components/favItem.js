//component for every favourite item
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveIcon from "@mui/icons-material/Remove";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { removeFav } from "../redux/cartSlice";
import AddToCartBtn from "./mui/addToCartBtn.js";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";

function FavItem({ id, image, title, price, discount, discountedPrice }) {
  const dispatch = useDispatch();

  return (
    <Box sx={{ flexGrow: 1, marginTop: 3 }}>
      <Grid
        display="flex"
        sx={{
          flexDirection: { xs: "column", md: "row" },
          padding: { md: 0 },
          justifyContent: { xs: "center", md: "space-evenly" },
          alignItems: "center",
        }}
      >
        <Grid xs={8} md={4} sx={{ padding: { md: 0 } }}>
          <Stack>
            <Box m="auto">
              <img style={{ width: 200 }} src={image} alt="item" />
            </Box>
          </Stack>
        </Grid>
        <Grid xs={5} md={1} sx={{ padding: { md: 0 } }}>
          <Stack>
            <Box m="auto">
              <p className="cartItem__price">
                <small>$</small>
                <strong>{discount >= 15 ? discountedPrice : price}</strong>
              </p>
            </Box>
          </Stack>
        </Grid>
        <Grid xs={5} md={2} sx={{ padding: { md: 0 } }}>
          <Stack>
            <Box m="auto">
              <p className="cartItem__title">{title}</p>
            </Box>
          </Stack>
        </Grid>
        <Grid xs={8} md={3} sx={{ minWidth: 200, padding: { md: 0 } }}>
          <Stack>
            <Box m="auto">
              <AddToCartBtn
                id={id}
                title={title}
                price={price}
                image={image}
                discount={discount}
                discountedPrice={discountedPrice}
              />
            </Box>
          </Stack>
        </Grid>
        <Grid xs={8} md={2} sx={{ padding: { md: 0 } }}>
          <Stack>
            <Box m="auto">
              <Button
                endIcon={<DeleteIcon />}
                onClick={() => dispatch(removeFav(id))}
                variant="outlined"
                color="error"
              >
                Delete
              </Button>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
export default FavItem;
