import { useState } from "react";
import { styled, alpha, useTheme } from "@mui/material/styles";

import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import CakeIcon from "@mui/icons-material/Cake";

import Cart from "../cart/Cart";
import UserMenu from "../UI/UserMenu";
import MobileMenu from "../UI/MobileMenu";
import SearchButton from "../UI/SearchButton";
import CollectionMenu from "../UI/CollectionMenu";
import SignInDialog from "../UI/SignInDialog";
import SignOutDialog from "../UI/SignOutDialog";

import useNavigateTo from "../../hooks/useNavigateTo";

const NavBar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  backgroundColor: alpha(theme.palette.common.white, 0.85),
  borderRadius: theme.spacing(0, 0, 2, 2),
  padding: theme.spacing(2, 0),
  columnGap: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    borderRadius: 0,
    borderLeft: 0,
    borderRight: 0,
    padding: theme.spacing(2, 2),
  },
  [theme.breakpoints.down("xs")]: {
    columnGap: 0,
  },
  "@supports (-webkit-backdrop-filter: none) or (backdrop-filter: none)": {
    WebkitBackdropFilter: "blur(10px)",
    backdropFilter: "blur(10px)",
  },
}));

const Navigation = ({ collectionListData }) => {
  const theme = useTheme();
  const navigateTo = useNavigateTo();

  const [signInDialogOpen, setSignInDialogOpen] = useState(false);
  const [signOutDialogOpen, setSignOutDialogOpen] = useState(false);

  const handleSignInDialogOpen = () => {
    setSignInDialogOpen(true);
  };
  const handleSignInDialogClose = () => {
    setSignInDialogOpen(false);
  };
  const handleSignOutDialogOpen = () => {
    setSignOutDialogOpen(true);
  };
  const handleSignOutDialogClose = () => {
    setSignOutDialogOpen(false);
  };

  const handleNavigateTo = (event) => {
    navigateTo({
      dataset: event.currentTarget.dataset,
      key: "linkTo",
    });
  };

  return (
    <>
      <NavBar
        sx={{
          borderLeft: 1,
          borderRight: 1,
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <MobileMenu
          onOpenSignIn={handleSignInDialogOpen}
          onOpenSignOut={handleSignOutDialogOpen}
          collectionListData={collectionListData}
        />
        <IconButton
          size="large"
          color="inherit"
          data-link-to="/"
          onClick={handleNavigateTo}
        >
          <CakeIcon color="primary" />
        </IconButton>
        <Typography
          sx={{
            textTransform: "uppercase",
            display: { iv: "none", sm: "flex" },
          }}
          component="h3"
          variant="h5"
          noWrap
        >
          treat
          <Typography
            component="span"
            variant="h5"
            sx={{ color: theme.palette.primary.main }}
            noWrap
          >
            &#8741;
          </Typography>
          treat
        </Typography>
        <CollectionMenu collectionListData={collectionListData} />
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              textTransform: "uppercase",
              display: { iv: "flex", sm: "none" },
            }}
            component="h3"
            variant="body1"
            noWrap
          >
            treat
            <Typography
              component="span"
              variant="body1"
              sx={{ color: theme.palette.primary.main }}
              noWrap
            >
              &#8741;
            </Typography>
            treat
          </Typography>
        </Box>
        <SearchButton />
        <UserMenu
          onOpenSignIn={handleSignInDialogOpen}
          onOpenSignOut={handleSignOutDialogOpen}
        />
        <Cart />
      </NavBar>
      <SignInDialog open={signInDialogOpen} onClose={handleSignInDialogClose} />
      <SignOutDialog
        open={signOutDialogOpen}
        onClose={handleSignOutDialogClose}
      />
    </>
  );
};

export default Navigation;
