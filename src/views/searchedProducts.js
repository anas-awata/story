//page to show searched products after search
import React from "react";
import ProductsList from "../components/productsList.js";
import useFetch from "../hooks/usefetch.js";
import { useParams } from "react-router-dom";

export default function SearchedProducts() {
  const { searched } = useParams();
  const { data, isPending, error } = useFetch(
    `https://dummyjson.com/products/search?q=${searched}`
  );
  return (
    <div>
      <ProductsList
        data={data}
        error={error}
        isPending={isPending}
        search={searched}
        items={4}
      />
    </div>
  );
}
