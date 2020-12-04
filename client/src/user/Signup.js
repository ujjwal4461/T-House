import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import Base from '../core/Base'
import { signup } from '../auth/helper';

const SignUp = ()=>{

    const [values,setValues] = useState({
        name: "",
        email: "",
        password: "",
        error: "",
        sucess: false
    });

    const { name, email, password, error, success } = values;

    const handleChange = e => {
        setValues({...values,error:false,[e.target.name]: e.target.value})
    }

    const onSubmit = e => {
        e.preventDefault();
        signup({name,email,password})
          .then((data)=>{
            if(data.error){
              setValues({...values,error: data.error, sucess:false})
            }
            else{
              setValues({
                ...values,
                sucess: true,
                name: '',
                email: '',
                password: '',
                error: ''
              })
            }
          })
          .catch(err => {
            console.log(err)
          })
    }

    const sucessMessage = ()=>{
      return (
        <div className="row">
          <div className="col-md-6 offset-sm-3 text-left"
          style={{ color: 'white', magrin: 25+'%' }}>
          <div
            style={{ display: success ? "block" : "none" }}>
            New account was created successfully. Please
            <Link to="/signin">Login Here</Link>
          </div>
        </div>
        </div>
      )
    }

    const errorMessage = ()=>{
      return(
        <div className="row">
          <div className="col-md-6 offset-sm-3 text-left"
          style={{ color: 'white' }}>
            <div
              className="alert alert-sucess"
              style={{ display: error ? "block":"none", marginLeft: 50+'%' }}>
                {error}
              </div>
          </div>
        </div>
      )
    }


    const signUpForm = () => {
        return (
          <div className="row">
            <div className="col-md-6 offset-sm-3 text-left " >
              <form>
                <div className="form-group">
                  <label className="white-text">Name:</label>
                  <input
                    className="form-control"
                    name="name"
                    onChange={handleChange}
                    type="text"
                    value={name}
                  />
                </div>
                <div className="form-group">
                  <label className="white-text">Email:</label>
                  <input
                    className="form-control"
                    onChange={handleChange}
                    name="email"
                    type="email"
                    value={email}
                  />
                </div>
                <div className="form-group">
                  <label className="white-text">Password:</label>
                  <input
                    onChange={handleChange}
                    className="form-control"
                    name="password"
                    type="password"
                    value={password}
                  />
                </div>
                <button onClick={onSubmit} className="btn btn-success btn-block" >
                  Submit
                </button>
              </form>
            </div>
          </div>
        );
      };

    return(
        <Base title="Signup With Us" description="Signup to buy the coolest TEE in universe">
        {sucessMessage()}
        {errorMessage()}
        {signUpForm()}
        <p className="text-center" style={{color: 'white'}}>{JSON.stringify(values)}</p>
        </Base>
    )    
}

export default SignUp;