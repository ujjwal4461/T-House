
import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './styles.css';

import PrivateRouter from './auth/helper/PrivateRouter';
import AdminRouter from './auth/helper/AdminRouter';

import Home from './core/Home';
import Signup from './user/Signup'
import Signin from './user/Signin'
import UserDashboard from './user/UserDashboard'
import AdminDashboard from './admin/AdminDashboard';
import CreateCategory from './admin/CreateCategory';
import ManageCategory from './admin/ManageCategory';
import CreateProduct from './admin/CreateProduct';
import ManageProduct from './admin/ManageProduct';
import UpdateProduct from './admin/UpdateProduct';
import Cart from './core/Cart';

const Routers = function Routers() {
    return (
        <React.Fragment>
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route exact path='/signup' component={Signup}/>
                    <Route exact path='/signin' component={Signin}/>
                    <Route exact path='/cart' component={Cart}/>
                    <PrivateRouter exact path='/user/dashboard' component={UserDashboard}/>
                    <AdminRouter exact path='/admin/dashboard' component={AdminDashboard}/>
                    <AdminRouter exact path='/admin/create/category' component={CreateCategory}/>
                    <AdminRouter exact path='/admin/categories' component={ManageCategory}/>
                    <AdminRouter exact path='/admin/create/product' component={CreateProduct}/>
                    <AdminRouter exact path='/admin/products' component={ManageProduct}/>
                    <AdminRouter exact path='/admin/product/update/:productId' component={UpdateProduct}/>
                </Switch>
            </BrowserRouter>
        </React.Fragment>
    )
}

export default Routers;
