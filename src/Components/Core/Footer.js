import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import { useTranslation } from "react-i18next";

function Copyright() {
  const { t } = useTranslation();

  return (
    <Typography variant="body2" color="textSecondary">
      {t("Copyright © ")}
      <Link color="inherit" href="https://material-ui.com/">
        {t("My Brand")}
      </Link>{" "}
      {new Date().getFullYear()}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
    padding: theme.spacing(2),
    marginTop: "auto",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[800],
  },
}));

export default function Footer() {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <footer className={classes.root}>
      <Container maxWidth="sm">
        <Typography variant="body1">
          {t("My sticky footer can be found here.")}
        </Typography>
        <Copyright />
      </Container>
    </footer>
  );
}
