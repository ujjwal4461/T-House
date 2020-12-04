import React, { useEffect, useState } from 'react';
import Base from '../core/Base';
import {getOrder} from '../core/helper/orderHelper'
import { isAuthenticate } from "../auth/helper/index";



const UserDashboard = () => {

    const userId = isAuthenticate() && isAuthenticate().user._id;
    const token = isAuthenticate() && isAuthenticate().token;

    const [order,setOrder] = useState([])

    useEffect(()=>{
        setOrder(getOrder(userId,token))
    },[])

    const {
        user: { name, email }
      } = isAuthenticate();

    return (
        <Base title="Welcome to dashboard" description="Check all your purchases here">
            <ul class="collection with-header">
                <li class="collection-header teal-text"><h4>User Information</h4></li>
                <li class="collection-item teal-text "><b>Name: </b> {name}</li>
                <li class="collection-item teal-text"><b>Email: </b> {email}</li>
            </ul>
            <div>{JSON.stringify(order)}</div>
        </Base>
    );
}

export default UserDashboard;
