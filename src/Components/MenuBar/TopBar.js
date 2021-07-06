import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MenuIcon from "@material-ui/icons/Menu";
import Box from "@material-ui/core/Box";
import { Link as MaterialLink, Typography } from "@material-ui/core";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import Hidden from "@material-ui/core/Hidden";
import withWidth from "@material-ui/core/withWidth";
import Divider from "@material-ui/core/Divider";
// import {withRouter} from "react-router-dom";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SideBar from "./SideBar";
import menuItemsList from "./menuItemsList";
import Logo from "../../logo.svg";

const useStyles = makeStyles((theme) => ({
  root: {},
  menuButton: {
    marginRight: theme.spacing(2),
  },
  toolbar: {
    justifyContent: "space-between",
  },
  logo: {
    maxHeight: 50,
  },
  brand: {
    whiteSpace: "nowrap",
    alignSelf: "center",
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  menuWrapper: {
    justifyContent: "flex-end",
  },
  menuList: {
    listStyle: "none",
    padding: "0",
  },
  menuItem: {
    flex: "auto",
    padding: "0",
    "&:hover": {
      cursor: "default",
    },
  },
  menuLink: {
    textDecoration: "none",
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    width: "100%",
    whiteSpace: "nowrap",
    "&:hover": {
      textDecoration: "none",
      cursor: "pointer",
    },
  },
  subMenu: {
    display: "block",
  },
  menuSubLink: {
    whiteSpace: "nowrap",
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    cursor: "pointer",
    "&:hover": {
      textDecoration: "none",
    },
  },
  tabIcon: {
    verticalAlign: "middle",
  },
}));

const TopBar = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openItems, setOpenItems] = useState([]);

  const handleMenuItemClick = (event, reset = false) => {
    if (reset) {
      setAnchorEl(null);
      setOpenItems([]);
      return;
    }
    setAnchorEl(event.currentTarget);

    const currentItem = event.currentTarget.id;
    if (!currentItem) {
      // eslint-disable-next-line no-console
      console.error("Unique menu item IDs are required!");
      return;
    }

    if (openItems.includes(currentItem)) {
      const newItems = openItems.filter((item) => item !== currentItem);
      setOpenItems([...newItems]);
    } else {
      setOpenItems([...openItems, currentItem]);
    }
  };

  const toggleSidebarDisplay = (state) => {
    setIsSidebarOpen(state || !isSidebarOpen);
  };

  const handleMenuClose = (e) => {
    handleMenuItemClick(e, true);
  };

  function renderMenuItems(children, isSubSubMenu = false) {
    return (
      <Box
        className={classes.menuList}
        component="ul"
        display={isSubSubMenu ? "block" : "flex"}
        m={0}
      >
        {children.map((subOption) => {
          if (!subOption.children) {
            return (
              <Box
                key={subOption.id}
                component={isSubSubMenu ? MenuItem : "li"}
                onClick={(e) => handleMenuItemClick(e, true)}
                className={classes.menuItem}
                color="primary"
                m={0}
              >
                <MaterialLink
                  color="primary"
                  href="/"
                  className={classes.menuLink}
                  component={Link}
                  variant="body1"
                  to={subOption.url}
                >
                  {t(subOption.name)}
                </MaterialLink>
              </Box>
            );
          }
          return (
            <Box
              key={subOption.id}
              component={isSubSubMenu ? MenuItem : "li"}
              className={classes.menuItem}
            >
              <MaterialLink
                id={subOption.id}
                aria-controls={`menu_${subOption.id}`}
                aria-haspopup="true"
                onClick={handleMenuItemClick}
                tabIndex="0"
                color="primary"
                variant="body1"
                className={
                  isSubSubMenu ? classes.menuLink : classes.menuSubLink
                }
              >
                {t(subOption.name)}{" "}
                <KeyboardArrowDownIcon className={classes.tabIcon} />
              </MaterialLink>
              <Menu
                id={`menu_${subOption.id}`}
                anchorEl={anchorEl}
                keepMounted
                open={openItems.includes(subOption.id)}
                onClose={handleMenuClose}
                className={classes.subMenu}
              >
                {renderMenuItems(subOption.children, true)}
              </Menu>
            </Box>
          );
        })}
      </Box>
    );
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" color="transparent">
        <Toolbar className={classes.toolbar}>
          <Box display="flex">
            <img src={Logo} alt="Logo" className={classes.logo} />
            <Typography component="div" className={classes.brand}>
              UI Playground
            </Typography>
            <Divider orientation="vertical" flexItem />
          </Box>
          <Box className={classes.menuWrapper} display="flex">
            <Hidden smDown>{renderMenuItems(menuItemsList.data)}</Hidden>
            <Hidden mdUp>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label={t("Menu")}
                onClick={() => toggleSidebarDisplay()}
              >
                <MenuIcon />
              </IconButton>
            </Hidden>
          </Box>
        </Toolbar>
      </AppBar>
      <SideBar
        isOpen={Boolean(isSidebarOpen)}
        handleDisplayChange={toggleSidebarDisplay}
      />
    </div>
  );
};

export default withWidth()(TopBar);
// export default withRouter(TopBar);
