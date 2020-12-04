import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import Base from '../core/Base';
import { isAuthenticate } from '../auth/helper';
import { createCategory } from './helper/adminapicalls';

const CreateCategory = () => {

    const [values,setValues] = useState({
        name: '',
        error: '',
        success: false
    })

    const {name,error,success} = values;

    const {user,token} = isAuthenticate();

    const handleChange = e => {
        setValues({
            ...values,name: e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault();
        createCategory({name},user._id,token)
        .then(data=>{
          if(data.error){
            setValues({...values,error:data.error,success: false})
          }
          else{
            setValues({
              ...values,
              name: '',
              error: '',
              success: true
            })
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
  
    const successMessage = () => {
      if (success) {
        return <h4 className="green-text">Category created successfully</h4>;
      }
    };
  
    const errorMessage = () => {
      if (error) {
        return <h4 className="red-text">Failed to create category</h4>;
      }
    };

    const categoryForm = () => (
        <form>
          <div className="input-field">
            <p className="lead">Enter the category</p>
            <input
              type="text"
              className="validate"
              onChange={handleChange}
              value={name}
              autoFocus
              required
              placeholder="For Ex. Summer"
            />
            <button onClick={onSubmit} className="btn wave-effect wave-light">
              Create Category
            </button>
          </div>
        </form>
      );

    return (
        <Base title="Create category">
            {successMessage()}
            {errorMessage()}
            {categoryForm()}
            {goBack()}
            <p style={{color: 'white'}}>{JSON.stringify(values)}</p>
        </Base>
    );
}

export default CreateCategory;
