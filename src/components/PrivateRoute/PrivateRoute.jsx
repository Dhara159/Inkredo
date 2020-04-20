import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, currentUser, inverted, ...rest }) => {
  return (

    // Show component page only if user is logges in
    // Show signin page if user is not logged in
    <Route {...rest} render={props => {
      return ((inverted && !currentUser) || (!inverted && currentUser) ?
        <Component {...props} />
        : <Redirect to="/" />)
    }} />
  );
};

export default PrivateRoute;