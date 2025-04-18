import React, { useEffect } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { AboutPage, Cart, Checkout,PageNotFound, Contact, Home, Login, Product, Products, Register } from "./pages";
import {ProtectedRoute} from "./components"
import { useDispatch } from "react-redux";
import { login } from "./redux/action";
// GitHub Pages works better with HashRouter because it uses the # in the URL to handle routing on the client side

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    const user = JSON.parse(localStorage.getItem("user"));

    if (accessToken && user) {
      dispatch(login({ user, accessToken, refreshToken }));
    }
  }, [dispatch]);

  return (
    <div className="App">
       <Router>
       <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<PageNotFound />} />

        <Route path="/dashboard"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route path="/checkout" 
          element={
            <ProtectedRoute>
            <Checkout />
           </ProtectedRoute>
          } />
          <Route path="/products" 
          element={
            <ProtectedRoute>
             <Products />
            </ProtectedRoute>
          } />
          <Route path="/product/:id" 
          element={
            <ProtectedRoute>
            <Product />
          </ProtectedRoute>
          } />

       </Routes>
       </Router>
    </div>
  );
}

export default App;
