import { styled, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";

import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

import OrderHistoryItems from "./OrderHistoryItems";

const OrderCard = styled(Card)(({ theme }) => ({
  display: "grid",
  borderRadius: 3 * theme.shape.borderRadius,
}));

const OrderHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "#eee",
  columnGap: theme.spacing(1),
  rowGap: theme.spacing(1),
  padding: theme.spacing(2),
}));

const OrderBody = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "minmax(min-content, 1fr) 30rem",
  rowGap: theme.spacing(3),
  columnGap: theme.spacing(3),
  padding: theme.spacing(2),
  [theme.breakpoints.down("hu")]: {
    gridTemplateColumns: "minmax(min-content, 1fr) 20rem",
  },
  [theme.breakpoints.down("lg")]: {
    gridTemplateColumns: "1fr",
  },
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(0),
  },
}));

const OrderHistoryList = styled(Box)(({ theme }) => ({
  display: "grid",
  rowGap: theme.spacing(2),
}));

const OrderActions = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  rowGap: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(0, 2, 2, 2),
  },
}));

const Orders = (props) => {
  const theme = useTheme();
  const matchesDownXs = useMediaQuery(theme.breakpoints.down("xs"));
  const orders = props.ordersData;
  return (
    <>
      {orders && Array.isArray(orders) && orders.length > 0 ? (
        orders.map((order) => {
          return (
            <OrderCard key={order.timeStamp} variant="outlined" component="li">
              <OrderHeader>
                <Stack direction="row" spacing={1}>
                  <Chip
                    label={order.orderDate.toLocaleDateString()}
                    sx={{
                      backgroundColor: "#fff",
                    }}
                  />
                </Stack>

                <Stack direction="row" spacing={1}>
                  <IconButton
                    size="small"
                    sx={{
                      display: { iv: "flex", sm: "none" },
                    }}
                  >
                    {order.fulfillment.type === "delivery" ? (
                      <LocalShippingIcon fontSize="inherit" />
                    ) : (
                      <ShoppingBagIcon fontSize="inherit" />
                    )}
                  </IconButton>
                  <Chip
                    label={
                      order.fulfillment.type === "delivery"
                        ? "Delivery"
                        : "Pickup"
                    }
                    icon={
                      order.fulfillment.type === "delivery" ? (
                        <LocalShippingIcon />
                      ) : (
                        <ShoppingBagIcon />
                      )
                    }
                    sx={{
                      backgroundColor: "#fff",
                      display: { iv: "none", sm: "flex" },
                    }}
                  />
                  <Chip
                    label={
                      matchesDownXs
                        ? `$${order.totalPrice}`
                        : `Total: $${order.totalPrice}`
                    }
                    sx={{
                      backgroundColor: "#fff",
                    }}
                  />
                </Stack>
              </OrderHeader>
              <OrderBody>
                <OrderHistoryList component="ul">
                  <OrderHistoryItems
                    itemsData={order.items}
                    onNavigate={props.onNavigate}
                  />
                </OrderHistoryList>
                <OrderActions>
                  <Button variant="contained">Track status</Button>
                  <Button variant="outlined">Contact service</Button>
                </OrderActions>
              </OrderBody>
            </OrderCard>
          );
        })
      ) : (
        <Typography
          component="div"
          variant="body2"
          sx={{ justifySelf: "center" }}
        >
          Your orders will appear here
        </Typography>
      )}
    </>
  );
};

export default Orders;
