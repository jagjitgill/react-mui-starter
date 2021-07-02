import React from "react";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import withStyles from "@material-ui/core/styles/withStyles";
import { Grid, Typography } from "@material-ui/core";

const styles = () => ({
  root: {},
});

function PageLayout({ children, pageTitle, classes, bgcolor }) {
  // TODO: Multiple layout types

  let headerTitle = "";
  if (typeof pageTitle === "string" || pageTitle instanceof String) {
    headerTitle = pageTitle;
  }
  return (
    <Container className={classes.root}>
      <Box my={4} bgcolor={bgcolor}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h6" color="inherit" noWrap>
              {headerTitle}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            {children}
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
PageLayout.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
  pageTitle: PropTypes.string,
  bgcolor: PropTypes.string,
};
PageLayout.defaultProps = {
  classes: null,
  pageTitle: null,
  bgcolor: null,
};
export default withStyles(styles)(PageLayout);
