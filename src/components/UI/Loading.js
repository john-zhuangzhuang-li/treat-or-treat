import { styled } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";

const LoadingBase = styled("div")(({ theme }) => ({
  gridColumn: "center",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  padding: theme.spacing(3),
}));

const Loading = () => {
  return (
    <LoadingBase>
      <CircularProgress />
    </LoadingBase>
  );
};

export default Loading;
