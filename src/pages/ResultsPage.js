import { useState, useEffect, useContext } from "react";
import { useParams, useLoaderData } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

import Header from "../components/layout/Header";
import PageBackground from "../components/UI/PageBackground";
import Products from "../components/UI/Products";
import SortingOptions from "../components/results/SortingOptions";
import FilterOptions from "../components/results/FilterOptions";

import UserContext from "../store/UserContext";

import {
  DUMMY_SORTING_OPTIONS,
  DUMMY_FILTER_OPTIONS,
  DUMMY_URL,
} from "../store/DummyData";

import { getCollections, getProducts } from "../util/api";

const ResultsMain = styled(Paper)(({ theme }) => ({
  gridColumn: "center",
  gridRow: "3 / 5",
  display: "grid",
  gridTemplateColumns: "25rem minmax(min-content, 1fr)",
  gridAutoFlow: "column",
  zIndex: "20",
  overflow: "hidden",
  padding: theme.spacing(3, 3),
  rowGap: theme.spacing(3),
  columnGap: theme.spacing(3),
  borderRadius: 3 * theme.shape.borderRadius,
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "minmax(min-content, 1fr)",
    gridTemplateRows: "auto",
    gridAutoFlow: "row",
  },
}));

const ResultsList = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(6, minmax(min-content, 1fr))",
  rowGap: theme.spacing(3),
  columnGap: theme.spacing(3),
  [theme.breakpoints.down("hu")]: {
    gridTemplateColumns: "repeat(4, minmax(min-content, 1fr))",
  },
  [theme.breakpoints.down("lg")]: {
    gridTemplateColumns: "repeat(3, minmax(min-content, 1fr))",
  },
  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "repeat(2, minmax(min-content, 1fr))",
  },
}));

const ResultsFilter = styled("section")(({ theme }) => ({
  display: "grid",
  gridAutoRows: "min-content",
  rowGap: theme.spacing(3),
  columnGap: theme.spacing(3),
  paddingRight: theme.spacing(5),
  [theme.breakpoints.down("md")]: {
    paddingRight: "0",
    gridAutoColumns: "max-content",
    gridAutoFlow: "column",
    justifyContent: "end",
  },
}));

