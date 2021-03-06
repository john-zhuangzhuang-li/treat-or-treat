import { useNavigate } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";

const CollectionCard = styled(Card)(({ theme }) => ({
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  transition: "all 0.3s",
  backgroundBlendMode: "overlay",
  backgroundColor: alpha(theme.palette.common.white, 0.85),
  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.dark, 0.85),
  },
  "&:hover > figure": {
    transform: "scale(1.35)",
    fill: theme.palette.primary.contrastText,
  },
}));

const Logo = styled(Box)(({ theme }) => ({
  display: "flex",
  transition: "all 0.3s",
  fill: theme.palette.primary.main,
  maxWidth: "50%",
}));

const Collections = (props) => {
  const navigate = useNavigate();

  const handleCollectionClick = (event) => {
    const { dataset } = event.currentTarget;
    if (!dataset.collectionUrl || dataset.collectionUrl === "") return;
    navigate(`/collection/${dataset.collectionUrl}`);
    if (props.onItemClick) props.onItemClick();
  };

  const { collectionList: collections } = props;

  return (
    <>
      {collections &&
        Array.isArray(collections) &&
        collections.map((collection) => {
          const {
            id,
            url,
            logo,
            imageLandscapeMedium: background,
          } = collection;
          return (
            <CollectionCard
              key={`collection-${id}`}
              sx={{
                backgroundImage: `url(${background})`,
              }}
              data-collection-url={url}
              onClick={handleCollectionClick}
            >
              <Logo component="figure">{logo}</Logo>
            </CollectionCard>
          );
        })}
    </>
  );
};

export default Collections;
