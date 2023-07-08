//component to list products
import React, { useState } from "react";
import ProductCard from "./productCard.js";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function ProductList({
  data,
  error,
  isPending,
  category,
  search,
  items,
}) {
  //for pagination
  const itemsPerPage = items;
  const [page, setPage] = useState(1);
  var noOfPages;
  if (data) {
    noOfPages = Math.ceil(data.products.length / itemsPerPage);
  }

  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <>
      {category && (
        <Typography
          variant="h2"
          component="h2"
          sx={{ display: "block", margin: 2 }}
        >
          {category}
        </Typography>
      )}
      {search && (
        <Typography
          variant="h5"
          component="h2"
          sx={{ display: "block", margin: 2 }}
        >
          search for: {search}
        </Typography>
      )}
      {error}
      {isPending && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: { md: 500, xs: 700 },
          }}
        >
          <Box m="auto">
            <CircularProgress />
          </Box>
        </Box>
      )}
      <Stack>
        <Box
          m="auto"
          sx={{
            display: { md: "flex", justifyContent: "center" },
            flexWrap: { md: "wrap" },
          }}
        >
          {!isPending &&
            !error &&
            data.products
              .slice((page - 1) * itemsPerPage, page * itemsPerPage)
              .map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
        </Box>
      </Stack>
      <Stack>
        {data && (
          <Box m="auto" sx={{ marginTop: 2, marginBottom: 3 }}>
            <Pagination
              variant="outlined"
              shape="rounded"
              count={noOfPages}
              page={page}
              onChange={handleChange}
              defaultPage={1}
            />
          </Box>
        )}
      </Stack>
    </>
  );
}
