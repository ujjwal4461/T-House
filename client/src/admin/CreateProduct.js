import React, {useState,useEffect} from 'react';
import {Link, Redirect} from 'react-router-dom'
import Base from '../core/Base';
import { isAuthenticate } from '../auth/helper';
import { getAllCategories, createProduct } from './helper/adminapicalls';

const CreateProduct = () => {

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
      createdProduct: '',
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
      createdProduct,
      getaRedirect,
      formData
    } = product;


    const preload = ()=>{
      getAllCategories()
      .then(data=>{
        console.log(data)
        if(data.error){
          setProduct({...product,error:data.error})
        }
        else{
          setProduct({...product,categories:data.categories,formData: new FormData()})
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
      formData.append(name, value);
      setProduct({ ...product, [name]: value });
    };

    const didRedirect = ()=>{
      if(getaRedirect){
        setTimeout(() => (
          <Redirect to='/admin/dashboaard'/>
        ), 3000);
      }
    }

    const onSubmit = e => {
        e.preventDefault();
        if(!name ){
          return setProduct({...product,error:'Fill in all the fields'})
        }
        else{
          setProduct({...product,loding:true,error:false})  
        }
        setProduct({...product,loding:true,error:false})
        createProduct(user._id,token,formData)
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
              createdProduct: data.name
            })
            preload();
          }
        })
    }
    
    const successMessage = () => (
      <div
        className="green-text"
        style={{ display: createdProduct ? "" : "none"}}>
        <h4>Product created successfully</h4>
      </div>
    );

    const errorMessage = () => (
      <div
        className="red-text"
        style={{ display: error ? "" : "none"}}>
        <h4> {error}</h4>
      </div>
    );
    
    const createProductForm = () => (
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
            {createProductForm()}
            {goBack()}
        </Base>
    );
}

export default CreateProduct;

