import { styled, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";

import DeleteIcon from "@mui/icons-material/Delete";

import QuantitySelect from "../UI/QuantitySelect";
import MessageBadge from "../UI/MessageBadge";
import ProgressiveImage from "../UI/ProgressiveImage";

const ItemCard = styled(Card)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "20rem minmax(min-content, 1fr)",
  gridAutoFlow: "column",
  columnGap: theme.spacing(2),
  borderRadius: 3 * theme.shape.borderRadius,
  [theme.breakpoints.down("lg")]: {
    gridTemplateColumns: "15rem minmax(min-content, 1fr)",
  },
  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "8rem minmax(min-content, 1fr)",
  },
}));

const ContentBase = styled("div")(({ theme }) => ({
  display: "grid",
  rowGap: theme.spacing(2),
  columnGap: theme.spacing(2),
  padding: theme.spacing(2),
  borderRadius: 3 * theme.shape.borderRadius,
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(1),
  },
}));

const ContentTop = styled("div")(({ theme }) => ({
  display: "flex",
  rowGap: theme.spacing(2),
  columnGap: theme.spacing(2),
  justifyContent: "space-between",
  flexWrap: "wrap",
}));

const ContentBody = styled("div")(({ theme }) => ({
  display: "flex",
  rowGap: theme.spacing(2),
  columnGap: theme.spacing(1),
  justifyContent: "space-between",
  alignItems: "flex-start",
  flexWrap: "wrap",
}));

const ContentFooter = styled("div")(({ theme }) => ({
  display: "flex",
  rowGap: theme.spacing(2),
  columnGap: theme.spacing(1),
  justifyContent: "flex-end",
  flexWrap: "wrap",
}));

const ItemImageContainer = styled("div")(({ theme }) => ({
  alignSelf: "center",
  maxWidth: "20rem",
  minWidth: "3rem",
  borderRadius: 3 * theme.shape.borderRadius,
  overflow: "hidden",
  position: "relative",
  [theme.breakpoints.down("sm")]: {
    margin: theme.spacing(2, 1),
    alignSelf: "start",
  },
}));

const CheckoutItems = (props) => {
  const theme = useTheme();
  const matchesDownSm = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      {props.data && props.data.length > 0 ? (
        props.data.map((item) => {
          const size =
            item.selectedOptions.length > 0
              ? item.selectedOptions?.find((option) => option.type === "sizes")
              : null;

          const message =
            item.selectedAddons.length > 0
              ? item.selectedAddons?.find(
                  (addon) => addon.type === "addMessage"
                )
              : null;

          const handleAddButtonClick = () => props.onAddItem({ ...item });

          const handleRemoveButtonClick = () =>
            props.onRemoveItem({
              cartItemType: item.cartItemType,
              selectedAddons: item.selectedAddons,
              timeStamp: item.timeStamp,
              price: item.price,
              quantity: item.quantity,
            });

          return (
            <ItemCard
              key={`${item.cartItemType}-${item.timeStamp}`}
              variant="outlined"
              component="li"
            >
              <ItemImageContainer>
                {message && (
                  <MessageBadge size={matchesDownSm ? "small" : "medium"} />
                )}
                <ProgressiveImage
                  imageSrc={item.imageSquareMedium}
                  previewSrc={item.imageSquareMediumPreview}
                  onImageClick={props.onLinkButtonClick}
                  ImageDataLinkTo={`/product/${item.url}`}
                />
              </ItemImageContainer>
              <ContentBase>
                <ContentTop>
                  <Link
                    component="button"
                    variant="cart1"
                    data-link-to={`/product/${item.url}`}
                    onClick={props.onLinkButtonClick}
                    underline="hover"
                  >
                    {item.title}
                  </Link>
                  <Stack direction="row" spacing={1} alignItems="flex-start">
                    <Typography variant="cart1">{`$${item.price}`}</Typography>
                  </Stack>
                </ContentTop>
                <ContentBody>
                  <Stack direction={{ iv: "column", xs: "row" }} spacing={1}>
                    <Chip
                      label={size.option.labelShort}
                      size={matchesDownSm ? "small" : "medium"}
                    />
                    {message && (
                      <Chip
                        label="Message"
                        variant="outlined"
                        size={matchesDownSm ? "small" : "medium"}
                      />
                    )}
                  </Stack>
                  <Stack direction={{ iv: "row", sm: "row" }} spacing={1}>
                    <Chip
                      label="Sale"
                      variant="outlined"
                      color="primary"
                      size={matchesDownSm ? "small" : "medium"}
                    />
                  </Stack>
                </ContentBody>
                <ContentFooter>
                  {message ? (
                    <IconButton
                      aria-label="delete"
                      size={matchesDownSm ? "small" : "medium"}
                      onClick={handleRemoveButtonClick}
                    >
                      <DeleteIcon
                        fontSize={matchesDownSm ? "small" : "medium"}
                      />
                    </IconButton>
                  ) : (
                    <QuantitySelect
                      quantity={item.quantity}
                      variant={matchesDownSm ? "small" : "medium"}
                      onAddButtonClick={handleAddButtonClick}
                      onRemoveButtonClick={handleRemoveButtonClick}
                    />
                  )}
                </ContentFooter>
              </ContentBase>
            </ItemCard>
          );
        })
      ) : (
        <Typography
          component="div"
          variant="body2"
          sx={{ justifySelf: "center" }}
        >
          Cart items will appear here
        </Typography>
      )}
    </>
  );
};

export default CheckoutItems;
