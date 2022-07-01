import { useContext } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

import UserContext from "../../store/UserContext";

const SignOutDialog = (props) => {
  const userCtx = useContext(UserContext);

  const handleSignOut = () => {
    userCtx.signOut();
    props.onClose();
  };

  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle>Sign Out</DialogTitle>
      <DialogContent>
        <DialogContentText>{`In this demo, sign-out will have some UI-only effects such as changing the user name back to default :)`}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>close</Button>
        <Button onClick={handleSignOut} disabled={!userCtx.signedIn}>
          sign out
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SignOutDialog;
