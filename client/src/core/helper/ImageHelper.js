import React from 'react';
import {API} from '../../backend'

const ImageHelper = ({product}) => {
    const imageurl = product
    ? `${API}/product/photo/${product._id}`
    : `https://i0.wp.com/www.swagshirts99.com/wp-content/uploads/2020/05/a2b81dc0-c3bd-4737-bf4d-d590619007e9.jpg?fit=886%2C1280&ssl=1`;
    return (
      <div >
        <img
          src={imageurl}
        alt="Tshirt photo"
        />
      </div>
    );
}

export default ImageHelper;
