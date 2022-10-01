import { useState, useContext, useEffect } from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import VerifiedIcon from "@mui/icons-material/Verified";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import ClickAwayListener from "@mui/material/ClickAwayListener";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

import CartContext from "../../store/CartContext";
import UserContext from "../../store/UserContext";

import useNavigateTo from "../../hooks/useNavigateTo";

const DetailInfo = (props) => {
  const cartCtx = useContext(CartContext);
  const userCtx = useContext(UserContext);
  const navigateTo = useNavigateTo();

  const [sizeSelection, setSizeSelection] = useState("");
  const [addMessageChecked, setAddMessageChecked] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [messageHelperText, setMessageHelperText] = useState("");
  const [calculatedPrice, setCalculatedPrice] = useState(0);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [tooltipMessage, setTooltipMessage] = useState("");

  const {
    title,
    salePrice,
    description,
    averageRating,
    ratingCount,
    options,
    addons,
  } = props.productData;

  useEffect(() => {
    // PRICE CALC EFFECT
    let currentPrice = salePrice;
    if (sizeSelection && sizeSelection !== "") {
      const selectedOption = options.sizes.find(
        (size) => size.id === sizeSelection
      );
      if (selectedOption) currentPrice += selectedOption.priceChange;
    }
    if (addMessageChecked) {
      currentPrice += addons.addMessage.priceChange;
    }
    setCalculatedPrice(currentPrice);
  }, [salePrice, sizeSelection, addMessageChecked, options, addons]);

  useEffect(() => {
    // MESSAGE INPUT HELPER EFFECT
    if (!messageText) {
      setMessageHelperText("");
      return;
    }
    if (messageText.length > 30) {
      setMessageHelperText("Please enter less than 30 characters");
      return;
    }
    const messageRegex = /^[a-zA-Z0-9\s]+$/;
    const messageValid = messageText.match(messageRegex);
    if (!messageValid) {
      setMessageHelperText("Please enter a valid message");
      return;
    }
    setMessageHelperText("");
  }, [messageText]);

  const handleSizeChange = (event) => {
    setSizeSelection(event.target.value);
  };

  const handleAddMessageChange = (event) => {
    setAddMessageChecked(event.target.checked);
  };

  const handleMessageInputChange = (event) => {
    setMessageText(event.target.value);
  };

  const handleAddToCart = (event) => {
    event.preventDefault();

    if (sizeSelection === "") {
      setTooltipMessage("Please select a size");
      handleTooltipOpen();
      return;
    }

    if (addMessageChecked) {
      if (!messageText) {
        setTooltipMessage("Please enter your message");
        handleTooltipOpen();
        return;
      }
      if (messageText.length > 30) {
        setTooltipMessage("Please enter less than 30 characters");
        handleTooltipOpen();
        return;
      }
      const messageRegex = /^[a-zA-Z0-9\s]+$/;
      const messageValid = messageText.match(messageRegex);
      if (!messageValid) {
        setTooltipMessage("Please enter a valid message");
        handleTooltipOpen();
        return;
      }
    }

    const {
      id,
      url,
      imageSquareMedium,
      imageSquareMediumPreview,
      imageSquareSmall,
    } = props.productData;
    const selectedOptions = [];
    const selectedAddons = [];

    const selectedOption = options.sizes.find(
      (size) => size.id === sizeSelection
    );

    selectedOptions.push({
      type: "sizes",
      option: selectedOption,
    });

    if (addMessageChecked) {
      selectedAddons.push({
        type: "addMessage",
        content: messageText,
      });
    }

    const cartItemType = `${id}-${sizeSelection}${
      addMessageChecked ? "-message" : ""
    }`;

    // QUANTITY LIMIT FOR EACH ITEM TYPE
    if (!addMessageChecked) {
      const existingItem = cartCtx.items.find(
        (item) => item.cartItemType === cartItemType
      );
      if (existingItem && existingItem.quantity >= 10) {
        setTooltipMessage("Limit reached for ordering the same item");
        handleTooltipOpen();
        return;
      }
    }

    cartCtx.addItem({
      id,
      cartItemType,
      price: calculatedPrice,
      selectedOptions,
      selectedAddons,
      title,
      url,
      imageSquareMedium,
      imageSquareMediumPreview,
      imageSquareSmall,
    });

    setSizeSelection("");
    setAddMessageChecked(false);
    setMessageText("");
  };

  const handleAddFavorite = () => {
    userCtx.addFavorite(props.productData);
  };

  const handleViewFavorite = () => {
    navigateTo({
      path: "/group/favorite",
    });
  };

  const handleTooltipClose = () => {
    setTooltipOpen(false);
  };

  const handleTooltipOpen = () => {
    setTooltipOpen(true);
  };

  return (
    <Card
      sx={{
        borderRadius: 3,
      }}
    >
      <CardContent
        sx={{
          display: "grid",
          rowGap: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography>{props.collectionTitle}</Typography>
            <Typography variant="h4" component="h2">
              {title}
            </Typography>
          </Box>
          <VerifiedIcon fontSize="large" color="primary" />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Rating
            name="read-only"
            value={averageRating ? averageRating : 0}
            readOnly
          />
          <Typography>{`(${ratingCount})`}</Typography>
        </Box>
        <Typography>{description}</Typography>
        <Typography variant="h5" component="span">
          {`$${calculatedPrice}`}
        </Typography>
        <Box
          component="form"
          sx={{
            display: "grid",
            rowGap: 2,
          }}
          onSubmit={handleAddToCart}
        >
          <FormControl fullWidth>
            <InputLabel>Size</InputLabel>
            <Select
              labelId="size-select-label"
              value={sizeSelection}
              label="Size"
              onChange={handleSizeChange}
            >
              {props.productData.options?.sizes.map((size) => {
                return (
                  <MenuItem key={size.id} value={size.id}>
                    {size.label}
                  </MenuItem>
                );
              }) || ""}
            </Select>
          </FormControl>
          <FormControlLabel
            control={
              <Checkbox
                checked={addMessageChecked}
                onChange={handleAddMessageChange}
              />
            }
            label={props.productData.addons?.addMessage.buttonText || ""}
          />

          {addMessageChecked && (
            <TextField
              id="message-input"
              label={props.productData.addons?.addMessage.label || ""}
              onChange={handleMessageInputChange}
              value={messageText}
              helperText={
                !messageHelperText
                  ? props.productData.addons?.addMessage.helperText || ""
                  : messageHelperText
              }
              error={!messageHelperText ? false : true}
            />
          )}
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
              <Button
                variant="contained"
                type="submit"
                startIcon={<AddShoppingCartIcon />}
              >
                Add to cart
              </Button>
            </Tooltip>
          </ClickAwayListener>
          {userCtx.favorites.some(
            (favorite) => favorite.id === props.productData.id
          ) ? (
            <Button
              variant="outlined"
              startIcon={<FavoriteIcon />}
              onClick={handleViewFavorite}
            >
              added to favorites
            </Button>
          ) : (
            <Button
              variant="outlined"
              startIcon={<FavoriteBorderIcon />}
              onClick={handleAddFavorite}
            >
              add to favorites
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default DetailInfo;
