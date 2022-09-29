import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { DUMMY_URL } from "./DummyData";

const theme = createTheme({
  breakpoints: {
    values: {
      iv: 0,
      xs: 450,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1600,
      hu: 2000,
    },
  },
  palette: {
    primary: {
      main: "#E91E63",
      light: "#F8BBD0",
      dark: "#C2185B",
      contrastText: "#fff",
    },
    secondary: {
      main: "#009688",
      light: "#B2DFDB",
      dark: "#00796B",
      contrastText: "#fff",
    },
  },
  typography: {
    htmlFontSize: 10,
  },
  backgrounds: {
    general1: `${DUMMY_URL}/DUMMY/general-title-1-lg.jpg`,
    general2: `${DUMMY_URL}/DUMMY/general-title-2-lg.jpg`,
    general3: `${DUMMY_URL}/DUMMY/general-title-3-lg.jpg`,
    general4: `${DUMMY_URL}/DUMMY/general-title-4-lg.jpg`,
  },
  images: {
    promoMain: `${DUMMY_URL}/DUMMY/main-card-01-lg.jpg`,
    promoMainPreview: `${DUMMY_URL}/DUMMY/main-card-01-lg-preview.jpg`,
    promoSub1: `${DUMMY_URL}/DUMMY/sub-card-01-sm.jpg`,
    promoSub1Preview: `${DUMMY_URL}/DUMMY/sub-card-01-sm-preview.jpg`,
    promoSub2: `${DUMMY_URL}/DUMMY/sub-card-02-sm.jpg`,
    promoSub2Preview: `${DUMMY_URL}/DUMMY/sub-card-02-sm-preview.jpg`,
    notFound: `${DUMMY_URL}/DUMMY/not-found-md.jpg`,
  },
});

theme.typography.cardMain1 = {
  fontWeight: "300",
  fontSize: "4.5rem",
  lineHeight: "1.3",
  [theme.breakpoints.down("hu")]: {
    fontSize: "3.3rem",
  },
  [theme.breakpoints.down("lg")]: {
    fontSize: "2.9rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "2.3rem",
  },
};

theme.typography.cardSub1 = {
  fontWeight: "400",
  fontSize: "3rem",
  [theme.breakpoints.down("hu")]: {
    fontSize: "2.3rem",
  },
  [theme.breakpoints.down("lg")]: {
    fontSize: "1.9rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.4rem",
  },
};

theme.typography.cardMain2 = {
  fontWeight: "300",
  fontSize: "3.5rem",
  lineHeight: "1.2",
  [theme.breakpoints.down("hu")]: {
    fontSize: "3rem",
  },
  [theme.breakpoints.down("lg")]: {
    fontSize: "2.6rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "2rem",
  },
};

theme.typography.cardSub2 = {
  fontWeight: "400",
  fontSize: "2.1rem",
  [theme.breakpoints.down("hu")]: {
    fontSize: "1.8rem",
  },
  [theme.breakpoints.down("lg")]: {
    fontSize: "1.4rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.2rem",
  },
};

theme.typography.titleMain1 = {
  fontWeight: "300",
  fontSize: "5rem",
  [theme.breakpoints.down("lg")]: {
    fontSize: "3.75rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "3.5rem",
  },
};

theme.typography.titleSub1 = {
  fontWeight: "400",
  fontSize: "1.5rem",
  [theme.breakpoints.down("xs")]: {
    fontSize: "1.2rem",
  },
};

theme.typography.cart1 = {
  fontWeight: "400",
  fontSize: "2.4rem",
  [theme.breakpoints.down("hu")]: {
    fontSize: "2.3rem",
  },
  [theme.breakpoints.down("lg")]: {
    fontSize: "2.2rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.8rem",
  },
  [theme.breakpoints.down("xs")]: {
    fontSize: "1.6rem",
  },
};

theme.typography.cart2 = {
  fontWeight: "400",
  fontSize: "2rem",
  [theme.breakpoints.down("hu")]: {
    fontSize: "1.9rem",
  },
  [theme.breakpoints.down("lg")]: {
    fontSize: "1.7rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.6rem",
  },
  [theme.breakpoints.down("xs")]: {
    fontSize: "1.5rem",
  },
};

const StyledThemeProvider = (props) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {props.children}
    </ThemeProvider>
  );
};

export default StyledThemeProvider;
