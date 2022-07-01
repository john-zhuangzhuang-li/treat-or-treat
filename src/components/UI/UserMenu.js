import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

import AccountCircle from "@mui/icons-material/AccountCircle";

import UserContext from "../../store/UserContext";

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
      </Menu>
    </>
  );
};

export default UserMenu;
