import { styled, alpha, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

import { grey } from "@mui/material/colors";

const IconBackground = styled("div")(({ theme }) => ({
  position: "absolute",
  zIndex: "40",
  top: "10px",
  right: "10px",
  borderRadius: "50%",
  height: "4rem",
  width: "4rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  transition: "all 0.2s",
  backgroundColor: alpha(grey[400], 0.7),
  "&:hover": {
    backgroundColor: alpha(grey[200], 0.9),
  },
  [theme.breakpoints.down("xs")]: {
    top: "8px",
    right: "8px",
    height: "3.2rem",
    width: "3.2rem",
  },
}));

const FavoriteButton = (props) => {
  const theme = useTheme();
  const matchesDownXs = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <IconBackground>
      <IconButton onClick={props.onIconToggle}>
        {props.isFavorite ? (
          <FavoriteIcon
            sx={{ color: alpha(grey[900], 0.95) }}
            fontSize={matchesDownXs ? "small" : "medium"}
          />
        ) : (
          <FavoriteBorderIcon
            sx={{ color: alpha(grey[800], 0.8) }}
            fontSize={matchesDownXs ? "small" : "medium"}
          />
        )}
      </IconButton>
    </IconBackground>
  );
};

export default FavoriteButton;
