import { useState, useEffect } from "react";

import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const AddressForm = (props) => {
  const { savedAddresses, onInfoChange, currentInfo } = props;
  const [selection, setSelection] = useState(currentInfo?.id || "");

  useEffect(() => {
    if (!selection || !savedAddresses || savedAddresses.length === 0) return;
    const updatedInfo = savedAddresses.find(
      (address) => address.id === selection
    );
    if (!updatedInfo) return;
    onInfoChange(updatedInfo);
  }, [selection, savedAddresses, onInfoChange]);

  const handleSelectionChange = (event) => {
    setSelection(event.target.value);
  };

  return (
    <>
      <Typography variant="h5" component="h2">
        Shipping Address
      </Typography>
      <FormControl fullWidth>
        <InputLabel>Saved Addresses</InputLabel>
        <Select
          value={selection}
          label="Saved Addresses"
          onChange={handleSelectionChange}
        >
          {savedAddresses &&
            savedAddresses.length > 0 &&
            savedAddresses.map((address) => {
              return (
                <MenuItem key={address.id} value={address.id}>
                  {address.title}
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
        label="Address"
        value={currentInfo?.address ? currentInfo.address : ""}
        fullWidth
        disabled
      />
      <Stack direction={{ iv: "column", md: "row" }} spacing={2}>
        <TextField
          label="Unit or suite number"
          helperText="if applicable"
          value={currentInfo?.unit ? currentInfo.unit : ""}
          fullWidth
          disabled
        />
        <TextField
          label="City"
          value={currentInfo?.city ? currentInfo.city : ""}
          fullWidth
          disabled
        />
      </Stack>
      <Stack direction={{ iv: "column", md: "row" }} spacing={2}>
        <TextField
          label="Province"
          value={currentInfo?.province ? currentInfo.province : ""}
          fullWidth
          disabled
        />
        <TextField
          label="Postal code"
          value={currentInfo?.postal ? currentInfo.postal : ""}
          fullWidth
          disabled
        />
      </Stack>
      <TextField
        label="Phone number"
        helperText="In case we need to contact you about your order"
        value={currentInfo?.phone ? currentInfo.phone : ""}
        disabled
      />
    </>
  );
};

export default AddressForm;
