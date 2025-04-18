import React from 'react'
import { Footer, Navbar } from '../components'

function Contact() {
  return (
    <div>
      <Navbar />
      <div className="container py-3">
        <h1 className='text-center mt-5'>Contact Us</h1>
        <hr />

        <form className='mx-auto my-5' style={{width:"350px"}}>
        <div className="mb-3">
            <label htmlFor="nameFormControl" className="form-label">Name</label>
            <input type="text" className="form-control" id="nameFormControl" placeholder="Enter your name" />
        </div>
        <div className="mb-3">
            <label htmlFor="emailFormControl" className="form-label">Email</label>
            <input type="email" className="form-control" id="emailFormControl" placeholder="name@example.com" />
        </div>
        <div className="mb-3">
            <label htmlFor="FormControlTextarea" className="form-label">Message</label>
            <textarea className="form-control" id="FormControlTextarea" rows="5" placeholder="Enter your message"></textarea>
        </div>
        <button className='btn btn-secondary d-block mx-auto px-4'>Send</button>
        </form>

        </div>
        <Footer />
    </div>
  )
}

export default Contact
