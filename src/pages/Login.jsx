import React, { useState } from 'react'
import { Footer, Navbar } from '../components'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" })
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((data) => ({
      ...data,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')
    setError('')

    try {
      const response = await axios.post("http://localhost:3000/login", {
        ...formData,
        deviceInfo: window.navigator.userAgent, // optional
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const { accessToken, refreshToken, user } = response.data

      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      localStorage.setItem("user", JSON.stringify(response.data.user));


      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          user,
          accessToken,
          refreshToken
        }
      });

      setMessage("User logged in successfully!")
      setTimeout(() => navigate("/dashboard"), 1000)
    } catch (e) {
      console.error("Login error:", e)
      if (e.response && e.response.data) {
        setError(e.response.data.message || "Login failed.")
      } else {
        setError("An error occurred during login.")
      }
    }
  }
  
  return (
    <div>
      <Navbar />
      <div className='container'>
      <h2 className='text-center fs-1 fw-bolder mt-5'>Login</h2>
      <hr/>
      <form onSubmit={handleSubmit} className='mt-5 mx-auto ' style={{width:"350px"}} >
        <div className="mb-4">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" 
            aria-describedby="emailHelp" placeholder="name@example.com"
            name='email' value={formData.email}
            onChange={handleChange}  
            autoComplete="email" required/>
        </div>
        <div className="mb-4">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" 
            id="exampleInputPassword1" placeholder='password'
            name='password' value={formData.password}
            onChange={handleChange} 
            autoComplete="current-password"  required />
        </div>
        <div className="mb-4">
            <span className="">New Here? <NavLink className="text-primmary" to="/register">Register</NavLink></span>
        </div>
        <div className="mb-4 d-flex justify-content-center">
        <button type="submit" className="btn btn-secondary">Login</button>
        </div>
        {message && <p className='text-success'>{message}</p>}
        {error && <p className='text-danger text-center'>{error}</p>}
    </form>
    </div>
      <Footer />
    </div>
  )
}

export default Login
