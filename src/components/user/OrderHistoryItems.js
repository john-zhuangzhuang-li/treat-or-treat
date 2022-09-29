import { styled, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";

import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

import MessageBadge from "../UI/MessageBadge";

import { DUMMY_URL } from "../../util/dummy";

const HistoryItem = styled(Card)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "12rem minmax(min-content, 1fr)",
  gridAutoFlow: "column",
  columnGap: theme.spacing(1),
  borderRadius: 3 * theme.shape.borderRadius,
  [theme.breakpoints.down("lg")]: {
    gridTemplateColumns: "10rem minmax(min-content, 1fr)",
  },
  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "6rem minmax(min-content, 1fr)",
    border: 0,
  },
}));
const ItemImageContainer = styled("div")(({ theme }) => ({
  display: "flex",
  alignSelf: "center",
  justifySelf: "center",
  maxWidth: "12rem",
  minWidth: "5rem",
  borderRadius: 3 * theme.shape.borderRadius,
  overflow: "hidden",
  cursor: "pointer",
  position: "relative",
  [theme.breakpoints.down("sm")]: {
    margin: theme.spacing(1, 1),
    alignSelf: "start",
    justifySelf: "start",
  },
}));

const ItemImage = styled(CardMedia)({
  maxWidth: "12rem",
  minWidth: "5rem",
});

const ContentBase = styled("div")(({ theme }) => ({
  display: "grid",
  rowGap: theme.spacing(1),
  padding: theme.spacing(1),
}));

const ContentHeader = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  flexWrap: "wrap",
});

const ContentBody = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-start",
  flexWrap: "wrap",
  flexGrow: "1",
  marginBottom: "auto",
  rowGap: theme.spacing(1),
  columnGap: theme.spacing(1),
}));

const ContentFooter = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-end",
  flexWrap: "wrap",
  rowGap: theme.spacing(1),
  columnGap: theme.spacing(1),
  [theme.breakpoints.down("xs")]: {
    justifyContent: "flex-start",
  },
}));

const OrderHistoryItems = (props) => {
  const theme = useTheme();
  const matchesDownSm = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      {props.itemsData &&
        Array.isArray(props.itemsData) &&
        props.itemsData.map((item) => {
          const size =
            item.selectedOptions &&
            Array.isArray(item.selectedOptions) &&
            item.selectedOptions.length > 0
              ? item.selectedOptions?.find((option) => option.type === "sizes")
              : null;

          const message =
            item.selectedAddons &&
            Array.isArray(item.selectedAddons) &&
            item.selectedAddons.length > 0
              ? item.selectedAddons?.find(
                  (addon) => addon.type === "addMessage"
                )
              : null;

          return (
            <HistoryItem key={item.timeStamp} variant="outlined" component="li">
              <ItemImageContainer>
                {message && !matchesDownSm && <MessageBadge />}
                <ItemImage
                  component="img"
                  image={`${DUMMY_URL}${item.imageSquareSmall}`}
                  alt="product image"
                  data-link-to={`/product/${item.url}`}
                  onClick={props.onNavigate}
                />
              </ItemImageContainer>
              <ContentBase>
                <ContentHeader>
                  <Typography variant="cart2">{`${item.title} x ${item.quantity}`}</Typography>
                  <Typography variant="cart2">{`$${item.price}`}</Typography>
                </ContentHeader>
                <ContentBody>
                  {size && <Chip label={size.option.labelShort} size="small" />}
                  {message && <Chip label="Message" size="small" />}
                </ContentBody>
                <ContentFooter>
                  <Chip
                    label="Buy again"
                    color="primary"
                    size="small"
                    data-link-to={`/product/${item.url}`}
                    onClick={props.onNavigate}
                    icon={<AddShoppingCartIcon fontSize="small" />}
                  />
                </ContentFooter>
              </ContentBase>
            </HistoryItem>
          );
        })}
    </>
  );
};

export default OrderHistoryItems;
