import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/styles/withStyles";
import Button from "@material-ui/core/Button";

const styles = (theme) => ({
  root: {
    marginRight: `${theme.spacing(1)}px`,
  },
});

function FilterButton(props) {
  const { classes, isPressed, name } = props;
  return (
    <Button
      size="small"
      variant="contained"
      color={isPressed ? "primary" : "default"}
      aria-pressed={isPressed}
      onClick={() => props.setFilter(name)}
      className={classes.root}
    >
      <span className="visually-hidden">Show </span>
      <span>{name}</span>
      <span className="visually-hidden"> tasks</span>
    </Button>
  );
}

FilterButton.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
  isPressed: PropTypes.bool.isRequired,
  setFilter: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};
FilterButton.defaultProps = {
  classes: null,
};

export default withStyles(styles)(FilterButton);
