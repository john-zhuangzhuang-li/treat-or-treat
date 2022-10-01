import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";

const PhotoCreditsList = ({ data }) => {
  if (!data) {
    return (
      <List>
        <ListItem>
          <ListItemText>
            {`It looks like credits may not be available now :/`}
          </ListItemText>
        </ListItem>
      </List>
    );
  }
  return (
    <>
      <List>
        {Object.entries(data).map((credit, index, credits) => {
          return (
            <Box key={credit[0]} component="li">
              <ListItem component="div">
                <ListItemText>
                  {`Photo by `}
                  <Link href={credit[1].artistUrl}>{credit[1].artist}</Link>
                  {` on `}
                  <Link href={credit[1].companyUrl}>{credit[1].company}</Link>
                </ListItemText>
              </ListItem>
              {index < credits.length - 1 && <Divider />}
            </Box>
          );
        })}
      </List>
    </>
  );
};

export default PhotoCreditsList;
