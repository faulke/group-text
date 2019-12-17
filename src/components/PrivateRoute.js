import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from 'react-redux'
import { Route, useHistory } from "react-router-dom";
import { useAuth0 } from "../react-auth0-spa";
import { checkSubscriptionStatus } from '../actions'
import { account } from '../selectors'

const PrivateRoute = ({ component: Component, subscription = true, path, ...rest }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { isAuthenticated, loginWithRedirect} = useAuth0();
  const { active, loading } = useSelector(account)

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

  useEffect(() => {
    const fn = () => {
      if (subscription) {
        if (active === null) {
          dispatch(checkSubscriptionStatus())
        } else if (active === false) {
          history.push('/subscribe')
        }
      }
    }
    fn()
  }, [active, subscription])

  const render = props =>
    isAuthenticated === true ? <Component active={active} loading={loading} {...props} /> : null;

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
