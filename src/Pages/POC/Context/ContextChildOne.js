import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { ContextPOCContext, ContextPOCContextProvider } from "./context";

const useStyles = makeStyles({
  root: {
    margin: 15,
  },
});

export default function ContextChildOne() {
  const classes = useStyles();
  const { counter, increment } = React.useContext(ContextPOCContext);

  return (
    <ContextPOCContextProvider>
      <Card className={classes.root}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Component 1
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
    </ContextPOCContextProvider>
  );
}
