import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import InputAdornment from "@mui/material/InputAdornment";
import Typography from "@mui/material/Typography";

import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

import SearchSuggestionList from "./SearchSuggestionList";
import Loading from "./Loading";

import { DUMMY_PRODUCT_DATA, DUMMY_PRODUCT_ALL } from "../../store/DummyData";

const SearchDialogTitle = styled(DialogTitle)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    display: "flex",
    flexDirection: "column",
    rowGap: theme.spacing(2),
  },
}));

const NotFoundBase = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
});

const SearchButton = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [dialogOpen, setDialogOpen] = useState(false);

  const [searchInfo, setSearchInfo] = useState("");
  const [searchInfoValid, setSearchInfoValid] = useState(false);
  const [searchHelperText, setSearchHelperText] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchSuggestion, setSearchSuggestion] = useState({});

  useEffect(() => {
    // VALIDATION EFFECTS
    if (searchInfo === "") {
      setSearchHelperText("");
      setSearchInfoValid(false);
      return;
    }
    if (searchInfo.length > 30) {
      setSearchHelperText("Please enter less than 30 characters");
      setSearchInfoValid(false);
      return;
    }
    const searchRegex = /^[a-zA-Z0-9\s]+$/;
    const infoValid = searchInfo.match(searchRegex);
    if (!infoValid) {
      setSearchHelperText("Please enter words without special characters");
      setSearchInfoValid(false);
      return;
    }
    setSearchHelperText("");
    setSearchInfoValid(true);
  }, [searchInfo]);

  useEffect(() => {
    // SUGGESTION EFFECTS
    if (!searchInfoValid) {
      setSearchLoading(false);
      setSearchSuggestion({});
      return;
    }
    setSearchLoading(true);
    setSearchSuggestion({});
    const handleSuggestion = setTimeout(() => {
      setSearchLoading(false);
      const currentSearch = searchInfo.replace(" ", "").toLowerCase();
      const matchingCollections = [];
      for (const collection in DUMMY_PRODUCT_DATA) {
        if (collection.includes(currentSearch)) {
          const { id, title, url } = DUMMY_PRODUCT_DATA[collection];
          matchingCollections.push({ id, title, url });
        }
      }
      const matchingProducts = DUMMY_PRODUCT_ALL.filter((product) => {
        const title = product.title.replace(" ", "").toLowerCase();
        return title.includes(currentSearch);
      });
      const adjustedMatchingProducts = matchingProducts.map((product) => {
        const { id, url, title, collection } = product;
        return {
          id,
          url,
          title,
          collectionTitle: DUMMY_PRODUCT_DATA[collection].title,
        };
      });
      setSearchSuggestion({
        collections: matchingCollections,
        products: adjustedMatchingProducts,
      });
    }, 500);
    return () => clearTimeout(handleSuggestion);
  }, [searchInfoValid, searchInfo]);

  const handleSearchInput = (event) => {
    setSearchInfo(event.target.value);
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };
  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleNavigateTo = (event) => {
    const { dataset } = event.currentTarget;
    if (!dataset.linkTo) return;
    handleDialogClose();
    navigate(dataset.linkTo);
  };

  return (
    <>
      <IconButton size="large" color="inherit" onClick={handleDialogOpen}>
        <SearchIcon />
      </IconButton>
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        maxWidth="md"
        fullWidth
        fullScreen={fullScreen}
      >
        <SearchDialogTitle>
          {fullScreen && (
            <Button onClick={handleDialogClose} endIcon={<CloseIcon />}>
              close
            </Button>
          )}
          <TextField
            autoFocus
            id="name"
            label="Search"
            fullWidth
            variant="filled"
            value={searchInfo}
            onChange={handleSearchInput}
            helperText={
              searchHelperText === ""
                ? "Try search by collection or product"
                : searchHelperText
            }
            error={searchHelperText === "" ? false : true}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    disabled={searchLoading || !searchInfoValid}
                    data-link-to={`/results/${searchInfo}`}
                    onClick={handleNavigateTo}
                  >
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </SearchDialogTitle>

        <DialogContent sx={{ height: fullScreen ? "auto" : "40vh" }}>
          {searchLoading && <Loading />}
          {!searchLoading &&
            searchInfoValid &&
            ("collections" in searchSuggestion ||
              "products" in searchSuggestion) && (
              <SearchSuggestionList
                searchInfo={searchInfo}
                suggestion={searchSuggestion}
                onNavigateTo={handleNavigateTo}
              />
            )}
          {!searchLoading && !searchInfoValid && (
            <NotFoundBase>
              <Typography component="div" variant="body2">
                Search results will appear here
              </Typography>
            </NotFoundBase>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SearchButton;
