import { useLoaderData } from "react-router-dom";
import { styled } from "@mui/material/styles";

import Box from "@mui/material/Box";
import MainHero from "../components/layout/MainHero";
import Title from "../components/UI/Title";
import Products from "../components/UI/Products";
import Collections from "../components/UI/Collections";

import { getData } from "../util/api";

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
  const { featuredData, onSaleData, collectionListData } = useLoaderData();
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
            <Collections collectionList={collectionListData} />
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
  const promoRes = await getData("promo-lists");
  if (!promoRes) throw new Error("Something went wrong...");
  const { featured: featuredRes, onSale: onSaleRes } = promoRes;
  if (!featuredRes || !onSaleRes) throw new Error("Something went wrong...");
  const featuredData = Object.values(featuredRes);
  const onSaleData = Object.values(onSaleRes);

  const collectionListRes = await getData("search/collectionList");
  if (!collectionListRes) throw new Error("Something went wrong...");
  const collectionListData = Object.values(collectionListRes);

  return { featuredData, onSaleData, collectionListData };
};
