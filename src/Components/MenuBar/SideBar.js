import React, { useState } from "react";
import PropTypes from "prop-types";
import List from "@material-ui/core/List";
import { Link as MaterialLink } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Drawer from "@material-ui/core/Drawer";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { Link } from "react-router-dom";
import MenuItems from "./menuItemsList";

const useStyles = makeStyles((theme) => ({
  list: {
    minWidth: 200,
  },
  link: {
    textDecoration: "none",
  },
  menuLinkWrapper: {
    padding: 0,
  },
  menuLink: {
    textDecoration: "none",
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    width: "100%",
    whiteSpace: "nowrap",
    "&:hover,&:focus": {
      textDecoration: "none",
      cursor: "pointer",
      backgroundColor: theme.palette.grey[200],
    },
  },
  menuHeader: {
    paddingLeft: "30px",
  },
  alignRight: {
    display: "flex",
    justifyContent: "flex-end",
  },
}));

const SideBar = (props) => {
  const classes = useStyles();
  const [openItems, setOpenItems] = useState([]);
  const { isOpen, drawerSide } = props;

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
            <ListItem className={classes.menuLinkWrapper}>
              <MaterialLink
                color="primary"
                href={subOption.external ? subOption.url : "/"}
                className={classes.menuLink}
                component={subOption.external ? "a" : Link}
                variant="body1"
                to={subOption.external ? null : subOption.url}
              >
                {subOption.name}
              </MaterialLink>
            </ListItem>
          </div>
        );
      }
      return (
        <Box key={subOption.id} color="primary">
          <ListItem
            onClick={() => handleExpandableItemClick(subOption.id)}
            button
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
  isOpen: PropTypes.bool,
  handleDisplayChange: PropTypes.func.isRequired,
  drawerSide: PropTypes.string,
};
SideBar.defaultProps = {
  isOpen: false,
  drawerSide: "right",
};

export default SideBar;
