import React from "react";
import { Link, withRouter, Redirect } from "react-router-dom";
import {signout, isAuthenticate} from '../auth/helper/index'
import { loadCartLength } from "./helper/cartHelper";

const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { backgroundColor: "#BFD8D2",color: 'white' };
  } else {
    return { BackgroundColor: "white", color: 'black' };
  }
};

const cartLen = loadCartLength()

const Navbar = ({ history}) => (

  <div>
    <nav>
    <div className="nav-wrapper white" >
      <a href="/" className="brand-logo black-text text-darken-4">T-House</a>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
      <li className="nav-item">
        <Link style={currentTab(history, "/")} className="nav-link " to="/">
          Home
        </Link>
      </li>
      {isAuthenticate() && (
        <li className="nav-item">
        <Link
          style={currentTab(history, "/cart")}
          className="nav-link"
          to="/cart">
          Cart
          <span className="badge new">{cartLen}</span>
        </Link>
        </li>
      )}
      {isAuthenticate() && isAuthenticate().user.role === 0 && (
        <li className="nav-item">
        <Link
          style={currentTab(history, "/user/dashboard")}
          className="nav-link"
          to="/user/dashboard">
          Dashboard
        </Link>
        </li>)
      }
      {isAuthenticate() && isAuthenticate().user.role === 1 && (
        <li className="nav-item">
        <Link
          style={currentTab(history, "/admin/dashboard")}
          className="nav-link"
          to="/admin/dashboard">
          Dashboard
        </Link>
        </li>
      )
      }
      {!isAuthenticate() && (
        <React.Fragment>
          <li className="nav-item">
            <Link
              style={currentTab(history, "/signup")}
              className="nav-link"
              to="/signup">
              Signup
            </Link>
          </li>
          <li className="nav-item">
            <Link
              style={currentTab(history, "/signin")}
              className="nav-link"
              to="/signin">
              Sign In
            </Link>
          </li>
        </React.Fragment>)}
      {isAuthenticate() && (<li className="nav-item">
      <Link
          style={currentTab(history, "/signin")}
          onClick={()=>{
            signout();
            localStorage.removeItem('cart')
          }}
          className="nav-link"
          to="/">
          Signout
        </Link>
      </li>)}
      </ul>
    </div>
  </nav>
  </div>
);

export default withRouter(Navbar);
