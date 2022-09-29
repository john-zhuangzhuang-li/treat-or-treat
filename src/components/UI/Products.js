import { useContext } from "react";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";

import FavoriteButton from "./FavoriteButton";
import SaleLabel from "./SaleLabel";
import ProgressiveImage from "./ProgressiveImage";

import { DUMMY_URL } from "../../util/dummy";

import UserContext from "../../store/UserContext";

const ProductBase = styled("div")(({ theme }) => ({
  maxWidth: "45rem",
  display: "flex",
  flexDirection: "column",
  rowGap: theme.spacing(1),
}));

const ProductCard = styled(Card)(({ theme }) => ({
  maxWidth: "45rem",
  overflow: "hidden",
  position: "relative",
  cursor: "pointer",
  borderRadius: 3 * theme.shape.borderRadius,
  "&:hover > img": {
    transform: "scale(1.1)",
  },
}));

const ProductContent = styled("div")({
  display: "flex",
  justifyContent: "space-between",
});

const ContentTitle = styled("div")({
  lineHeight: "1",
});

const NotFoundBase = styled(Typography)({
  justifySelf: "center",
  alignSelf: "center",
  gridColumn: "1 / -1",
});

const Products = (props) => {
  const navigate = useNavigate();
  const userCtx = useContext(UserContext);

  const handleAddFavorite = (product) => {
    userCtx.addFavorite(product);
  };
  const handleRemoveFavorite = (id) => {
    userCtx.removeFavorite(id);
  };

  const handleNavigateTo = (event) => {
    const { dataset } = event.currentTarget;
    if (!dataset.linkTo) return;
    navigate(dataset.linkTo);
  };

  return (
    <>
      {props.data && Array.isArray(props.data) && props.data.length > 0 ? (
        props.data.map((product) => {
          const onSale = Boolean(product.salePrice < product.regularPrice);
          const isFavorite = userCtx.favorites.some(
            (favorite) => favorite.id === product.id
          );

          return (
            <ProductBase key={product.id}>
              <ProductCard>
                {onSale && <SaleLabel />}
                <FavoriteButton
                  isFavorite={isFavorite}
                  onIconToggle={
                    isFavorite
                      ? handleRemoveFavorite.bind(null, product.id)
                      : handleAddFavorite.bind(null, product)
                  }
                />
                <ProgressiveImage
                  imageSrc={`${DUMMY_URL}${product.imageSquareMedium}`}
                  previewSrc={`${DUMMY_URL}${product.imageSquareMediumPreview}`}
                  onImageClick={handleNavigateTo}
                  ImageDataLinkTo={`/product/${product.url}`}
                />
              </ProductCard>
              <ProductContent>
                <ContentTitle>
                  <Typography variant="button" component="h6">
                    {product.title}
                  </Typography>
                  <Typography variant="caption" component="span">
                    {product.collection}
                  </Typography>
                </ContentTitle>
                <Typography variant="button" component="span">
                  {`$${product.salePrice}`}
                </Typography>
              </ProductContent>
            </ProductBase>
          );
        })
      ) : (
        <NotFoundBase component="div" variant="h6">
          No results found
        </NotFoundBase>
      )}
    </>
  );
};

export default Products;
