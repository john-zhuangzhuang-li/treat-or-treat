import { useState, useContext, useReducer } from "react";
import { styled, useTheme } from "@mui/material/styles";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Tooltip from "@mui/material/Tooltip";
import ClickAwayListener from "@mui/material/ClickAwayListener";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

import Header from "../components/layout/Header";
import PageBackground from "../components/UI/PageBackground";
import CheckoutItems from "../components/checkout/CheckoutItems";
import AddressForm from "../components/checkout/AddressForm";
import ContactForm from "../components/checkout/ContactForm";
import PaymentForm from "../components/checkout/PaymentForm";
import PromoForm from "../components/checkout/PromoForm";

import CartContext from "../store/CartContext";
import UserContext from "../store/UserContext";

import useNavigateTo from "../hooks/useNavigateTo";

const CheckoutMain = styled("main")(({ theme }) => ({
  gridColumn: "center",
  gridRow: "3 / 5",
  display: "grid",
  gridTemplateColumns: "minmax(min-content, 1fr) 40rem",
  gridAutoFlow: "column",
  zIndex: "20",
  rowGap: theme.spacing(3),
  columnGap: theme.spacing(3),
  [theme.breakpoints.down("hu")]: {
    gridTemplateColumns: "minmax(min-content, 1fr) 30rem",
  },
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "minmax(min-content, 1fr)",
    gridTemplateRows: "auto",
    gridAutoFlow: "row",
  },
}));

const MainSection = styled(Paper)(({ theme }) => ({
  display: "grid",
  rowGap: theme.spacing(3),
  columnGap: theme.spacing(3),
  padding: theme.spacing(3),
}));

const CheckoutCartList = styled("ul")(({ theme }) => ({
  display: "grid",
  listStyle: "none",
  rowGap: theme.spacing(3),
}));

const CheckoutOptions = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gridAutoFlow: "column",
  alignItems: "start",
  rowGap: theme.spacing(3),
  columnGap: theme.spacing(3),
  marginTop: theme.spacing(2),
  [theme.breakpoints.down("hu")]: {
    gridTemplateColumns: "minmax(min-content, 1fr)",
    gridTemplateRows: "auto",
    gridAutoFlow: "row",
  },
}));

const SummarySection = styled(Paper)(({ theme }) => ({
  position: "sticky",
  top: "10rem",
  display: "grid",
  gridAutoRows: "min-content",
  rowGap: theme.spacing(3),
  columnGap: theme.spacing(3),
  padding: theme.spacing(3),
}));

const SummaryList = styled("div")(({ theme }) => ({
  display: "grid",
  gridAutoRows: "min-content",
  rowGap: theme.spacing(1),
}));

const SummaryItem = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

const defaultFulfillment = {
  type: "delivery",
  deliveryInfo: {},
  pickupInfo: {},
};

const fulfillmentReducer = (state, action) => {
  if (action.type === "UPDATE_TYPE") {
    return { ...state, type: action.newType };
  }
  if (action.type === "INFO_DELIVERY") {
    return { ...state, deliveryInfo: action.info };
  }
  if (action.type === "INFO_PICKUP") {
    return { ...state, pickupInfo: action.info };
  }
  return defaultFulfillment;
};

