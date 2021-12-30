import React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import withStyles from "@mui/styles/withStyles";

const styles = (theme) => ({
  loadingMessage: {
    textAlign: "center",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  copy: {
    padding: theme.spacing(1),
  },
});

function Loading(props) {
  const { classes, loading, copy, inline } = props;
  return (
    <div
      style={loading ? { display: "block" } : { display: "none" }}
      className={classes.loadingMessage}
    >
      {inline ? (
        <div className={classes.loadingMessage}>
          <CircularProgress color="inherit" />
          <Typography variant="h6" className={classes.copy}>
            {copy || "Loading..."}
          </Typography>
        </div>
      ) : (
        <Backdrop className={classes.backdrop} open>
          <CircularProgress color="inherit" />
          <Typography variant="h6" className={classes.copy}>
            {copy || "Loading..."}
          </Typography>
        </Backdrop>
      )}
    </div>
  );
}

Loading.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
  loading: PropTypes.bool.isRequired,
  inline: PropTypes.bool,
  copy: PropTypes.string,
};
Loading.defaultProps = {
  classes: null,
  inline: false,
  copy: null,
};

export default withStyles(styles)(Loading);
