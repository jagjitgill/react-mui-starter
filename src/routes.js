import React from "react";
import { Route, Router, Switch } from "react-router-dom";
// eslint-disable-next-line import/no-extraneous-dependencies
import { createBrowserHistory } from "history";
import ScrollToTop from "./Components/Core/ScrollToTop";
import Home from "./Pages/Home";
import Error404 from "./Pages/Error/404";
import BaseLayout from "./Components/Core/BaseLayout";
import SignIn from "./Pages/SignIn";
// const Error404 = React.lazy(() => import('./Pages/Error/404'))

const historyObj = createBrowserHistory();

const Routes = () => (
  <Router history={historyObj}>
    <ScrollToTop>
      <BaseLayout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/sign-in" component={SignIn} />
          <Route component={Error404} />
        </Switch>
      </BaseLayout>
    </ScrollToTop>
  </Router>
);

export default Routes;
