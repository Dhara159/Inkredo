import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, currentuser, inverted, ...rest }) => {
  return (

    // Show component page only if user is logges in
    // Show signin page if user is not logged in
    <Route {...rest} render={props => (
      (inverted && !currentuser) || (!inverted && currentuser) ?
        <Component {...props} />
        : <Redirect to="/" />
    )} />
  );
};

export default PrivateRoute;