//landing page
import React from "react";
import "../style.css";
import Banner from "../components/banner.js";
import CategoryList from "../components/categoryList.js";
import Carousel from "react-material-ui-carousel";
import Paper from "@mui/material/Paper";
import ProductsCarousel from "../components/productsCarousel.js";
import useFetch from "../hooks/usefetch.js";

export default function Home(props) {
  let { data, isPending, error } = useFetch(
    "https://dummyjson.com/products?limit=100"
  );
  let topRatings;
  let dicountedProducts;

  if (data) {
    // filter top rating products
    topRatings = data.products;
    topRatings.sort((a, b) => a.rating - b.rating).reverse();
    topRatings = topRatings.slice(0, 9);
    // filter discounted products
    dicountedProducts = data.products.filter(
      (product) => product.discountPercentage >= 15
    );
    dicountedProducts = dicountedProducts.slice(0, 9);
  }

  const banners = [
    {
      id: 1,
      title: "first banner",
      image:
        "https://centrepoint.a.bigcontent.io/v1/static/Web_en_cp_summersale_Men_shopnow_25_75",
    },
    {
      id: 2,
      title: "second banner",
      image:
        "https://i.pinimg.com/originals/c3/46/37/c34637acf3eed4a16436e1177f23c559.png",
    },
    {
      id: 3,
      title: "third banner",
      image:
        "https://i.pinimg.com/originals/76/3b/d7/763bd70325329ca7c38a99f661734c7f.jpg",
    },
    {
      id: 4,
      title: "fourth banner",
      image:
        "https://i.pinimg.com/originals/2b/2b/8a/2b2b8ae9e001b7184f760b0f443bed5a.jpg",
    },
  ];

  return (
    <>
      <Carousel navButtonsAlwaysVisible={true}>
        {banners.map((banner) => (
          <Banner key={banner.id} src={banner} sx={{ display: "block" }} />
        ))}
      </Carousel>

      <Paper elevation={3} sx={{ borderRadius: 3, margin: 2, padding: 2 }}>
        <CategoryList
          mywidth={130}
          images={props.images}
          data={props.data}
          error={props.error}
          isPending={props.isPending}
        />
      </Paper>

      <Paper elevation={3} sx={{ borderRadius: 3, margin: 2, padding: 2 }}>
        <ProductsCarousel
          data={topRatings}
          error={error}
          isPending={isPending}
          title={"Top Ratings"}
          path={"topRatings"}
        />
      </Paper>

      <Paper elevation={3} sx={{ borderRadius: 3, margin: 2, padding: 2 }}>
        <ProductsCarousel
          data={dicountedProducts}
          error={error}
          isPending={isPending}
          title={"On Sale"}
          path={"saleProducts"}
        />
      </Paper>
    </>
  );
}
