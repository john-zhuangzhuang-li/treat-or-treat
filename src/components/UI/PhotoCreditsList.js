import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";

import { DUMMY_PHOTO_CREDITS } from "../../store/DummyData";

const PhotoCreditsList = () => {
  return (
    <>
      <List>
        {DUMMY_PHOTO_CREDITS.map((credit, index, credits) => {
          return (
            <Box key={`item-${credit.artist}`} component="li">
              <ListItem component="div">
                <ListItemText>
                  {`Photo by `}
                  <Link href={credit.artistUrl}>{credit.artist}</Link>
                  {` on `}
                  <Link href={credit.companyUrl}>{credit.company}</Link>
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
