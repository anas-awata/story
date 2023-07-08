//component for products increasment or decrement or delete buttons
import React from "react";
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
import Box from "@mui/material/Box";

export default function ProductControl(props) {
  const dispatch = useDispatch();
  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{ paddingLeft: 3, flexWrap: "wrap" }}
    >
      <IconButton
        onClick={() => dispatch(decrementQuantity(props.id))}
        aria-label="Add"
      >
        <RemoveIcon />
      </IconButton>
      <Box sx={{ display: "flex", alignItems: "end" }}>
        <Typography variant="body1" gutterBottom>
          {props.quantity}
        </Typography>
      </Box>
      <IconButton
        onClick={() => dispatch(incrementQuantity(props.id))}
        aria-label="Add"
      >
        <AddIcon />
      </IconButton>
      <Stack>{props.children}</Stack>
      <IconButton
        onClick={() => dispatch(removeItem(props.id))}
        aria-label="delete"
      >
        <DeleteIcon />
      </IconButton>
    </Stack>
  );
}
