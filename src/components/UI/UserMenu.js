import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

import AccountCircle from "@mui/icons-material/AccountCircle";

import UserContext from "../../store/UserContext";

// FOR REMOTE DATA SETUP ONLY
import {
  setupRemoteData,
  REMOTE_LOCATION_CREDITS,
  REMOTE_DATA_CREDITS,
  DUMMY_PRODUCT_DATA,
  REMOTE_LOCATION_COLLECTIONS,
  REMOTE_DATA_PRODUCT,
  REMOTE_LOCATION_PRODUCTS,
  REMOTE_DATA_FEATURED,
  REMOTE_LOCATION_FEATURED,
  REMOTE_DATA_ONSALE,
  REMOTE_LOCATION_ONSALE,
} from "../../store/DummyData";

const UserMenu = (props) => {
  const navigate = useNavigate();
  const userCtx = useContext(UserContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const userMenuOpen = Boolean(anchorEl);

  const handleUserMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSignInOpen = () => {
    handleUserMenuClose();
    props.onOpenSignIn();
  };

  const handleSignOutOpen = () => {
    handleUserMenuClose();
    props.onOpenSignOut();
  };

  const handleNavigateTo = (event) => {
    const path = event.currentTarget.dataset?.linkTo;
    if (!path || path === "") return;
    handleUserMenuClose();
    navigate(path);
  };

  return (
    <>
      <IconButton
        sx={{
          display: { iv: "none", md: "flex" },
        }}
        size="large"
        onClick={handleUserMenuOpen}
        color={userCtx.signedIn ? "primary" : "inherit"}
      >
        <AccountCircle color={userCtx.signedIn ? "primary" : "inherit"} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        id={"user-menu"}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={userMenuOpen}
        onClose={handleUserMenuClose}
      >
        {!userCtx.signedIn && (
          <MenuItem onClick={handleSignInOpen}>Sign In</MenuItem>
        )}
        <MenuItem data-link-to="/" onClick={handleNavigateTo}>
          Home
        </MenuItem>
        <MenuItem data-link-to="/account" onClick={handleNavigateTo}>
          Account
        </MenuItem>
        <MenuItem data-link-to="/group/favorite" onClick={handleNavigateTo}>
          Favorites
        </MenuItem>
        {userCtx.signedIn && (
          <MenuItem onClick={handleSignOutOpen}>Sign Out</MenuItem>
        )}

        {/* FOR REMOTE DATA SETUP ONLY */}
        {/* <MenuItem
          onClick={setupRemoteData.bind(
            null,
            REMOTE_LOCATION_CREDITS,
            REMOTE_DATA_CREDITS
          )}
        >
          SETUP: CREDITS
        </MenuItem>
        <MenuItem
          onClick={setupRemoteData.bind(
            null,
            REMOTE_LOCATION_COLLECTIONS,
            DUMMY_PRODUCT_DATA
          )}
        >
          SETUP: COLLECTIONS
        </MenuItem> */}
        {/* <MenuItem
          onClick={setupRemoteData.bind(
            null,
            REMOTE_LOCATION_PRODUCTS,
            REMOTE_DATA_PRODUCT
          )}
        >
          SETUP: PRODUCTS
        </MenuItem> */}
        {/* <MenuItem
          onClick={setupRemoteData.bind(
            null,
            REMOTE_LOCATION_FEATURED,
            REMOTE_DATA_FEATURED
          )}
        >
          SETUP: GROUP1
        </MenuItem>
        <MenuItem
          onClick={setupRemoteData.bind(
            null,
            REMOTE_LOCATION_ONSALE,
            REMOTE_DATA_ONSALE
          )}
        >
          SETUP: GROUP2
        </MenuItem> */}
      </Menu>
    </>
  );
};

export default UserMenu;
