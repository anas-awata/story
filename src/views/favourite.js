//page to show favourite products
import React from "react";
import { useSelector } from "react-redux";
import FavItem from "../components/favItem.js";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import EmptyFav from "../images/emptyFav.js";

export default function Favourite() {
  const fav = useSelector((state) => state.fav);

  return (
    <Box sx={{ flexGrow: 1 }} m="auto">
      <Grid container spacing={2} disableEqualOverflow>
        <Grid xs={12} md={12}>
          {fav.length != 0 && (
            <Typography
              variant="h4"
              component="h2"
              sx={{ display: "block", margin: { xs: 1, md: 2 } }}
            >
              Favourite
            </Typography>
          )}
          {fav?.map((item) => (
            <FavItem
              key={item.id}
              id={item.id}
              title={item.title}
              price={item.price}
              image={item.image}
              discount={item.discount}
              discountedPrice={item.discountedPrice}
            />
          ))}
          {
            //when empty
            fav.length == 0 && (
              <Stack>
                <Box sx={{ paddingTop: { xs: "30%", md: "10%" } }} m="auto">
                  <EmptyFav />
                  <Typography
                    sx={{ fontSize: 30, textAlign: "center" }}
                    variant="body2"
                    color="text.secondary"
                  >
                    Favourite is Empty
                  </Typography>
                </Box>
              </Stack>
            )
          }
        </Grid>
      </Grid>
    </Box>
  );
}
