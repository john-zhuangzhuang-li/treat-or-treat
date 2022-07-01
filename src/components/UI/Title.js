import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Title = (props) => {
  return (
    <Box
      mt={3}
      mb={1}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
      }}
    >
      {props.textMain ? (
        <Typography variant="titleMain1" component="h3">
          {props.textMain}
        </Typography>
      ) : (
        ""
      )}
      {props.textSub ? (
        <Typography variant="titleSub1" component="h4">
          {props.textSub}
        </Typography>
      ) : (
        ""
      )}
    </Box>
  );
};

export default Title;
