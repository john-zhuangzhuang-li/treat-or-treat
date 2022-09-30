// import { useState, useContext, useEffect } from "react";
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

  // const [signInInfo, setSignInInfo] = useState("");
  // const [signInInfoValid, setSignInInfoValid] = useState(false);
  // const [signInHelperText, setSignInHelperText] = useState("");

  const handleSignIn = () => {
    userCtx.updateInfo(inputValue);
    props.onClose();
    handleClearInput();
  };

  // const handleSignIn = () => {
  //   userCtx.updateInfo(signInInfo);
  //   props.onClose();
  //   setSignInInfo("");
  // };

  const handleDialogClose = () => {
    props.onClose();
    handleClearInput();
  };

  // const handleSignInInputChange = (event) => {
  //   setSignInInfo(event.target.value);
  // };

  // useEffect(() => {
  //   if (!signInInfo) {
  //     setSignInHelperText("");
  //     setSignInInfoValid(false);
  //     return;
  //   }
  //   if (signInInfo.length > 20) {
  //     setSignInHelperText("Please enter no more than 20 characters");
  //     setSignInInfoValid(false);
  //     return;
  //   }
  //   const nameRegex = /^[a-zA-Z0-9_.]+$/;
  //   const infoValid = signInInfo.match(nameRegex);
  //   if (!infoValid) {
  //     setSignInHelperText(
  //       "Please enter a valid name (without special characters)"
  //     );
  //     setSignInInfoValid(false);
  //     return;
  //   }
  //   setSignInHelperText("");
  //   setSignInInfoValid(true);
  // }, [signInInfo]);

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
