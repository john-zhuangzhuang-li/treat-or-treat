import { useLoaderData } from "react-router-dom";
import { styled } from "@mui/material/styles";

import Box from "@mui/material/Box";
import MainHero from "../components/layout/MainHero";
import Title from "../components/UI/Title";
import Products from "../components/UI/Products";
import Collections from "../components/UI/Collections";

import { DUMMY_COLLECTION_LIST } from "../store/DummyData";

import { getPromo } from "../util/api";

// NEXT STEP: USE LOADER TO GET 3 DATA SET DIRECTLY

const Main = styled(Box)(({ theme }) => ({
  gridColumn: "center",
  display: "grid",
  rowGap: theme.spacing(3),
  columnGap: theme.spacing(3),
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "auto",
    gridAutoFlow: "row",
  },
}));

const MainGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  rowGap: theme.spacing(3),
  columnGap: theme.spacing(3),
}));

const ProductList = styled(Box)(({ theme }) => ({
  display: "grid",
  rowGap: theme.spacing(3),
  columnGap: theme.spacing(3),
  gridTemplateColumns: "repeat(6, minmax(min-content, 1fr))",
  [theme.breakpoints.down("hu")]: {
    gridTemplateColumns: "repeat(4, minmax(min-content, 1fr))",
  },
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "repeat(2, minmax(min-content, 1fr))",
  },
}));

const PromoList = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(4, minmax(min-content, 1fr))",
  gridAutoRows: "20rem",
  rowGap: theme.spacing(3),
  columnGap: theme.spacing(3),
  [theme.breakpoints.down("hu")]: {
    gridTemplateColumns: "repeat(2, minmax(min-content, 1fr))",
  },
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "auto",
    gridAutoRows: "15rem",
  },
  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "auto",
    gridAutoRows: "10rem",
  },
}));

const MainPage = () => {
  const { featuredData, onSaleData } = useLoaderData();
  return (
    <>
      <MainHero />
      <Main component="main">
        <MainGrid>
          <Title textMain={"Featured"} textSub={"Treat-or-treat essentials"} />
          <ProductList>
            <Products data={featuredData} />
          </ProductList>
          <Title textMain={"Collections"} textSub={"Browse by collections"} />
          <PromoList>
            <Collections collectionList={DUMMY_COLLECTION_LIST} />
          </PromoList>
          <Title textMain={"On Sale"} textSub={"Latest deals to grab"} />
          <ProductList>
            <Products data={onSaleData} />
          </ProductList>
        </MainGrid>
      </Main>
    </>
  );
};

export default MainPage;

export const loader = async () => {
  const featuredRes = await getPromo("featured");
  if (!featuredRes) throw new Error("Something went wrong...");
  const onSaleRes = await getPromo("on-sale");
  if (!onSaleRes) throw new Error("Something went wrong...");
  const featuredData = Object.values(featuredRes);
  const onSaleData = Object.values(onSaleRes);
  return { featuredData, onSaleData };
};