const ResultsPage = () => {
  const theme = useTheme();
  const loaderData = useLoaderData();

  const params = useParams();
  const { collection, group, keyword } = params;

  const userCtx = useContext(UserContext);
  const favoritedProducts = userCtx.favorites;

  let pageType = "";
  let contentKey = "";

  if (collection) {
    pageType = "collection";
    contentKey = collection;
  }
  if (!collection && group) {
    pageType = "group";
    contentKey = group;
  }
  if (!collection && !group && keyword) {
    pageType = "search";
    contentKey = keyword;
  }

  const [currentProductList, setCurrentProductList] = useState([]);
  const [filteredProductList, setFilteredProductList] = useState([]);
  const [displayProductList, setDisplayProductList] = useState([]);
  const [displayHeader, setDisplayHeader] = useState({});
  const [activeSorting, setActiveSorting] = useState("");
  const [activeFilters, setActiveFilters] = useState([]);

  useEffect(() => {
    // PAGE-TYPE EFFECT
    // TO DO: REBUILD WITH SEARCH PARAMS FOR CLEANER SOLUTION

    console.log("PAGE-TYPE EFFECT RUN");

    const defaultHeader = {
      title: "No results found",
      titleSub: "Try search by collection or product",
    };
    if (pageType === "collection") {
      if (!loaderData) {
        setDisplayHeader(defaultHeader);
        setCurrentProductList([]);
        return;
      }
      const pageCollection = { ...loaderData };
      const {
        title,
        products,
        imageLandscapeLarge: background,
      } = pageCollection;
      setDisplayHeader({ title, titleSub: "Collection", background });
      setCurrentProductList(products);
      return;
    }
    if (pageType === "group") {
      const loaderProducts = Object.values(loaderData);
      if (contentKey === "favorite") {
        if (!favoritedProducts || favoritedProducts.length === 0) {
          setDisplayHeader(defaultHeader);
          setCurrentProductList([]);
          return;
        }
        setDisplayHeader({ title: "Favorited", titleSub: "Products" });
        setCurrentProductList(favoritedProducts);
        return;
      }

      const groupedProducts = loaderProducts.filter((product) =>
        product.tags?.some((tag) => {
          const groupText = tag.replace(" ", "-").toLowerCase();
          return groupText === contentKey;
        })
      );
      if (!groupedProducts || groupedProducts.length === 0) {
        setDisplayHeader(defaultHeader);
        setCurrentProductList([]);
        return;
      }
      const title = contentKey.replace("-", " ").toUpperCase();
      setDisplayHeader({ title, titleSub: "Products" });
      setCurrentProductList(groupedProducts);
      return;
    }
    if (pageType === "search") {
      const loaderProducts = Object.values(loaderData);
      const resultProducts = loaderProducts.filter((product) => {
        const currentTitle = product.title.replace(" ", "").toLowerCase();
        return currentTitle.includes(contentKey);
      });
      if (!resultProducts || resultProducts.length === 0) {
        setDisplayHeader(defaultHeader);
        setCurrentProductList([]);
        return;
      }
      setDisplayHeader({
        title: `"${contentKey}"`,
        titleSub: "Search results",
      });
      setCurrentProductList(resultProducts);
      return;
    }
    setDisplayHeader(defaultHeader);
    setCurrentProductList([]);
    return;
  }, [pageType, contentKey, favoritedProducts, loaderData]);

  useEffect(() => {
    // FILTER EFFECT
    // TO DO: REBUILD WITH SEARCH PARAMS FOR CLEANER SOLUTION

    console.log("FILTER EFFECT RUN");

    if (activeFilters.length === 0) {
      setFilteredProductList([...currentProductList]);
      return;
    }

    let filteredProducts = [...currentProductList];

    activeFilters.forEach((activeFilter) => {
      if (filteredProducts.length > 0)
        filteredProducts = [...filteredProducts].filter((product) =>
          product.tags?.some((tag) => tag === activeFilter)
        );
    });

    setFilteredProductList([...filteredProducts]);
  }, [activeFilters, currentProductList]);

  useEffect(() => {
    // SORTER EFFECT
    // TO DO: REBUILD WITH SEARCH PARAMS FOR CLEANER SOLUTION

    console.log("SORTER EFFECT RUN");

    if (filteredProductList.length === 0) {
      setDisplayProductList([]);
      return;
    }

    const sortedProducts = [...filteredProductList];

    switch (activeSorting) {
      case "":
        break;
      case "price-up":
        sortedProducts.sort((a, b) => a.salePrice - b.salePrice);
        break;
      case "price-down":
        sortedProducts.sort((a, b) => b.salePrice - a.salePrice);
        break;
      case "average-rating":
        sortedProducts.sort((a, b) => b.averageRating - a.averageRating);
        break;
      default:
    }

    setDisplayProductList([...sortedProducts]);
  }, [activeSorting, filteredProductList]);

  const handleSortingSelect = (event, value) => {
    if (event.currentTarget?.value || event.currentTarget?.value === "") {
      setActiveSorting(event.currentTarget.value);
      return;
    }
    setActiveSorting(value);
  };

  const handleFilterToggle = (filter) => {
    if (activeFilters.some((activeFilter) => activeFilter === filter)) {
      setActiveFilters((prev) => {
        return prev.filter((activeFilter) => activeFilter !== filter);
      });
      return;
    }
    setActiveFilters((prev) => {
      return [...prev, filter];
    });
  };

  return (
    <>
      <PageBackground
        imageSrc={
          displayHeader.background
            ? `${DUMMY_URL}${displayHeader.background}`
            : theme.backgrounds.general1
        }
        extended
      />
      <Header>
        <Typography variant="titleMain1" component="h1">
          {displayHeader.title || ""}
        </Typography>
        <Typography variant="titleSub1" component="h2">
          {displayHeader.titleSub || ""}
        </Typography>
      </Header>
      <ResultsMain component="main">
        <ResultsFilter>
          <SortingOptions
            sortingOptions={DUMMY_SORTING_OPTIONS}
            onSortingSelect={handleSortingSelect}
            activeSorting={activeSorting}
          />
          <FilterOptions
            filterOptions={DUMMY_FILTER_OPTIONS}
            onFilterToggle={handleFilterToggle}
            activeFilters={activeFilters}
          />
        </ResultsFilter>
        <ResultsList>
          <Products data={displayProductList} />
        </ResultsList>
      </ResultsMain>
    </>
  );
};

export default ResultsPage;

export const collectionsLoader = async ({ params }) => {
  const collectionName = params.collection;
  const resData = await getCollections(collectionName);
  if (!resData) throw new Error("Something went wrong...");
  return resData;
};

export const productsLoader = async () => {
  const resData = await getProducts();
  if (!resData) throw new Error("Something went wrong...");
  return resData;
};
