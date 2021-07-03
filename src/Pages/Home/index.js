import React from "react";
import PropTypes from "prop-types";
import {
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import PageLayout from "../../Components/Core/PageLayout";
import cardsList from "./cardsList";

const styles = (theme) => ({
  root: {},
  card: {
    width: "100%",
  },
  actionButtom: {
    textTransform: "uppercase",
    margin: theme.spacing(1),
    minWidth: 130,
  },
  alignRight: {
    display: "flex",
    justifyContent: "flex-end",
  },
});

const Home = (props) => {
  const { classes } = props;
  return (
    <PageLayout pageTitle="Home">
      <Grid container spacing={2}>
        {cardsList &&
          cardsList.map((card) => {
            return (
              <Grid item xs={12} sm={6} md={4} key={card.id}>
                <Card className={classes.card}>
                  <CardContent>
                    <Typography
                      variant="h6"
                      component="h2"
                      color="primary"
                      gutterBottom
                    >
                      {card.title}
                    </Typography>
                    <Typography>{card.description}</Typography>
                  </CardContent>
                  <CardActions className={classes.alignRight}>
                    <Button
                      component={Link}
                      to={card.link}
                      color="primary"
                      variant="contained"
                      className={classes.actionButtom}
                    >
                      {card.linkText}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
      </Grid>
    </PageLayout>
  );
};
Home.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
};
Home.defaultProps = {
  classes: null,
};

export default withStyles(styles)(Home);
