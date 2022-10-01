import { styled, alpha } from "@mui/material/styles";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";

import { DUMMY_URL, DUMMY_COLLECTION_LOGOS } from "../../util/dummy";

import useNavigateTo from "../../hooks/useNavigateTo";

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

const Collections = ({ collectionList: collections, onItemClick }) => {
  const navigateTo = useNavigateTo();

  const handleCollectionClick = (event) => {
    navigateTo({
      path: "/collection/",
      dataset: event.currentTarget.dataset,
      key: "collectionUrl",
      callback: onItemClick || null,
    });
  };

  return (
    <>
      {collections &&
        Array.isArray(collections) &&
        collections.map((collection) => {
          const { id, url, imageLandscapeMedium: background } = collection;
          return (
            <CollectionCard
              key={`collection-${id}`}
              sx={{
                backgroundImage: `url(${DUMMY_URL}${background})`,
              }}
              data-collection-url={url}
              onClick={handleCollectionClick}
            >
              <Logo component="figure">{DUMMY_COLLECTION_LOGOS[url]}</Logo>
            </CollectionCard>
          );
        })}
    </>
  );
};

export default Collections;
