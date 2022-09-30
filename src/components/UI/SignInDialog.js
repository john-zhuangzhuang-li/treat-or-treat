import { useContext } from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

import UserContext from "../../store/UserContext";

import useInputValidation from "../../hooks/useInputValidation";

const SignInDialog = (props) => {
  const userCtx = useContext(UserContext);

  const {
    inputValue,
    inputValueValid,
    inputHelperText,
    handleInputChange,
    handleClearInput,
  } = useInputValidation({ maxLength: 20, regex: /^[a-zA-Z0-9_.]+$/ });

  const handleSignIn = () => {
    userCtx.updateInfo(inputValue);
    props.onClose();
    handleClearInput();
  };

  const handleDialogClose = () => {
    props.onClose();
    handleClearInput();
  };

  return (
    <Dialog open={props.open} onClose={handleDialogClose}>
      <DialogTitle>{userCtx.signedIn ? "Edit name" : "Sign in"}</DialogTitle>
      <DialogContent>
        <DialogContentText>{`While sign-in is not required for this demo, you can change the name of current user by entering it here :)`}</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Your name"
          fullWidth
          variant="standard"
          value={inputValue}
          onChange={handleInputChange}
          helperText={!inputHelperText ? null : inputHelperText}
          error={Boolean(inputHelperText)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogClose}>close</Button>
        <Button onClick={handleSignIn} disabled={!inputValueValid}>
          confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SignInDialog;
