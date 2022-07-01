import { useState, useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";

import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";

import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CollectionsIcon from "@mui/icons-material/Collections";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import FavoriteIcon from "@mui/icons-material/Favorite";

import Collections from "./Collections";

import UserContext from "../../store/UserContext";

import { DUMMY_COLLECTION_LIST } from "../../store/DummyData";

const MobileMenu = (props) => {
  const navigate = useNavigate();
  const userCtx = useContext(UserContext);

  const [menuOn, setMenuOn] = useState(false);
  const [collectionCollapseOpen, setCollectionCollapseOpen] = useState(false);

  const handleMenuOpen = (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setMenuOn(true);
  };

  const handleMenuClose = (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setMenuOn(false);
  };

  const handleCollectionCollapseItemClick = useCallback(() => {
    setMenuOn(false);
  }, [setMenuOn]);

  const handleCollectionCollapseToggle = () => {
    setCollectionCollapseOpen((prev) => !prev);
  };

  const handleListItemClick = (event) => {
    const { dataset } = event.currentTarget;
    if (!dataset.linkTo || dataset.linkTo === "") return;
    handleMenuClose();
    navigate(dataset.linkTo);
  };

  const handleSignInOpen = () => {
    handleMenuClose();
    props.onOpenSignIn();
  };

  const handleSignOutOpen = () => {
    handleMenuClose();
    props.onOpenSignOut();
  };

  return (
    <>
      <IconButton
        size="large"
        color="inherit"
        sx={{ display: { iv: "flex", md: "none" } }}
        onClick={handleMenuOpen}
      >
        <MenuIcon color="inherit" />
      </IconButton>
      <SwipeableDrawer
        anchor={"left"}
        open={menuOn}
        onClose={handleMenuClose}
        onOpen={handleMenuOpen}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onKeyDown={handleMenuClose}
        >
          <List>
            <ListItemButton
              data-link-to="/account"
              onClick={
                userCtx.signedIn ? handleListItemClick : handleSignInOpen
              }
            >
              <ListItemIcon>
                <AccountCircleIcon
                  color={userCtx.signedIn ? "primary" : "inherit"}
                />
              </ListItemIcon>
              <ListItemText
                primary={userCtx.signedIn ? userCtx.name : "Sign In"}
              />
            </ListItemButton>
            <Divider />
            <ListItemButton data-link-to="/" onClick={handleListItemClick}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary={"Home"} />
            </ListItemButton>
            <Divider />
            <ListItemButton onClick={handleCollectionCollapseToggle}>
              <ListItemIcon>
                <CollectionsIcon />
              </ListItemIcon>
              <ListItemText primary={"Collections"} />
              {collectionCollapseOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={collectionCollapseOpen} timeout="auto" unmountOnExit>
              <Box
                sx={{
                  display: "grid",
                  rowGap: 1,
                  gridAutoRows: "5rem",
                  backgroundColor: "#fff",
                  py: 2,
                  px: 3,
                }}
              >
                <Collections
                  collectionList={DUMMY_COLLECTION_LIST}
                  onItemClick={handleCollectionCollapseItemClick}
                />
              </Box>
            </Collapse>
            <Divider />
            <ListItemButton
              data-link-to="/account"
              onClick={handleListItemClick}
            >
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary={"Account"} />
            </ListItemButton>
            <Divider />
            <ListItemButton
              data-link-to="/group/favorite"
              onClick={handleListItemClick}
            >
              <ListItemIcon>
                <FavoriteIcon />
              </ListItemIcon>
              <ListItemText primary={"Favorites"} />
            </ListItemButton>
            {userCtx.signedIn && (
              <>
                <Divider />
                <ListItemButton onClick={handleSignOutOpen}>
                  <ListItemIcon>
                    <LogoutIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Sign Out"} />
                </ListItemButton>
              </>
            )}
          </List>
        </Box>
      </SwipeableDrawer>
    </>
  );
};

export default MobileMenu;
