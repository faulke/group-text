import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from 'react-redux'
import { Route, useHistory } from "react-router-dom";
import { useAuth0 } from "../react-auth0-spa";
import { getAccount } from '../actions'
import { account as accountActions }  from '../selectors'

const PrivateRoute = ({ component: Component, subscription = true, path, ...rest }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { user, isAuthenticated, loginWithRedirect } = useAuth0();
  const { account, loading } = useSelector(accountActions)

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
        if (account === null) {
          dispatch(getAccount())
        } else if (!account.sub || account.sub.status_id !== 1) {
          history.push('/subscribe')
        }
      }
    }
    fn()
  }, [account, subscription])

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
