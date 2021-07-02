import React from "react";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import { withStyles } from "@material-ui/core/styles";

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
            {copy || "Waiting for input"}
          </Typography>
        </div>
      ) : (
        <Backdrop className={classes.backdrop} open>
          <CircularProgress color="inherit" />
          <Typography variant="h6" className={classes.copy}>
            {copy || "Waiting for input"}
          </Typography>
        </Backdrop>
      )}
    </div>
  );
}

export default withStyles(styles)(Loading);
