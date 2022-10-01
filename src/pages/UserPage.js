import { useContext, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";

import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import { Button, CardActions, CardContent } from "@mui/material";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import Header from "../components/layout/Header";
import PageBackground from "../components/UI/PageBackground";
import Orders from "../components/user/Orders";
import SignInDialog from "../components/UI/SignInDialog";

import UserContext from "../store/UserContext";

import useNavigateTo from "../hooks/useNavigateTo";

const HistorySection = styled(Paper)(({ theme }) => ({
  display: "grid",
  rowGap: theme.spacing(3),
  columnGap: theme.spacing(3),
  padding: theme.spacing(3),
}));

const HistoryList = styled("ul")(({ theme }) => ({
  display: "grid",
  listStyle: "none",
  alignItems: "start",
  rowGap: theme.spacing(3),
}));

const UserMain = styled("div")(({ theme }) => ({
  gridColumn: "center",
  gridRow: "3 / 5",
  display: "grid",
  gridTemplateColumns: "minmax(min-content, 1fr) 40rem",
  gridAutoFlow: "column",
  zIndex: "20",
  rowGap: theme.spacing(3),
  columnGap: theme.spacing(3),
  [theme.breakpoints.down("hu")]: {
    gridTemplateColumns: "minmax(min-content, 1fr) 30rem",
  },
  [theme.breakpoints.down("md")]: {
    display: "flex",
    flexDirection: "column-reverse",
  },
  [theme.breakpoints.down("xs")]: {
    gridColumn: "full",
  },
}));

const UserSection = styled(Paper)(({ theme }) => ({
  display: "grid",
  gridTemplateRows: "min-content 1fr",
  gridAutoFlow: "row",
  backgroundColor: "#eee",
  rowGap: theme.spacing(3),
  columnGap: theme.spacing(3),
  padding: theme.spacing(3),
}));

const UserAvatar = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
}));

const UserInfo = styled("div")(({ theme }) => ({
  [theme.breakpoints.down("xs")]: {
    padding: theme.spacing(0, 3),
  },
}));

const UserPage = () => {
  const theme = useTheme();
  const userCtx = useContext(UserContext);
  const navigateTo = useNavigateTo();

  const [signInDialogOpen, setSignInDialogOpen] = useState(false);

  const handleSignInDialogOpen = () => {
    setSignInDialogOpen(true);
  };
  const handleSignInDialogClose = () => {
    setSignInDialogOpen(false);
  };

  const handleNavigateTo = (event) => {
    navigateTo({
      dataset: event.currentTarget.dataset,
      key: "linkTo",
    });
  };

  return (
    <>
      <PageBackground imageSrc={theme.backgrounds.general4} extended />
      <Header>
        <Typography variant="titleMain1" component="h1">
          {`Welcome, ${userCtx.name}`}
        </Typography>
      </Header>
      <UserMain component="main">
        <HistorySection component="section">
          <Typography variant="h5" component="h2">
            Order history
          </Typography>
          <HistoryList>
            <Orders ordersData={userCtx.orders} onNavigate={handleNavigateTo} />
          </HistoryList>
        </HistorySection>
        <UserInfo>
          <UserSection component="section">
            <UserAvatar>
              <Avatar>
                <AccountCircleIcon fontSize="large" />
              </Avatar>
            </UserAvatar>
            <Card
              variant="outlined"
              sx={{
                columnGap: 1,
                borderRadius: 3,
              }}
            >
              <CardContent>
                <Typography>{`Name: ${userCtx.name}`}</Typography>
                <Typography>{`Member since: today`}</Typography>
                <Typography>{userCtx.savedAddresses[0].address}</Typography>
                <Typography>{`${userCtx.savedAddresses[0].city}, ${userCtx.savedAddresses[0].province}`}</Typography>
                <Typography>{userCtx.savedAddresses[0].postal}</Typography>
                <Typography>{userCtx.savedAddresses[0].phone}</Typography>
              </CardContent>
              <CardActions>
                <Button onClick={handleSignInDialogOpen}>
                  {userCtx.signedIn ? "edit" : "sign in"}
                </Button>
              </CardActions>
            </Card>
          </UserSection>
        </UserInfo>
      </UserMain>
      <SignInDialog open={signInDialogOpen} onClose={handleSignInDialogClose} />
    </>
  );
};

export default UserPage;
