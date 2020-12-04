import React, {useState} from 'react'
import {Link, Redirect} from 'react-router-dom'

import Base from '../core/Base';
import {signin, isAuthenticate, authenticate} from '../auth/helper/index'

const SignIn = ()=> {
  const [state, setstate] = useState({
    email: '',
    password: '',
    error: '',
    loding: false,
    didRedirect: false
  })

  const {email,password,error,didRedirect,loding} = state;

  const {user} = isAuthenticate();

  const handleChange = e => {
    setstate({
      ...state,
      error: false,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = e => {
    e.preventDefault();
    signin({email,password})
    .then(data => {
      if(data.error){
        setstate({
          ...state,error: data.error,sucess:false
        })
      }
      else{
        authenticate(data,()=>{
          setstate({
            ...state,
            email: '',
            password: '',
            loding: false,
            didRedirect: true
          })
        })
      }
    })
    .catch(err => {
      console.log(err)
    })
  }

  const performRedirect = ()=>{
    console.log(user);
    if(didRedirect){
      if(user && user.role === 1){
        return (<Redirect to='/admin/dashboard'/>)
      }else{
        return (<Redirect to='/user/dashboard'/>)
      }
    }
    if(isAuthenticate()){
      return (<Redirect to='/'/>)
    }
  }

  const signInForm = () => {
      return (
        <div className="row">
          <div className="col m6 text-align-left ">
            <form>
              <div className="form-group">
                <label className="text-light" style={{color: 'white'}}>Email:</label>
                <input
                  className="form-control"
                  onChange={handleChange}
                  name="email"
                  type="email"
                  value={email}
                />
              </div>
              <div className="form-group">
                <label className="text-light" style={{color: 'white'}}>Password:</label>
                <input
                  onChange={handleChange}
                  className="form-control"
                  name="password"
                  type="password"
                  value={password}
                  />
              </div>
              <button onClick={onSubmit} className="btn " >
                Submit
              </button>
            </form>
          </div>
        </div>
      );
    };

  const loadingMessage = () => {
    return (
      loding && (
        <div className="alert alert-info">
          <h2>Loading...</h2>
        </div>
      )
    );
  };

  const errorMessage = ()=>{
    return(
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left"
        style={{ color: 'white' }}>
          <div
            className="alert alert-success"
            style={{ display: error ? "block":"none", marginLeft: 50+'%' }}>
              {error}
            </div>
        </div>
      </div>
    )
  }

  return (
    <Base title="Signin" description="Welcome! Signin here">
      {loadingMessage()}
      {errorMessage()}
      {performRedirect()}
      {signInForm()}
      <p className="text-center" style={{color: 'white'}}>{JSON.stringify(state)}</p>
    </Base>
  )
}

export default SignIn;