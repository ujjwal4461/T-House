import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API } from '../backend';
import {useState,useEffect} from 'react';
import ImageHelper from './helper/ImageHelper';
import { Link, Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { addItemToCart } from './helper/cartHelper';


const Card = ({product,addToCart=true,removeFromCart=false,setReload = f => f,reload = undefined}) => {

      const [redirect, setRedirect] = useState(false);
      const [count, setCount] = useState(product.count);

      const notify = () => toast("Item Already in Cart");

      const showAddToCart = ()=>{
        return (
          addToCart && <button onClick={addToCartMethod} className="btn-flat" style={{backgroundColor: "#BFD8D2", width:100 + '%'}} ><Link href="#" className="black-text">Add to cart</Link></button>
        )
      }

      const showRemoveFromCart = () => {
        return (
          removeFromCart && <p className="btn-flat" style={{backgroundColor: "#E83350", width:100 + '%'}} ><Link href="#" className="black-text">Remove from cart</Link></p>
        )
      }

      const addToCartMethod = () => {
        let duplicate = addItemToCart(product, () => setRedirect(true));
        if(duplicate === 1){
          {notify()}
        }
      };

      const getARedirect = redirect => {
        if (redirect) {
          return <Redirect to="/cart" />;
        }
      };

        return (
          <div className="card">
            <div className="card-image waves-effect waves-block waves-light">
              <ImageHelper className="activator" product={product}/>
            </div>
            {getARedirect(redirect)}
            <div className="card-content">
              <span className="card-title activator grey-text text-darken-4"><i>{product.name}</i><i className="material-icons right">more_vert</i></span>
              {showAddToCart()}
              {showRemoveFromCart()}
            </div>
            <div className="card-reveal">
              <span className="card-title green-text text-darken-4"><b>{product.name}</b><i className="material-icons right">close</i></span>
              <p>{product.description}<br/><b className="teal-text">Price: </b>{product.price}rs</p>
            </div>
          </div>
        );
}

export default Card;
