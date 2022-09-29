import { styled, useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";

import PageBackground from "../components/UI/PageBackground";

// NEXT STEP: MIGHT CHANGE THIS TO AN ERROR PAGE ALSO FOR LOADER FAILURE

const PageTitle = styled("div")(({ theme }) => ({
  gridColumn: "center",
  gridRow: "2 / 3",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  rowGap: theme.spacing(3),
  zIndex: "10",
  paddingBottom: theme.spacing(3),
}));

const NotFoundPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleHomeButtonClick = () => {
    navigate("/");
  };

  return (
    <>
      <PageBackground imageSrc={theme.backgrounds.general3} />
      <PageTitle>
        <Typography variant="titleMain1" component="h1">
          Oops
        </Typography>
        <Card
          sx={{
            borderRadius: 3,
            overflow: "hidden",
          }}
        >
          <CardMedia
            component="img"
            image={theme.images.notFound}
            alt="not found"
          />
        </Card>
        <Typography variant="titleSub1" component="h2">
          Something must be wrong...
        </Typography>
        <Button variant="contained" onClick={handleHomeButtonClick}>
          return to home
        </Button>
      </PageTitle>
    </>
  );
};

export default NotFoundPage;
