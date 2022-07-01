import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";

const PaymentForm = () => {
  return (
    <>
      <Typography variant="h5" component="h2">
        Payment Methods
      </Typography>
      <FormControl fullWidth>
        <InputLabel id="payment-method-label">Payment method</InputLabel>
        <Select
          defaultValue={"Demo"}
          labelId="payment-method-label"
          id="payment-method"
          label="Payment method"
        >
          <MenuItem value={"Demo"}>Demo</MenuItem>
        </Select>
      </FormControl>
    </>
  );
};

export default PaymentForm;
