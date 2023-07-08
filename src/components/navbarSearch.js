import React from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";
import useFetch from "../hooks/usefetch.js";
import { useNavigate } from "react-router-dom";

//styled search box
const WhiteBorderTextField = styled(TextField)({
  "& label": {
    color: "#eee",
  },
  "& label.Mui-focused": {
    color: "#eee",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "green",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#333",
      backgroundColor: "#222",
    },
    "&:hover fieldset": {
      borderColor: "#eee",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#fff",
    },
  },
});

//styled search button
const SearchButton = styled(Button)({
  color: "#000",
  borderColor: "#fff",
  background: "#fff",
  "&:hover": {
    borderColor: "#000",
    backgroundColor: "#fff",
  },
});

export default function NavbarSearch() {
  //fetch products title to show search suggestions
  const {
    data: products,
    isPending,
    error,
  } = useFetch("https://dummyjson.com/products?limit=100&select=title");

  const [value, setValue] = React.useState("");
  const navigate = useNavigate();

  //to handle search on button click or enter
  const handleSearch = () => {
    if (products) {
      navigate(`search/${value}`);
      setValue("");
    }
  };

  // to handle search when clicking on item suggestion
  const navigateSearchedItem = (value) => {
    setValue(value);
    navigate(`search/${value}`);
    setValue("");
  };

  const handleInput = (e, input) => {
    setValue(input);
    console.log(e);
    if (e.code === "Enter") {
      setValue("");
    }
  };
  return (
    <>
      {products && (
        <Stack spacing={2} sx={{ width: "100%" }}>
          {/*using Autocomplete from mui for suggestions*/}
          <Autocomplete
            onChange={(event, value) => navigateSearchedItem(value)}
            open={true && value.length > 0}
            freeSolo
            id="free-solo-2-demo"
            disableClearable
            options={products.products.map((option) => option.title)}
            renderInput={(params) => (
              <WhiteBorderTextField
                onKeyUp={(event) => handleInput(event, params.inputProps.value)}
                label="Search"
                fullWidth
                size="small"
                sx={{
                  input: { color: "#fff", zIndex: 10 },
                  borderColor: "#fff",
                }}
                {...params}
                InputProps={{
                  ...params.InputProps,
                  type: "search",
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: "#fff", zIndex: 10 }} />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </Stack>
      )}
      <SearchButton onClick={handleSearch} variant="outlined">
        Search
      </SearchButton>
    </>
  );
}
