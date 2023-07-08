//page to show categories
import React from "react";
import CategoryCard from "../components/categoryCard.js";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";

export default function Categories({ images, data, error, isPending }) {
  const navigate = useNavigate();
  return (
    <Box>
      {isPending && (
        <Stack>
          <Box m="auto">
            <CircularProgress />
          </Box>
        </Stack>
      )}
      <Stack>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            margin: { xs: 3, md: 10 },
          }}
        >
          {!isPending &&
            !error &&
            data.map((category, index) => (
              <Box
                sx={{ margin: 2 }}
                onClick={() => navigate(`/${category}`)}
                key={category.id}
              >
                <CategoryCard
                  mywidth={120}
                  category={category}
                  images={images[index]}
                />
              </Box>
            ))}
        </Box>
      </Stack>
    </Box>
  );
}
