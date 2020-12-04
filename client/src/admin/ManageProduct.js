import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom'
import Base from '../core/Base'
import { isAuthenticate } from '../auth/helper';
import { getAllProducts, deleteProduct } from './helper/adminapicalls';

const ManageProduct = () => {

    const [products, setProducts] = useState([]);

    const {user,token} = isAuthenticate()

    const preload = ()=>{
        getAllProducts()
        .then(data=>{
            console.log(data)
            if(data.error){
                console.log(data.error);
            }
            else{
                setProducts(data.products)
            }
        })
    }

    useEffect(() => {
        preload()
    }, [])

    const deleteThisProduct = (productId)=>{
        deleteProduct(productId,user._id,token)
        .then(data=>{
            if(!data){
                console.log('deletion error')
            }
            else{
                preload();
            }
        })
    }

    const goBack = () => (
      <div>
        <Link className="btn-flat grey-text wave-effect" to="/admin/dashboard">
          Admin Home
        </Link>
      </div>
    );

    return (
        <Base title="Welcome admin" description="Manage products here">
            <ul className="collection with-header">
                <li class="collection-header teal-text"><h4>Products:= </h4></li>
                {products!== undefined && products.map((product, index) => {
                    return (
                        <li 
                        className="collection-item teal-text" key={index}>
                        <div>* {product.name}
                        <Link to="/admin/products" className="secondary-content">
                          <button className="btn-small wave-effect" 
                          onClick={() => {
                            deleteThisProduct(product._id);
                          }}>
                          Delete
                          </button>
                        </Link>
                        <Link to={`/admin/product/update/${product._id}`} className="secondary-content">
                          <span className="btn-small wave-effect">Edit</span>
                        </Link>
                        </div>
                        </li>
                    )
                })}
            </ul>
            {goBack()}
        </Base>
    );
};

export default ManageProduct;
