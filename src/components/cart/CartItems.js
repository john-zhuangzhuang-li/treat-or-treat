import { styled } from "@mui/material/styles";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";

import DeleteIcon from "@mui/icons-material/Delete";

import QuantitySelect from "../UI/QuantitySelect";
import MessageBadge from "../UI/MessageBadge";

const Item = styled("li")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "8rem minmax(min-content, 1fr)",
  gridAutoFlow: "column",
  columnGap: theme.spacing(1),
  borderRadius: 3 * theme.shape.borderRadius,
}));

const ItemImageContainer = styled("div")(({ theme }) => ({
  width: "8rem",
  height: "8rem",
  overflow: "hidden",
  position: "relative",
  borderRadius: 3 * theme.shape.borderRadius,
}));

const ItemImage = styled("img")({
  width: "8rem",
  height: "8rem",
  cursor: "pointer",
});

const ContentSection = styled("div")({
  display: "flex",
  flexWrap: "wrap",
});

const CartItems = (props) => {
  return (
    <>
      {props.itemData && props.itemData.length > 0 ? (
        props.itemData.map((item) => {
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
            <Item key={`${item.cartItemType}-${item.timeStamp}`}>
              <ItemImageContainer>
                {message && <MessageBadge />}
                <ItemImage
                  src={item.imageSquareSmall}
                  alt="nice cake"
                  data-link-to={`/product/${item.url}`}
                  onClick={props.onLinkButtonClick}
                />
              </ItemImageContainer>
              <Box
                sx={{
                  display: "grid",
                  rowGap: 0.5,
                }}
              >
                <ContentSection sx={{ justifyContent: "space-between" }}>
                  <Link
                    component="button"
                    variant="body2"
                    data-link-to={`/product/${item.url}`}
                    onClick={props.onLinkButtonClick}
                    underline="hover"
                  >
                    {item.title}
                  </Link>
                  <Typography variant="body2">{`$${item.price}`}</Typography>
                </ContentSection>
                <ContentSection sx={{ justifyContent: "space-between" }}>
                  <Typography variant="body2">
                    {`${size.option.labelShort}${message ? ", Message" : ""}`}
                  </Typography>
                </ContentSection>
                <ContentSection sx={{ justifyContent: "flex-end" }}>
                  {message ? (
                    <IconButton size="small" onClick={handleRemoveButtonClick}>
                      <DeleteIcon fontSize="inherit" />
                    </IconButton>
                  ) : (
                    <QuantitySelect
                      variant="small"
                      quantity={item.quantity || 1}
                      onAddButtonClick={handleAddButtonClick}
                      onRemoveButtonClick={handleRemoveButtonClick}
                    />
                  )}
                </ContentSection>
              </Box>
            </Item>
          );
        })
      ) : (
        <Typography
          component="div"
          variant="body2"
          sx={{
            justifySelf: "center",
            alignSelf: "center",
            gridColumn: "1 / -1",
          }}
        >
          Cart items will appear here
        </Typography>
      )}
    </>
  );
};

export default CartItems;
