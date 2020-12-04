import React from "react";
import Base from "../core/Base";
import { isAuthenticate } from "../auth/helper/index";
import { Link } from "react-router-dom";

const AdminDashBoard = () => {
  const {
    user: { name, email }
  } = isAuthenticate();

  const adminPanel = () => {
    return (
      <React.Fragment>
      <ul class="collection with-header">
        <li class="collection-header teal-text"><h4>Admin Information</h4></li>
        <li class="collection-item teal-text "><b>Name: </b> {name}</li>
        <li class="collection-item teal-text"><b>Email: </b> {email}</li>
      </ul>
      <ul class="collection with-header">
        <li class="collection-header" >
          <h4 className="teal-text">Admin Navigation</h4>
        </li>
        <li className="collection-item">
            <Link to="/admin/create/category" className="teal-text">
              Create Categories
            </Link>
          </li>
          <li className="collection-item">
            <Link to="/admin/categories" className="teal-text">
              Manage Categories
            </Link>
          </li>
          <li className="collection-item">
            <Link to="/admin/create/product" className="teal-text">
              Create Product
            </Link>
          </li>
          <li className="collection-item">
            <Link to="/admin/products" className="teal-text">
              Manage Products
            </Link>
          </li>
          <li className="collection-item">
            <Link to="/admin/orders" className="teal-text">
              Manage Orders
            </Link>
          </li>
      </ul>
      </React.Fragment>
    );
  };

  
  
  return (
    <Base
      title="Welcome to Admin Area"
      description="This is the Admin control Panel"
      className="container bg-success p-4"
    >
     {adminPanel()}
    </Base>
  );
};

export default AdminDashBoard;
