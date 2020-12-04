import React from 'react';

import Navbar from './Navbar';

const Base = ({
    title = "My Title",
    description = "My desription",
    children
  })=>{
    return(
        <div>
        <Navbar/>
    <div className="container">
      <section>
        <h2>{title}</h2>
        <p>{description}</p>
      </section>
      <div >{children}</div>
    </div>
    <footer className="page-footer white ">
          <div className="container black-text">
            <div className="row">
              <div className="col l6 s12">
                <h5>The T-shirt store</h5>
                <p className="black-text ">An amazing T-Store</p>
              </div>
            </div>
          </div>
          <div className="footer-copyright">
            <div className="container black-text">
            © 2020 Copyright Text
            </div>
          </div>
        </footer>
  </div>
    )
}

export default Base;