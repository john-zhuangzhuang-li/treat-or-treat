import { useState } from "react";
import { styled } from "@mui/material/styles";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import Collections from "./Collections";

import { DUMMY_COLLECTION_LIST } from "../../util/dummy";

const CollectionMenuBase = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  maxWidth: "30rem",
  rowGap: theme.spacing(2),
  padding: theme.spacing(2),
}));

const CollectionMenuList = styled("div")(({ theme }) => ({
  display: "grid",
  gridAutoRows: "7.5rem",
  rowGap: theme.spacing(2),
}));

const CollectionMenu = () => {
  const [collectionMenuAnchor, setCollectionMenuAnchor] = useState(null);

  const isCollectionMenuOpen = Boolean(collectionMenuAnchor);

  const handleCollectionMenuOpen = (event) => {
    setCollectionMenuAnchor(event.currentTarget);
  };

  const handleCollectionMenuClose = () => setCollectionMenuAnchor(null);

  return (
    <>
      <Button
        sx={{ display: { iv: "none", md: "flex" } }}
        color="inherit"
        variant="text"
        size="large"
        endIcon={<ExpandMoreIcon fontSize="large" />}
        onClick={handleCollectionMenuOpen}
      >
        Collections
      </Button>
      <Popover
        open={isCollectionMenuOpen}
        anchorEl={collectionMenuAnchor}
        onClose={handleCollectionMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <CollectionMenuBase>
          <Typography>Browse by collection</Typography>
          <CollectionMenuList>
            <Collections
              collectionList={DUMMY_COLLECTION_LIST}
              onItemClick={handleCollectionMenuClose}
            />
          </CollectionMenuList>
        </CollectionMenuBase>
      </Popover>
    </>
  );
};

export default CollectionMenu;
