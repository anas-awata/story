//category card component
import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

export default function CategoryCard(props) {
  return (
    <>
      <Card
        sx={{
          maxWidth: { xs: props.mywidth, md: 230 },
          minWidth: { xs: props.mywidth, md: 230 },
          display: "block",
          marginRight: 0.5,
          marginBottom: 3,
          marginTop: 2,
        }}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            image={props.images}
            alt={props.category}
            sx={{ height: { xs: 100, md: 200 } }}
          />
          <CardContent>
            <Typography
              sx={{
                textAlign: "center",
                whiteSpace: "nowrap",
                fontSize: { xs: 12, md: 25 },
              }}
              gutterBottom
              variant="h6"
              component="h3"
            >
              {props.category}
            </Typography>
            <Typography variant="body2" color="text.secondary"></Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
}
