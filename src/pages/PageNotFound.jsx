import React from "react";
import {NavLink } from "react-router-dom";
import { Footer, Navbar } from "../components";
import { FaArrowLeft } from "react-icons/fa6";

const PageNotFound = () => {
  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <div className="container">
            <div className="row">
                <div className="col-md-12 py-5 bg-light text-center">
                    <h4 className="p-3 display-5">404: Page Not Found</h4>
                    <NavLink to="/" className="btn  btn-outline-dark mx-4">
                        <FaArrowLeft /> Go Back to Home
                    </NavLink>
                </div>
            </div>
        </div>
       </div>
        <Footer />
     
    </>
  );
};

export default PageNotFound;