import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";

const PromoForm = () => {
  return (
    <>
      <Typography variant="h5" component="h2">
        Promo code
      </Typography>
      <FormControl fullWidth>
        <InputLabel id="promo-code-label">Promo code</InputLabel>
        <Select
          defaultValue={"None"}
          labelId="promo-code-label"
          id="promo-code"
          label="Promo code"
        >
          <MenuItem value={"None"}>None</MenuItem>
        </Select>
      </FormControl>
    </>
  );
};

export default PromoForm;
