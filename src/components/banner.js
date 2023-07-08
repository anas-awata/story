//styled banner component
import React from "react";
import { styled, alpha } from "@mui/material/styles";

export default function Banner(props) {
  const StyledBanner = styled("img")(({ theme }) => ({
    width: "100vw",
    height: "300px",
    objectFit: "fill",
  }));
  return (
    <section className="banner">
      <div>
        <a href="">
          <StyledBanner src={props.src.image} />
        </a>
      </div>
    </section>
  );
}
