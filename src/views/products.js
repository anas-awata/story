//page for products by category
import React from "react";
import ProductsList from "../components/productsList.js";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/usefetch.js";

export default function Products() {
  const { category } = useParams();
  const { data, isPending, error } = useFetch(
    `https://dummyjson.com/products/category/${category}`
  );

  return (
    <div>
      <ProductsList
        data={data}
        error={error}
        isPending={isPending}
        category={category}
        items={4}
      />
    </div>
  );
}
