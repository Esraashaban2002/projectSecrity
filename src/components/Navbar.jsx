import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaCartShopping, FaUserPlus } from "react-icons/fa6";
import { MdLogin, MdLogout } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
// import axios from 'axios';
import axios from "../API/instance";


function Navbar() {
  const cartState = useSelector((state) => state.handleCart);
  const authState = useSelector((state) => state.auth); // Get auth state
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
  
      await axios.delete("http://localhost:3000/logout", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      
  
      // نظف البيانات من localStorage
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");

  
      dispatch({ type: "LOGOUT" });
  
      setTimeout(() => navigate("/login"), 1000);
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Logout failed. Please try again.");
    }
  };
  
  const handleLogoutAll = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
  
      await axios.delete("http://localhost:3000/logoutAll", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      // نظف كل التوكنات
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");

      dispatch({ type: "LOGOUTALL" });
  
      setTimeout(() => navigate("/login"), 1000);
    } catch (error) {
      console.error("Logout All failed:", error);
      alert("Logout All failed. Please try again.");
    }
  };
  
  
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-body-secondary py-3 sticky-top">
      <div className="container">
        <NavLink className="nav-link fw-bold fs-4" to="/">E-commerce</NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-3 fs-5">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/products">Products</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">About</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/contact">Contact</NavLink>
            </li>
          </ul>

          <form className="d-flex gap-3" role="search">
            {authState.isAuthenticated ? (
              <>
                <span className="nav-link fw-bold pe-5 d-flex align-items-center mb-2 mb-lg-0 fs-5">
                  Welcome: {authState.user?.username || "User"}
                </span>
                <button className="btn btn-outline-dark d-flex align-items-center">
              <FaCartShopping size={20} />
              <NavLink className="nav-link ms-2" to="/cart">
                Cart ({cartState.length})
              </NavLink>
            </button>

            <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
              logout
            </button>
            <ul className="dropdown-menu">
                <li className="mb-2"><button
                  className="btn btn-outline-danger d-flex align-items-center"
                  onClick={handleLogout}
                >
                  <MdLogout size={20} />
                  <span className="ms-2">Logout</span>
                </button></li>
                <li><button
                  className="btn btn-outline-danger d-flex align-items-center"
                  onClick={handleLogoutAll}
                >
                  <MdLogout size={20} />
                  <span className="ms-2">Logout All</span>
                </button></li>
              </ul>
              </div>
              </>
            ) : (
              <>
                <button className="btn btn-outline-dark d-flex align-items-center">
                  <MdLogin size={20} />
                  <NavLink className="nav-link ms-2" to="/login">Login</NavLink>
                </button>
                <button className="btn btn-outline-dark d-flex align-items-center">
                  <FaUserPlus size={20} />
                  <NavLink className="nav-link ms-2" to="/register">Register</NavLink>
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
