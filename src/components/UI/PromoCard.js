import { useState, useEffect } from "react";
import { styled, alpha, useTheme } from "@mui/material/styles";
import { grey } from "@mui/material/colors";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const CardLarge = styled("div")(({ theme }) => ({
  gridColumn: "span 4",
  gridRow: "span 2",
  height: "60rem",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  overflow: "hidden",
  cursor: "pointer",
  borderRadius: theme.spacing(4),
  display: "flex",
  position: "relative",
  "&:hover": {
    borderRadius: theme.spacing(7),
  },
  [theme.breakpoints.down("sm")]: {
    gridColumn: "span 1",
    flexDirection: "column",
    justifyContent: "flex-end",
  },
}));

const CardLargeInfo = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "flex-start",
  backgroundColor: grey["800"],
  maxWidth: "33.33%",
  rowGap: theme.spacing(5),
  padding: theme.spacing(6, 3),
  position: "relative",
  [theme.breakpoints.down("sm")]: {
    rowGap: theme.spacing(1),
    padding: theme.spacing(3, 2),
    maxWidth: "100%",
    maxHeight: "33.33%",
    backgroundColor: alpha(grey["800"], 0.85),
    flexWrap: "wrap",
  },
}));

const CardSmall = styled("div")(({ theme }) => ({
  gridColumn: "span 2",
  minHeight: "20rem",
  display: "grid",
  position: "relative",
  gridTemplateColumns: "minmax(min-content, 1fr) 15rem",
  gridAutoFlow: "column",
  overflow: "hidden",
  cursor: "pointer",
  borderRadius: theme.spacing(4),
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  "&:hover": {
    borderRadius: theme.spacing(7),
  },
  [theme.breakpoints.down("sm")]: {
    gridColumn: "span 1",
  },
}));

const PromoCard = (props) => {
  const { imageSrc, previewSrc } = props;
  const [imageSource, setImageSource] = useState(previewSrc || imageSrc || "");
  const [loading, setLoading] = useState(Boolean(previewSrc));
  const theme = useTheme();

  useEffect(() => {
    if (!previewSrc) return;
    setLoading(true);
    const handleImageLoad = setTimeout(() => {
      const image = new Image();
      image.src = imageSrc;
      image.onload = () => setImageSource(imageSrc);
      setLoading(false);
    }, 150);
    return () => clearTimeout(handleImageLoad);
  }, [imageSrc, previewSrc]);

  // COULD OUTSOURCE THIS PALETTE IN THEME PROVIDER

  const colorPalette = {
    primary: {
      color: theme.palette.text.primary,
      backgroundColor: theme.palette.primary.light,
      chipColor: theme.palette.primary.contrastText,
      chipBackgroundColor: theme.palette.primary.main,
    },
    secondary: {
      color: theme.palette.secondary.contrastText,
      backgroundColor: theme.palette.secondary.dark,
      chipColor: theme.palette.text.primary,
      chipBackgroundColor: theme.palette.secondary.light,
    },
  };

  return (
    <>
      {props.variant === "large" && (
        <CardLarge
          sx={{
            backgroundColor: grey["800"],
            "&::before": {
              content: `""`,
              position: "absolute",
              top: "0",
              left: "0",
              width: "100%",
              height: "100%",
              backgroundSize: "cover",
              backgroundImage: `url(${imageSource})`,
              filter: `blur(${loading ? "10px" : "0px"})`,
              backgroundPosition: "right",
              backgroundRepeat: "no-repeat",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            },
          }}
          data-link-to={props.dataLinkTo}
          onClick={props.onPromoClick}
        >
          <CardLargeInfo>
            <Typography variant="cardSub1" component="h2" color="#fff">
              {props.titleMain}
            </Typography>
            <Typography variant="cardMain1" component="h1" color="#fff">
              {props.titleSub}
            </Typography>
            <Chip
              label="View"
              deleteIcon={<ArrowForwardIcon data-link-to={props.dataLinkTo} />}
              onDelete={props.onPromoClick}
              sx={{
                mt: { iv: 2, sm: "auto" },
                backgroundColor: theme.palette.primary.light,
                cursor: "pointer",
              }}
            />
          </CardLargeInfo>
        </CardLarge>
      )}
      {(!props.variant || props.variant === "small") && (
        <CardSmall
          sx={{
            backgroundColor: colorPalette[props.color].backgroundColor,
            "&::before": {
              content: `""`,
              position: "absolute",
              top: "0",
              left: "0",
              width: "100%",
              height: "100%",
              backgroundSize: "15rem",
              backgroundImage: `url(${imageSource})`,
              filter: `blur(${loading ? "10px" : "0px"})`,
              backgroundPosition: "right",
              backgroundRepeat: "no-repeat",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            },
          }}
          onClick={props.onPromoClick}
          data-link-to={props.dataLinkTo}
        >
          <Box
            sx={{
              display: "flex",
              position: "relative",
              flexDirection: "column",
              alignItems: "flex-start",
              rowGap: 1,
              color: colorPalette[props.color].color,
              backgroundColor: colorPalette[props.color].backgroundColor,
              px: 3,
              py: 6,
            }}
          >
            <Typography variant="cardMain2" component="h4">
              {props.titleMain}
            </Typography>
            <Typography variant="cardSub2" component="h5">
              {props.titleSub}
            </Typography>
            <Chip
              label="View"
              color={props.color === "primary" ? "primary" : "default"}
              deleteIcon={<ArrowForwardIcon data-link-to={props.dataLinkTo} />}
              onDelete={props.onPromoClick}
              sx={{
                color: colorPalette[props.color].chipColor,
                backgroundColor: colorPalette[props.color].chipBackgroundColor,
                mt: "auto",
                cursor: "pointer",
              }}
            />
          </Box>
        </CardSmall>
      )}
    </>
  );
};

export default PromoCard;
