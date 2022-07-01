import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

const SearchSuggestionList = (props) => {
  const { collections, products } = props.suggestion;
  return (
    <List>
      <ListItemButton
        data-link-to={`/results/${props.searchInfo}`}
        onClick={props.onNavigateTo}
      >
        <ListItemText
          primary={`Search "${props.searchInfo}" in all products`}
        />
      </ListItemButton>
      {collections &&
        collections.length > 0 &&
        collections.map((collection) => {
          return (
            <Box component="li" key={`collection-${collection.id}`}>
              <Divider />
              <ListItemButton
                data-link-to={`/collection/${collection.url}`}
                onClick={props.onNavigateTo}
              >
                <ListItemText primary={`${collection.title} collection`} />
              </ListItemButton>
            </Box>
          );
        })}
      {products &&
        products.length > 0 &&
        products.map((product) => {
          return (
            <Box component="li" key={`product-${product.id}`}>
              <Divider />
              <ListItemButton
                data-link-to={`/product/${product.url}`}
                onClick={props.onNavigateTo}
              >
                <ListItemText
                  primary={`${product.title}, ${product.collectionTitle}`}
                />
              </ListItemButton>
            </Box>
          );
        })}
    </List>
  );
};

export default SearchSuggestionList;
