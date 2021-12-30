import React from "react";
import Typography from "@mui/material/Typography";
import makeStyles from "@mui/styles/makeStyles";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { useTranslation } from "react-i18next";

function Copyright() {
  const { t } = useTranslation();

  return (
    <Typography variant="body2" color="textSecondary">
      {t("Copyright © ")}
      <Link color="inherit" href="https://material-ui.com/">
        {t("Example")}
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
      theme.palette.mode === "light"
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
        <Typography variant="body1">{t("Sticky footer.")}</Typography>
        <Copyright />
      </Container>
    </footer>
  );
}
