import { styled, alpha } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

const LabelBackground = styled("div")(({ theme }) => ({
  position: "absolute",
  zIndex: "40",
  top: "10px",
  left: 0,
  height: "4rem",
  color: theme.palette.secondary.contrastText,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  transition: "all 0.2s",
  padding: theme.spacing(0, 2),
  borderRadius: theme.spacing(0, 4, 4, 0),
  backgroundColor: alpha(theme.palette.secondary.dark, 0.7),
  "&:hover": {
    backgroundColor: alpha(theme.palette.secondary.dark, 0.9),
  },
  [theme.breakpoints.down("xs")]: {
    top: "8px",
    height: "3.2rem",
    padding: theme.spacing(0, 1),
  },
}));

const SaleLabel = () => {
  return (
    <LabelBackground>
      <Typography variant="titleSub1" component="span">
        Save 10%
      </Typography>
    </LabelBackground>
  );
};

export default SaleLabel;
