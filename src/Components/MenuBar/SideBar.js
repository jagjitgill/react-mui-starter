import React, { useState } from "react";
import PropTypes from "prop-types";
import List from "@mui/material/List";
import { Link as MaterialLink } from "@mui/material";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Drawer from "@mui/material/Drawer";
import makeStyles from "@mui/styles/makeStyles";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
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
              <IconButton
                onClick={() => props.handleDisplayChange(!isOpen)}
                size="large"
              >
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
