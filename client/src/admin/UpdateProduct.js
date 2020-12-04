import React, {useState,useEffect} from 'react';
import {Link, Redirect} from 'react-router-dom'
import Base from '../core/Base';
import { isAuthenticate } from '../auth/helper';
import { getProduct, updateProduct } from './helper/adminapicalls';


const UpdateProduct = ({match}) => {

    const {user,token} = isAuthenticate()

    const [product, setProduct] = useState({
      name: '',
      stock: '',
      price: '',
      description: '',
      photo: '',
      categories: [],
      category: '',
      error: '',
      loding: '',
      updatedProduct: '',
      getRedirect: '',
      formData: ''
    })

    const {
      name,
      photo,
      description,
      price,
      stock,
      categories,
      category,
      loading,
      error,
      updatedProduct,
      getaRedirect,
      formData
    } = product;


    const preload = ()=>{
      getProduct(match.params.productId)
      .then(data=>{
        console.log(data)
        if(data.error){
          setProduct({...product,error:data.error})
        }
        else{
          setProduct({...product,
            name:data.name,
            description: data.description,
            price: data.price,
            stock: data.stock,
            formData: new FormData()})
        }
      })
    }

    useEffect(() => {
      preload();
    }, [])

    const goBack = () => (
      <div>
        <Link className="btn-flat grey-text wave-effect" to="/admin/dashboard">
          Admin Home
        </Link>
      </div>
    );


    const handleChange = name => event => {
      const value = name === "photo" ? event.target.files[0] : event.target.value;
      formData.set(name, value);
      setProduct({ ...product, [name]: value });
    };

    const onSubmit = e => {
        e.preventDefault();
        if(!name ){
          return setProduct({...product,error:'Fill in all the fields'})
        }
        else{
          setProduct({...product,loding:true,error:false})  
        }
        setProduct({...product,loding:true,error:false})
        updateProduct(match.params.productId,user._id,token,formData)
        .then(data=>{
          if(data.error){
            setProduct({...product,error:data.error,createdProduct: '',getRedirect: ''})
          }
          else{
            setProduct({
              ...product,
              name: '',
              price: '',
              description: '',
              stock: '',
              photo: '',
              formData: '',
              getaRedirect: true,
              error: '',
              loding: false,
              updatedProduct: data.product.name
            })
            console.log(data)
          }
        })
    }

    const successMessage = () => (
      <div
        className="alert alert-success mt-3"
        style={{ display: updatedProduct ? "" : "none", marginLeft: 20+'%',marginRight: 20+'%'}}
      >
        <h4>Product updated successfully</h4>
      </div>
    );

    const errorMessage = () => (
      <div
        className="alert alert-warning mt-3"
        style={{ display: error ? "" : "none", marginLeft: 20+'%',marginRight: 20+'%' }}
      >
        <h4> {error}</h4>
      </div>
    );
    
    const updateProductForm = () => (
      <form>
        <div className="input-field">
            <input
              className="btn-large"
              onChange={handleChange("photo")}
              type="file"
              name="photo"
              accept="image"
              placeholder="choose a file"
            />
        </div>
        <div className="input-field">
          <input
            onChange={handleChange("name")}
            name="photo"
            className="white validate"
            placeholder="Name"
            value={name}
          />
        </div>
        <div className="input-field">
          <textarea
            onChange={handleChange("description")}
            name="photo"
            className="white validate"
            placeholder="Description"
            value={description}
          />
        </div>
        <div >
          <label>Select Category</label>
          <select className="browser-default"
            onChange={handleChange("category")}
            placeholder="Category">
            <option>Select</option>
            {categories && categories.map((cate,index)=>
              (<option key={index} value={cate._id}>{cate.name}</option>)
            )}
          </select>
        </div>
        <div className="input-field">
          <input
            onChange={handleChange("price")}
            type="number"
            className="white validate"
            placeholder="Price"
            value={price}
          />
        </div>
        <div className="input-field">
          <input
            onChange={handleChange("stock")}
            type="number"
            className="white validate"
            placeholder="Stock"
            value={stock}
          />
        </div>
  
        <button
          type="submit"
          onClick={onSubmit}
          className="btn">
          Create Product
        </button>
      </form>
    );
    
    return (
        <Base title='Create Product' description='Add New products here'>
            {successMessage()}
            {errorMessage()}
            {updateProductForm()}
            {goBack()}
        </Base>
    );
}

export default UpdateProduct;
