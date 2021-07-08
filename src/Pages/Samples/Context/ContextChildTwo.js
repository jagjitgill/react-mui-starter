import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { SampleContext, SampleContextProvider } from "./context";

const useStyles = makeStyles({
  root: {
    margin: 15,
  },
});

export default function ContextChildTwo() {
  const classes = useStyles();
  const { counter, increment } = React.useContext(SampleContext);

  return (
    <SampleContextProvider>
      <Card className={classes.root}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Component 2
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Counter: {counter}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" onClick={() => increment()}>
            Increment
          </Button>
        </CardActions>
      </Card>
    </SampleContextProvider>
  );
}
