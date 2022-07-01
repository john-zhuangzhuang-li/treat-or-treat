import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import { styled } from "@mui/material/styles";

import Navigation from "./Navigation";
import Footer from "./Footer";
import Box from "@mui/material/Box";

const LayoutContainer = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  display: "grid",
  gridTemplateColumns:
    "[full-start] minmax(0, 1fr) [center-start] minmax(min-content, 180rem) [center-end] minmax(0, 1fr) [full-end]",
  rowGap: theme.spacing(3),
  columnGap: theme.spacing(3),
  [theme.breakpoints.down("hu")]: {
    gridTemplateColumns:
      "[full-start] minmax(0, 1fr) [center-start] minmax(min-content, 120rem) [center-end] minmax(0, 1fr) [full-end]",
  },
}));

const NavigationContainer = styled(Box)(({ theme }) => ({
  gridColumn: "center",
  position: "sticky",
  top: 0,
  gridRow: "1 / 2",
  zIndex: "1000",
  [theme.breakpoints.down("sm")]: {
    gridColumn: "full",
  },
}));

const Layout = (props) => {
  const location = useLocation();
  useLayoutEffect(() => window.scrollTo(0, 0), [location.pathname]);
  return (
    <LayoutContainer>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
      {props.children}
      <Footer />
    </LayoutContainer>
  );
};

export default Layout;
