import React from "react";
import { Footer, Navbar } from "../components";
import { useSelector } from "react-redux";

const Checkout = () => {
  const state = useSelector((state) => state.handleCart);
    let subtotal = 0;
    let shipping = 30.0;
    let totalItems = 0;
    
    state.map((item) => {
      return (
        subtotal += item.price * item.qty,
        totalItems += item.qty 
    )});

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Checkout</h1>
        <hr />
        <div className="container py-5">
          <div className="row my-4">
            {/* Side Bar */}
            <div className="col-md-5 col-lg-4 order-md-last">
              <div className="card mb-4">
                <div className="card-header py-3 bg-light">
                  <h5 className="mb-0">Order Summary</h5>
                </div>
                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                      Products ({totalItems})<span>${Math.round(subtotal)}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                      Shipping <span>${shipping}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                      <div> <strong>Total amount</strong> </div>
                      <span> <strong>${Math.round(subtotal + shipping)}</strong> </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* Form */}
            <div className="col-md-7 col-lg-8">
              <div className="card mb-4">
                <div className="card-header py-3">
                  <h4 className="mb-0">Billing address</h4>
                </div>
                <div className="card-body">
                  <form className="needs-validation" novalidate>
                    <div className="row g-3">
                      <div className="col-sm-6 my-1">
                        <label for="firstName" className="form-label">First name</label>
                        <input type="text"
                          className="form-control" id="firstName"
                          placeholder="" required />
                      </div>

                      <div className="col-sm-6 my-1">
                        <label for="lastName" className="form-label"> Last name  </label>
                        <input type="text"
                          className="form-control" id="lastName"
                          placeholder="" required  />
                      </div>

                      <div className="col-12 my-1">
                        <label for="email" className="form-label"> Email  </label>
                        <input type="email"
                          className="form-control" id="email"
                          placeholder="you@example.com"  required  />
                      </div>

                      <div className="col-12 my-1">
                        <label for="address" className="form-label"> Address </label>
                        <input  type="text"
                          className="form-control" id="address"
                          placeholder="1234 Main St" required />
                      </div>

                      <div className="col-12">
                        <label for="address2" className="form-label"> Address 2 
                          <span className="text-muted"> (Optional) </span>
                        </label>
                        <input type="text"
                          className="form-control" id="address2"
                          placeholder="Apartment or suite"/>
                      </div>

                      <div className="col-md-5 my-1">
                        <label for="country" className="form-label">Country  </label>
                        <br />
                        <select className="form-select" id="country" required>
                          <option value="">Choose...</option>
                          <option>Egypt</option>
                        </select>
                      </div>

                      <div className="col-md-4 my-1">
                        <label for="state" className="form-label"> State</label>
                        <br />
                        <select className="form-select" id="state" required>
                          <option value="">Choose...</option>
                          <option>NH</option>
                        </select>
                      </div>

                      <div className="col-md-3 my-1">
                        <label for="zip" className="form-label">Zip</label>
                        <input type="text"
                          className="form-control" id="zip"
                          placeholder="" required />
                      </div>
                    </div>

                    <hr className="my-4" />

                    <h4 className="mb-3">Payment</h4>

                    <div className="row gy-3">
                      <div className="col-md-6">
                        <label for="cc-name" className="form-label"> Name on card</label>
                        <input type="text"
                          className="form-control" id="cc-name"
                          placeholder="" required />
                        <small className="text-muted"> Full name as displayed on card </small>
                      </div>

                      <div className="col-md-6">
                        <label for="cc-number" className="form-label"> Credit card number </label>
                        <input  type="text" className="form-control" id="cc-number"
                          placeholder="" required />
                      </div>

                      <div className="col-md-3">
                        <label for="cc-expiration" className="form-label">Expiration </label>
                        <input type="text"
                          className="form-control" id="cc-expiration"
                          placeholder=""  required  />
                      </div>

                      <div className="col-md-3">
                        <label for="cc-cvv" className="form-label"> CVV </label>
                        <input type="text"
                          className="form-control"  id="cc-cvv"
                          placeholder="" required />
                      </div>
                    </div>

                    <hr className="my-4" />

                    <button className="w-100 btn btn-primary " type="submit" disabled  >
                      Continue to checkout
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Checkout;