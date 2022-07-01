import { styled, alpha } from "@mui/material/styles";

import IconButton from "@mui/material/IconButton";
import MessageIcon from "@mui/icons-material/Message";

import { grey } from "@mui/material/colors";

// TO DO: ADD A DIALOG ON CLICK FOR USER TO UPDATE SAVED MSG

const IconBase = styled("div")({
  position: "absolute",
  borderRadius: "50%",
  height: "3rem",
  width: "3rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  transition: "all 0.2s",
  backgroundColor: alpha(grey[200], 0.7),
  zIndex: "100",
});

const MessageBadge = (props) => {
  return (
    <IconBase
      sx={{
        bottom: props.size === "medium" ? "10px" : "5px",
        right: props.size === "medium" ? "10px" : "5px",
        height: props.size === "medium" ? "3.5rem" : "3rem",
        width: props.size === "medium" ? "3.5rem" : "3rem",
      }}
    >
      <IconButton
        size={props.size === "medium" ? "medium" : "small"}
        color="primary"
      >
        <MessageIcon fontSize={props.size === "medium" ? "medium" : "small"} />
      </IconButton>
    </IconBase>
  );
};

export default MessageBadge;
