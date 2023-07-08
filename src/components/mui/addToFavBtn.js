//button to handle adding to favourite
import React, { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useDispatch, useSelector } from "react-redux";
import { addToFav, removeFav } from "../../redux/cartSlice";
import CircularProgress from "@mui/material/CircularProgress";

export default function AddToFavBtn(props) {
  const dispatch = useDispatch();
  const fav = useSelector((state) => state.fav);
  const [addingFavLoading, setAddingFavLoading] = useState(false);
  const [removeFavLoading, setRemoveFavLoading] = useState(false);
  const favAdded = fav.find((item) => item.id === props.id);

  //Add to favourite
  const handleFavAdding = () => {
    dispatch(
      addToFav({
        id: props.id,
        title: props.title,
        price: props.price,
        image: props.image,
        discount: props.discount,
        discountedPrice:
          props.discountedPrice /*,size:props.size, selectedSize:"M"*/,
      })
    );
    setAddingFavLoading(true);
    console.log(fav);
  };
  //Remove from favourite
  const handleFavRemove = () => {
    dispatch(removeFav(props.id));
    setRemoveFavLoading(true);
  };
  //check if item added to favourite after adding or display loading
  useEffect(() => {
    const itemInFav = fav.find((item) => item.id === props.id);
    if (itemInFav) {
      setAddingFavLoading(false);
    }
  }, [addingFavLoading]);

  //check if item removed from favourite after removing or display loading
  useEffect(() => {
    const itemInFav = fav.find((item) => item.id === props.id);
    if (!itemInFav) {
      setRemoveFavLoading(false);
    }
  }, [removeFavLoading]);

  return (
    <div>
      {favAdded && (
        <IconButton aria-label="add to favorites" onClick={handleFavRemove}>
          {!addingFavLoading ? (
            <FavoriteIcon color="error" />
          ) : (
            <CircularProgress size="1.5rem" />
          )}
        </IconButton>
      )}

      {!favAdded && (
        <IconButton aria-label="add to favorites" onClick={handleFavAdding}>
          {!removeFavLoading ? (
            <FavoriteIcon />
          ) : (
            <CircularProgress size="1.5rem" />
          )}
        </IconButton>
      )}
    </div>
  );
}
