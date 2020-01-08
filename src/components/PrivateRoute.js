import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";
import { useAuth0 } from "../react-auth0-spa";
import { useAccount } from '../hooks/account'

const PrivateRoute = ({ component: Component, subscription = true, path, ...rest }) => {
  const { user, isAuthenticated, loginWithRedirect } = useAuth0()
  const { account, loading } = useAccount()

  // check auth status
  useEffect(() => {
    const fn = async () => {
      if (!isAuthenticated) {
        await loginWithRedirect({
          appState: { targetUrl: path }
        });
      }
    };
    fn();
  }, [isAuthenticated, loginWithRedirect, path]);

  const render = props =>
    isAuthenticated === true ? <Component account={account} loading={loading} user={user} {...props} /> : null;

  return (
    <Route path={path} render={render} {...rest} />
  )
};

PrivateRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
  path: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]).isRequired,
  subscription: PropTypes.bool
};

export default PrivateRoute;
