import { useState, useEffect } from "react";
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

import useInputValidation from "../../hooks/useInputValidation";

import { SEARCH_FETCH_LOCATION } from "../../util/api";

import useNavigateTo from "../../hooks/useNavigateTo";

const SearchDialogTitle = styled(DialogTitle)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    display: "flex",
    flexDirection: "column",
    rowGap: theme.spacing(2),
  },
}));

const ErrorBase = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
});

const SearchButton = () => {
  const theme = useTheme();
  const navigateTo = useNavigateTo();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [dialogOpen, setDialogOpen] = useState(false);

  const { inputValue, inputValueValid, inputHelperText, handleInputChange } =
    useInputValidation({ maxLength: 30, regex: /^[a-zA-Z0-9\s]+$/ });

  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [searchSuggestion, setSearchSuggestion] = useState({});

  useEffect(() => {
    // SUGGESTION EFFECTS
    if (!inputValueValid) {
      setSearchLoading(false);
      setSearchSuggestion({});
      return;
    }
    setSearchLoading(true);
    setSearchError("");
    setSearchSuggestion({});
    const handleSuggestion = setTimeout(() => {
      const fetchSearchData = async () => {
        // console.log("SEARCH FETCHER RUN");
        const response = await fetch(SEARCH_FETCH_LOCATION);
        if (!response.ok) {
          console.log(response);
          throw new Error("Something went wrong...");
        }
        const resData = await response.json();
        if (!resData) {
          console.log(resData);
          throw new Error("Something went wrong...");
        }
        const { collectionList, productList } = resData;
        if (!collectionList || !productList) {
          console.log(resData);
          throw new Error("Something went wrong...");
        }
        const collections = Object.values(collectionList);
        const products = Object.values(productList);

        const currentSearch = inputValue.replace(" ", "").toLowerCase();

        const matchingCollections = collections.filter((collection) =>
          collection.url.includes(currentSearch)
        );
        const matchingProducts = products.filter((product) => {
          const title = product.title.replace(" ", "").toLowerCase();
          return title.includes(currentSearch);
        });

        const adjustedMatchingProducts = matchingProducts.map((product) => {
          const { id, url, title, collection } = product;
          return {
            id,
            url,
            title,
            collectionTitle: collectionList[collection].title,
          };
        });
        setSearchSuggestion({
          collections: matchingCollections,
          products: adjustedMatchingProducts,
        });
        setSearchLoading(false);
      };

      fetchSearchData().catch((error) => {
        console.log(error);
        setSearchError("Failed to fetch data :O");
        setSearchLoading(false);
      });
    }, 500);
    return () => clearTimeout(handleSuggestion);
  }, [inputValueValid, inputValue]);

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };
  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleNavigateTo = (event) => {
    navigateTo({
      dataset: event.currentTarget.dataset,
      key: "linkTo",
      callback: handleDialogClose,
    });
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
            value={inputValue}
            onChange={handleInputChange}
            helperText={
              inputHelperText || "Try search by collection or product"
            }
            error={Boolean(inputHelperText)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    disabled={searchLoading || !inputValueValid}
                    data-link-to={`/results/${inputValue}`}
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
            inputValueValid &&
            ("collections" in searchSuggestion ||
              "products" in searchSuggestion) && (
              <SearchSuggestionList
                searchInfo={inputValue}
                suggestion={searchSuggestion}
                onNavigateTo={handleNavigateTo}
              />
            )}
          {!searchLoading && !inputValueValid && (
            <ErrorBase>
              <Typography component="div" variant="body2">
                {searchError || "Search results will appear here"}
              </Typography>
            </ErrorBase>
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
