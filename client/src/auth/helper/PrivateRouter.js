import React, { Component } from 'react';
import {Redirect,Route} from 'react-router-dom'
import { isAuthenticate } from './index'

const PrivateRouter = ({ component: Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticate() ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/signin",
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );
};


export default PrivateRouter;

