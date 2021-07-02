import React, { useState } from "react";
import PropTypes from "prop-types";
import List from "@material-ui/core/List";
import Box from "@material-ui/core/Box";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Drawer from "@material-ui/core/Drawer";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { Link } from "react-router-dom";
import MenuItems from "./menuItemsList";

const styles = {
  list: {
    minWidth: 200,
  },
  link: {
    textDecoration: "none",
  },
  menuHeader: {
    paddingLeft: "30px",
  },
  alignRight: {
    display: "flex",
    justifyContent: "flex-end",
  },
};
const SideBar = (props) => {
  const [openItems, setOpenItems] = useState([]);
  const { classes, isOpen, drawerSide } = props;

  const handleExpandableItemClick = (currentItem) => {
    if (openItems.includes(currentItem)) {
      const newItems = openItems.filter((item) => item !== currentItem);
      setOpenItems([...newItems]);
    } else {
      setOpenItems([...openItems, currentItem]);
    }
  };

  const renderMenuItems = (children) => {
    return children.map((subOption) => {
      if (!subOption.children) {
        return (
          <div key={subOption.id}>
            <ListItem button>
              <Link to={subOption.url} className={classes.link}>
                <ListItemText
                  primary={
                    <Typography color="primary">{subOption.name}</Typography>
                  }
                />
              </Link>
            </ListItem>
          </div>
        );
      }
      return (
        <Box key={subOption.id} color="primary">
          <ListItem
            button
            onClick={() => handleExpandableItemClick(subOption.id)}
          >
            <ListItemText
              primary={
                <Typography color="primary">{subOption.name}</Typography>
              }
            />
            <Box ml={3}>
              {openItems.includes(subOption.id) ? (
                <ExpandLess color="primary" />
              ) : (
                <ExpandMore color="primary" />
              )}
            </Box>
          </ListItem>
          <Collapse
            in={openItems.includes(subOption.id)}
            timeout="auto"
            unmountOnExit
          >
            {renderMenuItems(subOption.children)}
          </Collapse>
        </Box>
      );
    });
  };

  return (
    <div className={classes.list}>
      <Drawer
        variant="persistent"
        anchor={drawerSide}
        open={isOpen}
        classes={{ paper: classes.list }}
      >
        <div>
          <List>
            <ListItem key="menuHeading" divider className={classes.alignRight}>
              <IconButton onClick={() => props.handleDisplayChange(!isOpen)}>
                {drawerSide === "left" ? (
                  <ChevronLeftIcon />
                ) : (
                  <ChevronRightIcon />
                )}
              </IconButton>
            </ListItem>
            {renderMenuItems(MenuItems.data)}
          </List>
        </div>
      </Drawer>
    </div>
  );
};

SideBar.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
  isOpen: PropTypes.bool,
  handleDisplayChange: PropTypes.func.isRequired,
  drawerSide: PropTypes.string,
};
SideBar.defaultProps = {
  classes: null,
  isOpen: false,
  drawerSide: "right",
};

export default withStyles(styles)(SideBar);
