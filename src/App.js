import React from "react";
import { Router, Route, Switch } from "react-router-dom";

import PrivateRoute from "./components/PrivateRoute";
import Loading from "./components/Loading";
import LoginLayout from './layouts/LoginLayout'
import SubscribeLayout from './layouts/SubscribeLayout'
import DefaultLayout from './layouts/DefaultLayout'
import Footer from "./components/Footer";
import { useAuth0 } from "./react-auth0-spa";
import history from "./utils/history";

// styles
import "./App.css";

// fontawesome
import initFontAwesome from "./utils/initFontAwesome";
initFontAwesome();

const App = () => {
  const { loading } = useAuth0();

  if (loading) {
    return <Loading absolute={true} />;
  }

  return (
    <Router history={history}>
      <div id="app" className="d-flex flex-column h-100">
        <Switch>
          <Route path="/login" exact component={LoginLayout} />
          <PrivateRoute path="/subscribe" exact subscription={false} component={SubscribeLayout} />
          <PrivateRoute path="/account" exact subscription={false} component={DefaultLayout} />
          <PrivateRoute path="/" component={DefaultLayout} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
