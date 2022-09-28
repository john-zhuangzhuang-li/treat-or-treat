import { useState } from "react";
import { styled } from "@mui/material/styles";

import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

import PhotoCreditsList from "./PhotoCreditsList";

const LinkButton = styled(Link)(({ theme }) => ({
  color: theme.palette.secondary.light,
  textDecoration: "none",
  transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
}));

const PhotoCreditsButton = (props) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };
  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <>
      <LinkButton
        component="button"
        variant="button"
        onClick={handleDialogOpen}
      >
        View all photo credits
      </LinkButton>
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Credits</DialogTitle>
        <DialogContent>
          <DialogContentText>
            For all photos used in this project. Let me know if I missed any
            artist :P
          </DialogContentText>
          <PhotoCreditsList data={props.data} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PhotoCreditsButton;
