import { useState } from "react";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

const FilterOptions = (props) => {
  const [filterMenuAnchor, setFilterMenuAnchor] = useState(null);

  const handleFilterMenuClick = (event) => {
    setFilterMenuAnchor(event.currentTarget);
  };

  const handleFilterMenuClose = () => {
    setFilterMenuAnchor(null);
  };

  const filterMenuOpen = Boolean(filterMenuAnchor);
  const filterMenuId = filterMenuOpen ? "filter-menu" : undefined;

  const renderChipFilters = (allFilter, toggleFilter, activeFilters) => {
    if (!allFilter || !Array.isArray(allFilter) || !allFilter.length) return;
    return (
      <>
        {allFilter.map((filter) => {
          const isActive = activeFilters.some(
            (activeFilter) => activeFilter === filter
          );
          return (
            <Chip
              key={filter}
              label={filter}
              variant="filled"
              color={isActive ? "primary" : "default"}
              onClick={() => toggleFilter(filter)}
              onDelete={isActive ? () => toggleFilter(filter) : null}
            />
          );
        })}
      </>
    );
  };

  const renderMenuFilters = (allFilter, toggleFilter, activeFilters) => {
    if (!allFilter || allFilter.length === 0) return;
    return (
      <>
        {allFilter.map((filter) => {
          const isActive = activeFilters.some(
            (activeFilter) => activeFilter === filter
          );
          const labelId = `filter-menu-checkbox-${filter}`;
          return (
            <ListItem key={filter} disablePadding>
              <ListItemButton
                role={undefined}
                onClick={() => toggleFilter(filter)}
                dense
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={isActive}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={filter} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </>
    );
  };

  return (
    <>
      <Box
        sx={{
          mt: { iv: 0, md: 3 },
          mb: { iv: 0, md: 1 },
          columnGap: 2,
          display: { iv: "none", md: "flex" },
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <FilterAltIcon color="primary" />
        <Typography>Filter by</Typography>
      </Box>
      <Box
        sx={{
          display: { iv: "none", md: "flex" },
          flexWrap: "wrap",
          rowGap: 2,
          columnGap: 1,
        }}
      >
        {renderChipFilters(
          props.filterOptions,
          props.onFilterToggle,
          props.activeFilters
        )}
      </Box>
      <Button
        variant={props.activeFilters.length === 0 ? "outlined" : "contained"}
        startIcon={<FilterAltIcon />}
        sx={{ borderRadius: 6, display: { iv: "flex", md: "none" } }}
        onClick={handleFilterMenuClick}
      >
        filter
      </Button>
      <Popover
        id={filterMenuId}
        open={filterMenuOpen}
        anchorEl={filterMenuAnchor}
        onClose={handleFilterMenuClose}
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
          {renderMenuFilters(
            props.filterOptions,
            props.onFilterToggle,
            props.activeFilters
          )}
        </List>
      </Popover>
    </>
  );
};

export default FilterOptions;
