//page to show products on sale
import React from "react";
import ProductsList from "../components/productsList.js";
import useFetch from "../hooks/usefetch.js";
import Typography from "@mui/material/Typography";

export default function SaleProducts() {
  let { data, isPending, error } = useFetch(
    "https://dummyjson.com/products?limit=100"
  );

  if (data) {
    data.products = data.products.filter(
      (product) => product.discountPercentage >= 15
    );
  }

  return (
    <div>
      <Typography
        variant="h4"
        component="h2"
        sx={{ display: "block", margin: { xs: 1, md: 2 } }}
      >
        Top Ratings
      </Typography>
      <ProductsList data={data} error={error} isPending={isPending} items={8} />
    </div>
  );
}
