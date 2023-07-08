//component for every cart item
import React, { useState, useEffect } from "react";
import MuiSelect from "./mui/muiSelect.js";
import MenuItem from "@mui/material/MenuItem";
import {
  incrementQuantity,
  decrementQuantity,
  removeItem,
  changeSize,
} from "../redux/cartSlice";
import { useDispatch } from "react-redux";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import ProductControl from "./productControl.js";

function CartItem({
  id,
  image,
  title,
  price,
  discount,
  discountedPrice,
  quantity = 0,
}) {
  const dispatch = useDispatch();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        display="flex"
        sx={{
          flexDirection: { xs: "column", md: "row" },
          padding: { xs: 2, md: "auto" },
        }}
        alignItems="center"
        justifyContent="center"
      >
        <Grid xs={10} md={3} sx={{ padding: { xs: 1.3, md: "auto" } }}>
          <img style={{ width: 120 }} src={image} alt="item" />
        </Grid>
        <Grid xs={4} md={3} sx={{ padding: { xs: 1.3, md: "auto" } }}>
          <p className="cartItem__title">{title}</p>
          <p className="cartItem__price">
            <small>$</small>
            <strong>{discount ? discountedPrice : price}</strong>
          </p>
        </Grid>
        <Grid xs={12} md={5} sx={{ padding: { xs: 1.3, md: "auto" } }}>
          <ProductControl quantity={quantity} id={id}>
            <Stack>
              <p className="cartItem__title">Total</p>
              <p className="cartItem__price">
                <small>$</small>
                <strong>
                  {discount ? discountedPrice * quantity : price * quantity}
                </strong>
              </p>
            </Stack>
          </ProductControl>
        </Grid>
      </Grid>
    </Box>
  );
}
export default CartItem;
