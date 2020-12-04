import React from 'react';
import {Route, Redirect} from 'react-router-dom'
import { isAuthenticate } from '.';

const AdminRouter = ({component: Component, ...rest}) => {
    return (
        <Route
          {...rest}
          render={props =>
            (isAuthenticate() && isAuthenticate().user.role ===1) ? (
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
}

export default AdminRouter;
