import React from "react";
import PropTypes from "prop-types";
import withStyles from "@mui/styles/withStyles";
import TopBar from "../MenuBar/TopBar";
import Footer from "./Footer";

const styles = () => ({
  root: {
    display: "flex",
    minHeight: "100vh",
    flexDirection: "column",
  },
});

function BaseLayout({ children, classes }) {
  return (
    <main className={classes.root}>
      <TopBar />
      {children}
      <Footer />
    </main>
  );
}
BaseLayout.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
};
BaseLayout.defaultProps = {
  classes: null,
};

export default withStyles(styles)(BaseLayout);
