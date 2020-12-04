import React, { useState,useEffect } from 'react';
import Base from './Base';
import Card from './Card';
import '../styles.css';
import { getProducts } from './helper/coreapihelper';

const Home = () => {

    const [products, setProducts] = useState([])
    const [error, setError] = useState(false)

    const loadProducts = ()=>{
        getProducts()
        .then(data=>{
            console.log(data)
            if(data.error){
                setError(data.error)
            }
            else{
                setProducts(data.products)
            }
        })
    }

    useEffect(() => {
        loadProducts();
    }, [])

    return (
        <div>
            <Base title="Welcome to T-House" description="Get Tees for everyone everywhere">
                <div className="row">
                {products && products.map((product,index)=>{
                    return (
                        <div className="col l4  m6 s12" key={index}>
                            <Card product={product}></Card>
                        </div>
                    )
                })}
                    
                </div>
            </Base>
        </div>
    )
}


export default Home;