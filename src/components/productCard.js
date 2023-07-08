//product cart component
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import AddToCartBtn from "./mui/addToCartBtn.js";
import AddToFavBtn from "./mui/addToFavBtn.js";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";

export default function ProductCard(props) {
  const navigate = useNavigate();
  //calculate discounted price
  const discount = Math.round(props.product.discountPercentage);
  const discountedPrice =
    props.product.price - Math.round((props.product.price * discount) / 100);

  return (
    <Card
      sx={{
        maxWidth: { md: 280, xs: 300 },
        display: "flex",
        height: "540px",
        flexDirection: "column",
        justifyContent: "space-between",
        margin: 2,
        cursor: "pointer",
      }}
    >
      <div
        onClick={() =>
          navigate(`/${props.product.category}/${props.product.id}`)
        }
      >
        <CardMedia
          component="img"
          height="200"
          image={props.product.thumbnail}
          alt="Paella dish"
        />
        <CardContent>
          <Box>
            <Typography gutterBottom variant="h5" component="h3">
              {props.product.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {props.product.description.slice(0, 40)}
              <b>...See more</b>
            </Typography>
            <Typography
              variant="h6"
              sx={{
                marginTop: 1,
                marginBottom: -1,
                textDecoration: discount >= 15 ? "line-through" : "none",
                textDecorationColor: "#ef2222bd",
                color: discount >= 15 ? "#df0707" : "green",
              }}
            >
              {props.product.price} $
            </Typography>
            <Typography
              variant="h6"
              component="p"
              sx={{ marginTop: 1, color: "green" }}
            >
              {discount >= 15 ? discountedPrice + " $" : ""}
            </Typography>
            {discount >= 15 && (
              <Typography variant="body2" color="text.secondary">
                discount: {discount}%
              </Typography>
            )}
            <Rating
              precision={0.2}
              sx={{
                marginTop: 2,
                marginBottom: -4,
              }}
              name="read-only"
              value={props.product.rating}
              readOnly
            />
            <Typography
              sx={{ display: "inline-block" }}
              variant="body"
              color="text.secondary"
            >
              {props.product.rating}
            </Typography>
          </Box>
        </CardContent>
      </div>
      <CardActions
        disableSpacing
        sx={{ display: "flex", justifyContent: "space-around" }}
      >
        <AddToCartBtn
          id={props.product.id}
          title={props.product.title}
          price={props.product.price}
          image={props.product.thumbnail}
          discount={discount > 15 ? discount : null}
          discountedPrice={discountedPrice}

          //size={props.product.size}
          //selectedSize={props.product.selectedSize}
        />

        <AddToFavBtn
          id={props.product.id}
          title={props.product.title}
          price={props.product.price}
          image={props.product.thumbnail}
          discount={discount}
          discountedPrice={discountedPrice}
          //size={props.product.size}
          //selectedSize={props.product.selectedSize}
        />
      </CardActions>
    </Card>
  );
}
