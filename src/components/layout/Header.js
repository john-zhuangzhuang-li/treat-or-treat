import { styled } from "@mui/material/styles";

const PageHeader = styled("div")({
  gridColumn: "center",
  gridRow: "2 / 3",
  height: "20rem",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  zIndex: "10",
});

const Header = (props) => {
  return <PageHeader>{props.children}</PageHeader>;
};

export default Header;
