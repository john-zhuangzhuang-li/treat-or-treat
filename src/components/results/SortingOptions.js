import { useState } from "react";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import SortIcon from "@mui/icons-material/Sort";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const SortingOptions = (props) => {
  const [sortMenuAnchor, setSortMenuAnchor] = useState(null);

  const handleSortMenuClick = (event) => {
    setSortMenuAnchor(event.currentTarget);
  };

  const handleSortMenuClose = () => {
    setSortMenuAnchor(null);
  };

  const sortMenuOpen = Boolean(sortMenuAnchor);
  const sortMenuId = sortMenuOpen ? "sort-menu" : undefined;

  const renderSortingOptions = (options) => {
    return options.map((option) => {
      return (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      );
    });
  };

  const renderSortingMenu = (options, select, activeSorting) => {
    if (!options || !Array.isArray(options) || !options.length) return;
    return options.map((option) => {
      const isSelected = Boolean(option.value === activeSorting);
      return (
        <ListItem key={option.value} disablePadding>
          <ListItemButton
            selected={isSelected}
            onClick={(event) => {
              if (!isSelected) {
                select(event, option.value);
                return;
              }
              if (isSelected) select(event, "");
            }}
          >
            {isSelected && (
              <ListItemIcon>
                <CheckCircleIcon color="primary" />
              </ListItemIcon>
            )}
            <ListItemText
              primary={option.label}
              inset={!isSelected && activeSorting !== ""}
            />
          </ListItemButton>
        </ListItem>
      );
    });
  };

  return (
    <>
      <Box
        sx={{
          columnGap: 2,
          display: { iv: "none", md: "flex" },
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <SortIcon color="primary" />
        <Typography>Sort by</Typography>
      </Box>
      <FormControl>
        <InputLabel htmlFor="sorting-options">Sort options</InputLabel>
        <Select
          native
          value={props.activeSorting}
          onChange={props.onSortingSelect}
          id="sorting-options"
          label="Sort options"
          variant="standard"
          sx={{ display: { iv: "none", md: "flex" } }}
        >
          <option aria-label="None" value="" />
          {renderSortingOptions(props.sortingOptions)}
        </Select>
      </FormControl>

      <Button
        variant={props.activeSorting === "" ? "outlined" : "contained"}
        startIcon={<SortIcon />}
        sx={{ borderRadius: 6, display: { iv: "flex", md: "none" } }}
        onClick={handleSortMenuClick}
      >
        sort
      </Button>
      <Popover
        id={sortMenuId}
        open={sortMenuOpen}
        anchorEl={sortMenuAnchor}
        onClose={handleSortMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          <ListItem disablePadding>
            <ListItemButton
              onClick={(event) => {
                if (props.activeSorting !== "")
                  props.onSortingSelect(event, "");
              }}
            >
              <ListItemText
                primary={"None"}
                inset={props.activeSorting !== ""}
              />
            </ListItemButton>
          </ListItem>
          {renderSortingMenu(
            props.sortingOptions,
            props.onSortingSelect,
            props.activeSorting
          )}
        </List>
      </Popover>
    </>
  );
};

export default SortingOptions;