const CheckoutPage = () => {
  const theme = useTheme();
  const cartCtx = useContext(CartContext);
  const userCtx = useContext(UserContext);
  const navigateTo = useNavigateTo();

  const [submittedDialogOpen, setSubmittedDialogOpen] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [tooltipMessage, setTooltipMessage] = useState("");
  const [fulfillment, dispatchFulfillment] = useReducer(
    fulfillmentReducer,
    defaultFulfillment
  );

  const updateFulfillmentType = (newType) => {
    dispatchFulfillment({ type: "UPDATE_TYPE", newType });
  };

  const updateDeliveryInfo = (info) => {
    dispatchFulfillment({ type: "INFO_DELIVERY", info });
  };

  const updatePickupInfo = (info) => {
    dispatchFulfillment({ type: "INFO_PICKUP", info });
  };

  const handleTooltipClose = () => {
    setTooltipOpen(false);
  };

  const handleTooltipOpen = () => {
    setTooltipOpen(true);
  };

  const handleConfirmPurchase = () => {
    if (cartCtx.items.length === 0) {
      setTooltipMessage("Please add some items to cart first :)");
      handleTooltipOpen();
      return;
    }
    const { type } = fulfillment;
    const info = fulfillment[`${type}Info`];
    if (!info || !info?.id) {
      setTooltipMessage(`Please select one from saved ${type} information.`);
      handleTooltipOpen();
      return;
    }
    const newOrder = {
      fulfillment: { type, info },
      totalPrice: cartCtx.totalPrice,
      items: cartCtx.items,
      paymentMethod: "Demo",
    };
    userCtx.addOrder(newOrder);
    cartCtx.emptyCart();
    setSubmittedDialogOpen(true);
  };

  const handleSubmittedDialogClose = (event) => {
    // PATH AS A FALLBACK IN CASE MODAL CLOSED WITHOUT DATASET
    navigateTo({
      path: "/",
      dataset: event.currentTarget.dataset,
      key: "linkTo",
      callback: () => setSubmittedDialogOpen(false),
    });
  };

  const handleNavigateTo = (event) => {
    navigateTo({
      dataset: event.currentTarget.dataset,
      key: "linkTo",
    });
  };

  const handleAddItem = (item) => cartCtx.addItem(item);
  const handleRemoveItem = (item) => cartCtx.removeItem(item);

  const handleFulfillmentTypeChange = (event, newType) => {
    if (!newType) return;
    updateFulfillmentType(newType);
  };

  return (
    <>
      <PageBackground imageSrc={theme.backgrounds.general2} extended />
      <Header>
        <Typography variant="titleMain1" component="h1">
          Checkout
        </Typography>
      </Header>
      <CheckoutMain>
        <MainSection component="section">
          <Typography variant="h5" component="h2">
            Shopping Cart
          </Typography>
          <CheckoutCartList>
            <CheckoutItems
              data={cartCtx.items}
              onLinkButtonClick={handleNavigateTo}
              onAddItem={handleAddItem}
              onRemoveItem={handleRemoveItem}
            />
          </CheckoutCartList>
          <CheckoutOptions>
            <Box
              sx={{
                display: "grid",
                rowGap: 3,
              }}
            >
              <Typography variant="h5" component="h2">
                Delivery Options
              </Typography>
              <ToggleButtonGroup
                color="primary"
                value={fulfillment.type}
                exclusive
                onChange={handleFulfillmentTypeChange}
              >
                <ToggleButton
                  value="delivery"
                  sx={{
                    width: "100%",
                  }}
                  size="large"
                >
                  Delivery
                </ToggleButton>
                <ToggleButton
                  value="pickup"
                  sx={{
                    width: "100%",
                  }}
                  size="large"
                >
                  Pickup
                </ToggleButton>
              </ToggleButtonGroup>
              {fulfillment.type === "delivery" && (
                <AddressForm
                  savedAddresses={userCtx.savedAddresses}
                  onInfoChange={updateDeliveryInfo}
                  currentInfo={fulfillment.deliveryInfo}
                />
              )}
              {fulfillment.type === "pickup" && (
                <ContactForm
                  savedContacts={userCtx.savedContacts}
                  onInfoChange={updatePickupInfo}
                  currentInfo={fulfillment.pickupInfo}
                />
              )}
            </Box>
            <Box
              sx={{
                display: "grid",
                rowGap: 3,
              }}
            >
              <PromoForm />
              <PaymentForm />
            </Box>
          </CheckoutOptions>
        </MainSection>
        <Box>
          <SummarySection component="section">
            <Typography variant="h5" component="h2">
              Summary
            </Typography>
            <SummaryList>
              <SummaryItem>
                <Typography>Subtotal</Typography>
                <Typography>{`$${cartCtx.totalPrice}`}</Typography>
              </SummaryItem>
              {fulfillment.type === "delivery" && (
                <SummaryItem>
                  <Typography>Shipping</Typography>
                  <Typography>{`$${
                    cartCtx.totalPrice > 0 ? 10 : 0
                  }`}</Typography>
                </SummaryItem>
              )}
              <SummaryItem>
                <Typography>Tax</Typography>
                <Typography>{`$${(cartCtx.totalPrice * 0.13).toFixed(
                  2
                )}`}</Typography>
              </SummaryItem>
            </SummaryList>
            <SummaryItem>
              <Typography variant="h6">Total</Typography>
              <Typography variant="h6">{`$${
                (cartCtx.totalPrice > 0 &&
                  (fulfillment.type === "delivery"
                    ? cartCtx.totalPrice * 1.13 + 10
                    : cartCtx.totalPrice * 1.13
                  ).toFixed(2)) ||
                0
              }`}</Typography>
            </SummaryItem>
            <ClickAwayListener onClickAway={handleTooltipClose}>
              <Tooltip
                PopperProps={{
                  disablePortal: true,
                }}
                onClose={handleTooltipClose}
                open={tooltipOpen}
                disableFocusListener
                disableHoverListener
                disableTouchListener
                title={tooltipMessage}
                arrow
                placement="top"
              >
                <Button variant="contained" onClick={handleConfirmPurchase}>
                  Confirm purchase
                </Button>
              </Tooltip>
            </ClickAwayListener>
          </SummarySection>
        </Box>
      </CheckoutMain>
      <Dialog open={submittedDialogOpen} onClose={handleSubmittedDialogClose}>
        <DialogTitle>Transaction</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
            <CheckCircleOutlineIcon sx={{ fontSize: 60 }} color="primary" />
          </Box>
          <DialogContentText id="order-confirmation">
            Thanks for the purchase! You can reivew the order through the link
            below, or return to homepage by tapping okay.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmittedDialogClose} data-link-to={"account"}>
            review order
          </Button>
          <Button onClick={handleSubmittedDialogClose} autoFocus>
            okay
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CheckoutPage;
