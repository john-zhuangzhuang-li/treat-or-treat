import { useState, useContext } from "react";
import { styled } from "@mui/material/styles";

import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import CartContext from "../../store/CartContext";

import CartItems from "./CartItems";

import useNavigateTo from "../../hooks/useNavigateTo";

const CartBase = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  rowGap: theme.spacing(2),
  width: "30rem",
}));

const CartHeader = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  rowGap: theme.spacing(2),
  alignItems: "center",
  padding: theme.spacing(2, 2, 0, 2),
}));

const CartList = styled("ul")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  listStyle: "none",
  maxHeight: "60vh",
  overflowY: "auto",
  rowGap: theme.spacing(2),
  margin: theme.spacing(2, 0),
  padding: theme.spacing(0, 2),
}));

const CartAction = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  rowGap: theme.spacing(2),
  alignItems: "center",
  padding: theme.spacing(0, 2),
}));

const Cart = () => {
  const cartCtx = useContext(CartContext);
  const navigateTo = useNavigateTo();
  const [cartOn, setCartOn] = useState(false);

  const toggleCart = (turnOn) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setCartOn(turnOn);
  };

  const handleNavigateTo = (event) => {
    navigateTo({
      dataset: event.currentTarget.dataset,
      key: "linkTo",
      callback: toggleCart(false),
    });
  };

  const handleAddItem = (item) => cartCtx.addItem(item);
  const handleRemoveItem = (item) => cartCtx.removeItem(item);

  const checkoutButton = (
    <Button
      variant="contained"
      data-link-to="/checkout"
      onClick={handleNavigateTo}
      fullWidth
    >
      CHECKOUT
    </Button>
  );

  return (
    <>
      <IconButton size="large" color="inherit" onClick={toggleCart(true)}>
        <Badge badgeContent={cartCtx.totalQuantity || 0} color="error">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
      <SwipeableDrawer
        anchor={"right"}
        open={cartOn}
        onClose={toggleCart(false)}
        onOpen={toggleCart(true)}
      >
        <CartBase role="presentation" onKeyDown={toggleCart(false)}>
          <CartHeader>
            <Typography component={"h4"}>
              {`Cart(${cartCtx.totalQuantity || 0})`}
            </Typography>
            {checkoutButton}
          </CartHeader>
          <CartList>
            <CartItems
              itemData={cartCtx.items}
              onLinkButtonClick={handleNavigateTo}
              onAddItem={handleAddItem}
              onRemoveItem={handleRemoveItem}
            />
          </CartList>
          <CartAction>
            {checkoutButton}
            <Button variant="outlined" onClick={toggleCart(false)} fullWidth>
              CONTINUE SHOPPING
            </Button>
          </CartAction>
        </CartBase>
      </SwipeableDrawer>
    </>
  );
};

export default Cart;
