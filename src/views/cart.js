// cart page
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { handleCartModal } from "../redux/cartSlice";
import CartItem from "../components/cartItem.js";
import Total from "../components/total.js";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import CloseIcon from "@mui/icons-material/Close";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import EmptyCart from "../images/emptyCart.js";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  width: { xs: 300, md: 1100 },
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  overflowY: "scroll",
  height: "90%",
  display: "block",
};

export default function Cart() {
  const cart = useSelector((state) => state.cart);
  const cartModal = useSelector((state) => state.cartModal);
  const dispatch = useDispatch();

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={cartModal}
        onClose={() => dispatch(handleCartModal())}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={cartModal}>
          <Box sx={style}>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid xs={9} md={11}>
                  <Item>Shopping Cart</Item>
                </Grid>
                <Grid xs={2} md={1}>
                  <Button onClick={() => dispatch(handleCartModal())}>
                    <CloseIcon />
                  </Button>
                </Grid>
              </Grid>
            </Box>
            {cart.length != 0 && (
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2} disableEqualOverflow>
                  <Grid xs={12} md={9}>
                    {cart && (
                      <Item>
                        {cart?.map((item) => (
                          <>
                            <CartItem
                              key={item.id}
                              id={item.id}
                              title={item.title}
                              price={item.price}
                              image={item.image}
                              discount={item.discount}
                              discountedPrice={item.discountedPrice}
                              quantity={item.quantity}
                            />
                            <Divider sx={{ margin: 2 }} />
                          </>
                        ))}
                      </Item>
                    )}
                  </Grid>
                  <Grid xs={12} md={3}>
                    <Item>
                      <Total />
                    </Item>
                  </Grid>
                </Grid>
              </Box>
            )}
            {
              //when cart is empty
              cart.length == 0 && (
                <Stack>
                  <Box sx={{ paddingTop: { xs: "20%", md: "10%" } }} m="auto">
                    <EmptyCart />
                    <Typography
                      sx={{ fontSize: 20, textAlign: "center" }}
                      variant="body2"
                      color="text.secondary"
                    >
                      Cart is Empty
                    </Typography>
                  </Box>
                </Stack>
              )
            }
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
