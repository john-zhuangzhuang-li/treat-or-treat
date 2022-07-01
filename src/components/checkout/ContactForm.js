import { useState, useEffect } from "react";

import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const ContactForm = (props) => {
  const { savedContacts, onInfoChange, currentInfo } = props;
  const [selection, setSelection] = useState(currentInfo?.id || "");

  useEffect(() => {
    if (!selection || !savedContacts || savedContacts.length === 0) return;
    const updatedInfo = savedContacts.find(
      (contact) => contact.id === selection
    );
    if (!updatedInfo) return;
    onInfoChange(updatedInfo);
  }, [selection, savedContacts, onInfoChange]);

  const handleSelectionChange = (event) => {
    setSelection(event.target.value);
  };

  return (
    <>
      <Typography variant="h5" component="h2">
        Contact Information
      </Typography>
      <FormControl fullWidth>
        <InputLabel>Saved Contacts</InputLabel>
        <Select
          value={selection}
          label="Saved Contacts"
          onChange={handleSelectionChange}
        >
          {savedContacts &&
            savedContacts.length > 0 &&
            savedContacts.map((contact) => {
              return (
                <MenuItem key={contact.id} value={contact.id}>
                  {contact.title}
                </MenuItem>
              );
            })}
        </Select>
      </FormControl>
      <Stack direction={{ iv: "column", md: "row" }} spacing={2}>
        <TextField
          label="First name"
          value={currentInfo?.fName ? currentInfo.fName : ""}
          fullWidth
          disabled
        />
        <TextField
          label="Last name"
          value={currentInfo?.lName ? currentInfo.lName : ""}
          fullWidth
          disabled
        />
      </Stack>
      <TextField
        label="Phone number"
        helperText="In case we need to contact you about your order"
        value={currentInfo?.phone ? currentInfo.phone : ""}
        fullWidth
        disabled
      />
    </>
  );
};

export default ContactForm;
