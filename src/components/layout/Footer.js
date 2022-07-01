import { styled } from "@mui/material/styles";
import { grey } from "@mui/material/colors";

import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import GitHubIcon from "@mui/icons-material/GitHub";

import PhotoCreditsButton from "../UI/PhotoCreditsButton";

const FooterContainer = styled("footer")(({ theme }) => ({
  gridColumn: "center",
  alignSelf: "end",
  display: "flex",
  justifyContent: "center",
  position: "relative",
  backgroundColor: grey["600"],
  padding: theme.spacing(6, 8),
  marginTop: theme.spacing(6),
  borderRadius: theme.spacing(2, 2, 0, 0),
  transition: "all 0.3s",
  overflow: "hidden",
  "&:hover > figure": {
    transform: "translateX(-50%) scale(30, 20)",
  },
  "&:hover button": {
    color: "inherit",
    textDecoration: "underline",
  },
  "& button:hover": {
    textDecoration: "none",
  },
  [theme.breakpoints.down("sm")]: {
    gridColumn: "full",
    borderRadius: 0,
  },
}));

const FooterContent = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  color: theme.palette.secondary.contrastText,
  rowGap: theme.spacing(1),
  zIndex: "1000",
}));

const SecondaryBackground = styled("figure")(({ theme }) => ({
  backgroundColor: theme.palette.secondary.dark,
  borderRadius: "50%",
  height: "3rem",
  width: "3rem",
  position: "absolute",
  bottom: "-3.5rem",
  left: "50%",
  transform: "translateX(-50%) scale(1)",
  transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
  zIndex: "1",
}));

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <IconButton size="large" color="inherit">
          <GitHubIcon fontSize="large" />
        </IconButton>
        <Typography variant="subtitle1" align="center" component="p">
          Built by John Li for React and MUI practice
        </Typography>
        <PhotoCreditsButton />
      </FooterContent>
      <SecondaryBackground></SecondaryBackground>
    </FooterContainer>
  );
};

export default Footer;
