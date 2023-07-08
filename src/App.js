import React from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import "./style.css";
import Home from "./views/Home.js";
import Products from "./views/products.js";
import AllProducts from "./views/allProducts.js";
import PrimarySearchAppBar from "./components/navbar.js";
import NoMatch from "./components/noMatch.js";
import Product from "./views/product.js";
import SaleProducts from "./views/saleProducts.js";
import TopRatings from "./views/topRatings.js";
import SearchedProducts from "./views/searchedProducts.js";
import Cart from "./views/cart.js";
import Categories from "./views/categories.js";
import Favourite from "./views/favourite.js";
import useFetch from "./hooks/usefetch.js";
import Footer from "./components/footer.js";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export default function App() {
  const cartModal = useSelector((state) => state.cartModal);
  //get categories from api
  const { data, isPending, error } = useFetch(
    "https://dummyjson.com/products/categories"
  );

  //api don't conntain categories images so added manually
  const categoriesImages = [
    "https://dummyjson.com/image/i/products/2/thumbnail.jpg",
    "https://dummyjson.com/image/i/products/7/thumbnail.jpg",
    "https://dummyjson.com/image/i/products/15/thumbnail.jpg",
    "https://dummyjson.com/image/i/products/16/thumbnail.jpg",
    "https://dummyjson.com/image/i/products/24/1.jpg",
    "https://dummyjson.com/image/i/products/26/1.jpg",
    "https://dummyjson.com/image/i/products/32/thumbnail.jpg",
    "https://dummyjson.com/image/i/products/36/1.jpg",
    "https://dummyjson.com/image/i/products/43/thumbnail.jpg",
    "https://dummyjson.com/image/i/products/47/thumbnail.jpeg",
    "https://dummyjson.com/image/i/products/55/thumbnail.jpg",
    "https://dummyjson.com/image/i/products/60/thumbnail.jpg",
    "https://dummyjson.com/image/i/products/61/thumbnail.jpg",
    "https://dummyjson.com/image/i/products/67/thumbnail.jpg",
    "https://dummyjson.com/image/i/products/71/thumbnail.jpg",
    "https://dummyjson.com/image/i/products/76/thumbnail.jpg",
    "https://dummyjson.com/image/i/products/82/thumbnail.jpg",
    "https://dummyjson.com/image/i/products/90/1.jpg",
    "https://dummyjson.com/image/i/products/93/thumbnail.jpg",
    "https://dummyjson.com/image/i/products/99/thumbnail.jpg",
  ];

  return (
    <>
      <div style={{ position: "relative", minHeight: "100vh" }}>
        <PrimarySearchAppBar data={data} />
        <Cart />
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  images={categoriesImages}
                  data={data}
                  error={error}
                  isPending={isPending}
                />
              }
            />
            <Route path=":category" element={<Products />} />
            <Route path="search/:searched" element={<SearchedProducts />} />
            <Route path=":product/:id" element={<Product />} />
            <Route path="favourite" element={<Favourite />} />
            <Route path="products" element={<AllProducts />} />
            <Route path="topRatings" element={<TopRatings />} />
            <Route path="saleProducts" element={<SaleProducts />} />
            <Route
              path="categories"
              element={
                <Categories
                  images={categoriesImages}
                  data={data}
                  error={error}
                  isPending={isPending}
                />
              }
            />
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </main>
        <Footer />
      </div>
      {/* backdrop untel categories are loaded */}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={!data}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}
