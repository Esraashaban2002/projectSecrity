import React from 'react'
import mainImage from '../assets/main.jpg'

function Main() {
  return (
    <div>
         <div className="hero border-1 pb-3">
        <div className="card bg-dark text-white border-0 mx-3">
          <img
            className="card-img img-fluid"
            src={mainImage}
            alt="Card"
            height={500}
          />
          <div className="card-img-overlay d-flex align-items-center">
            <div className="container">
              <h2 className="card-title fs-1 text fw-lighter">Welcome to our store</h2>
              <p className="card-text fs-5 d-none d-sm-block ">
                Welcome to our store! Discover a wide range of high-quality products at competitve price,
                all in one place. Enjoy a seamless shopping experience with fast delivert and exclusive deals.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Main
