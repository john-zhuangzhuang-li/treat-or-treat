import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

const QuantitySelect = (props) => {
  return (
    <Stack
      direction="row"
      spacing={props.variant === "small" ? 0 : 1}
      alignItems="center"
    >
      <IconButton
        size={props.variant === "small" ? "small" : "medium"}
        onClick={props.onRemoveButtonClick}
      >
        <RemoveCircleIcon fontSize="inherit" />
      </IconButton>
      <Typography variant="button">{props.quantity}</Typography>
      <IconButton
        size={props.variant === "small" ? "small" : "medium"}
        onClick={props.onAddButtonClick}
        disabled={props.quantity >= 10}
      >
        <AddCircleIcon fontSize="inherit" />
      </IconButton>
    </Stack>
  );
};

export default QuantitySelect;
