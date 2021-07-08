/* eslint-disable no-console */
import React, { Component } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/styles/withStyles";
import {
  Box,
  Grid,
  Paper,
  Button,
  Link,
  Typography,
  List,
  ListItem,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { OktaAuth } from "@okta/okta-auth-js";
import SignIn from "../../../Components/SignInForm";
import Loading from "../../../Components/Core/Loading";
import config from "./config";
import UserInfo from "./UserInfo";
import PageLayout from "../../../Components/Core/PageLayout";

const styles = () => ({
  pre: {
    overflow: "scroll",
    maxHeight: "200px",
  },
  oktaInfo: {
    textAlign: "center",
  },
});
const authClient = new OktaAuth(config.oidc);

class OktaOIDC extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authenticated: false,
      userInfo: null,
      loading: false,
    };
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
  }

  componentDidMount() {
    this.setState({ loading: true });
    // authClient.start();
    if (authClient.isLoginRedirect()) {
      console.log("isLoginRedirect, calling fetchInfoFromURL");
      // Parse token from redirect url
      this.fetchInfoFromURL();
    } else {
      console.log("Attempt to retrieve ID Token from Token Manager");
      // Attempt to retrieve ID Token from Token Manager
      this.retrieveLocalInfo();
    }
  }

  componentWillUnmount() {
    // authClient.stop();
  }

  handleLoginSubmit(username, password) {
    console.log("Starting login");
    this.setState({ loading: true });
    authClient
      .signInWithCredentials({ username, password })
      .then((transaction) => {
        if (transaction.status === "SUCCESS") {
          console.log("Got code, getting token!");
          authClient.token.getWithRedirect({
            sessionToken: transaction.sessionToken,
            responseType: "id_token",
          });
        }
      });
  }

  retrieveLocalInfo() {
    const { authenticated } = this.state;

    authClient.tokenManager
      .get("idToken")
      .then((idToken) => {
        if (idToken) {
          console.log("Token found!, idToken", idToken);
          this.setState({ authenticated: true, userInfo: idToken });
          console.log("Logged in");
        } else {
          console.log("No token found");
          if (authenticated) {
            console.log("setting Logged in = false");
            this.setState({ authenticated: false });
          }
        }
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  }

  fetchInfoFromURL() {
    const { authenticated } = this.state;

    authClient.token
      .parseFromUrl()
      .then((data) => {
        console.log(data);
        const { idToken } = data.tokens;
        console.log(`Hi ${idToken.claims.email}!`);
        // Store parsed token in Token Manager
        authClient.tokenManager.add("idToken", idToken);
        console.log(idToken);
        if (!authenticated) {
          this.setState({ authenticated: true, userInfo: idToken });
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  }

  render() {
    const { classes } = this.props;
    const { loading, authenticated, userInfo } = this.state;
    console.log("Render: OktaOIDC");

    return (
      <PageLayout pageTitle="Sample: Okta OIDC">
        <Loading loading={loading} copy="Loading..." />
        <Grid spacing={10} alignItems="center" justify="center" container>
          <Grid item xs={12}>
            <Typography variant="h6">Docs</Typography>
            <List dense>
              <ListItem>
                <Link href="https://developer.okta.com/docs/concepts/oauth-openid/">
                  - Okta: OAuth 2.0 and OpenID Connect Overview
                </Link>
              </ListItem>
              <ListItem>
                <Link href="https://developer.okta.com/docs/guides/implement-auth-code-pkce/overview/">
                  - Okta: Implement Authorization Code flow with PKCE
                </Link>
              </ListItem>
              <ListItem>
                <Link href="https://developer.okta.com/code/react/">
                  - React: Add User Authentication to Your React App
                </Link>
              </ListItem>
              <ListItem>
                <Link href="https://www.npmjs.com/package/@okta/okta-auth-js">
                  - NPM JS: @okta/okta-auth-js
                </Link>
              </ListItem>
              <ListItem>
                <Link href="https://github.com/jagjitgill/react-mui-starter/blob/master/src/Pages/Samples/Okta/OktaOIDC.js">
                  - Sample source code
                </Link>
              </ListItem>
            </List>
            <Grid container>
              <Grid item xs={12}>
                {!authenticated ? (
                  <Box>
                    <SignIn onFormSubmit={this.handleLoginSubmit} />
                    <Box className={classes.oktaInfo}>
                      <Typography>= Okta info =</Typography>
                      <Typography>{config.oidc.issuer}</Typography>
                      <Typography>{config.oidc.clientId}</Typography>
                    </Box>
                  </Box>
                ) : (
                  <Box mt={3}>
                    <Alert
                      severity="success"
                      action={
                        <Button
                          type="submit"
                          color="primary"
                          onClick={() => authClient.signOut()}
                        >
                          Logout
                        </Button>
                      }
                    >
                      Logged in as {userInfo?.claims?.email}
                    </Alert>
                    <Typography>Token</Typography>
                    <Paper>
                      <pre className={classes.pre}>
                        {JSON.stringify(userInfo, undefined, 2)}
                      </pre>
                    </Paper>
                    <UserInfo userId={userInfo.clientId} />
                  </Box>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </PageLayout>
    );
  }
}
OktaOIDC.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
};
OktaOIDC.defaultProps = {
  classes: null,
};

export default withStyles(styles)(OktaOIDC);
