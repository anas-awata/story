//button to handle adding to cart
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { addToCart } from "../../redux/cartSlice";
import { removeItem } from "../../redux/cartSlice";
import CircularProgress from "@mui/material/CircularProgress";

export default function AddToCartBtn({
  id,
  image,
  title,
  price,
  discount,
  discountedPrice,
  selectedSize,
  size,
}) {
  const [addingLoading, setAddingLoading] = useState(false);
  const [removeLoading, setRemoveLoading] = useState(false);
  const cart = useSelector((state) => state.cart);
  const added = cart.find((item) => item.id === id);
  const dispatch = useDispatch();

  //Add to cart
  const handleAdding = () => {
    dispatch(
      addToCart({
        id,
        title,
        price,
        image,
        discount,
        discountedPrice /*,size, selectedSize*/,
      })
    );
    setAddingLoading(true);
  };

  //Remove from card
  const handleRemove = () => {
    dispatch(removeItem(id));
    setRemoveLoading(true);
  };

  //check if item added after adding or display loading
  useEffect(() => {
    const itemInCart = cart.find((item) => item.id === id);
    if (itemInCart) {
      setAddingLoading(false);
    }
  }, [addingLoading]);

  //check if item removed after removing or display loading
  useEffect(() => {
    const itemInCart = cart.find((item) => item.id === id);
    if (!itemInCart) {
      setRemoveLoading(false);
    }
  }, [removeLoading]);

  return (
    <div>
      {!added && (
        <Button onClick={handleAdding} variant="outlined">
          {addingLoading ? <CircularProgress size="2rem" /> : "Add to Cart"}
          {!addingLoading && <ShoppingCartIcon />}
        </Button>
      )}
      {added && (
        <Button color="error" onClick={handleRemove} variant="outlined">
          {removeLoading ? (
            <CircularProgress size="2rem" />
          ) : (
            "remove from cart"
          )}
          {!removeLoading && <ShoppingCartIcon />}
        </Button>
      )}
    </div>
  );
}
