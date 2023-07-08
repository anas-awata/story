//page to show all store products
import React from "react";
import ProductsList from "../components/productsList.js";
import useFetch from "../hooks/usefetch.js";

export default function AllProducts() {
  const { data, isPending, error } = useFetch(
    "https://dummyjson.com/products?limit=100"
  );

  return (
    <div>
      <div>
        <ProductsList
          data={data}
          error={error}
          isPending={isPending}
          items={8}
        />
      </div>
    </div>
  );
}
