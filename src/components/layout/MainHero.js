import { styled, useTheme } from "@mui/material/styles";

import PromoCard from "../UI/PromoCard";

import useNavigateTo from "../../hooks/useNavigateTo";

const Hero = styled("div")(({ theme }) => ({
  gridColumn: "center",
  display: "grid",
  gridTemplateColumns: "repeat(6, 1fr)",
  gridTemplateRows: "repeat(2, min-content)",
  rowGap: theme.spacing(3),
  columnGap: theme.spacing(3),
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "repeat(4, 1fr)",
    gridTemplateRows: "auto",
  },
  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "1fr",
  },
}));

const MainHero = () => {
  const theme = useTheme();
  const navigateTo = useNavigateTo();

  const handlePromoClick = (event) => {
    navigateTo({
      dataset: event.currentTarget.dataset,
      key: "linkTo",
    });
  };

  return (
    <Hero>
      <PromoCard
        variant="large"
        imageSrc={theme.images.promoMain}
        previewSrc={theme.images.promoMainPreview}
        dataLinkTo={"/group/seasonal"}
        onPromoClick={handlePromoClick}
        titleMain="Enjoy the season"
        titleSub="Seasonal selections available now"
      />
      <PromoCard
        variant="small"
        color="primary"
        imageSrc={theme.images.promoSub1}
        previewSrc={theme.images.promoSub1Preview}
        dataLinkTo={"/group/critics-choice"}
        onPromoClick={handlePromoClick}
        titleMain="Critics Choice"
        titleSub="Our all time bests"
      />
      <PromoCard
        variant="small"
        color="secondary"
        imageSrc={theme.images.promoSub2}
        previewSrc={theme.images.promoSub2Preview}
        dataLinkTo={"/group/on-sale"}
        onPromoClick={handlePromoClick}
        titleMain="On Sale"
        titleSub="Deals of the day"
      />
    </Hero>
  );
};

export default MainHero;
