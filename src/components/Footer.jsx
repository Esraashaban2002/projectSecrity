import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="bg-body-secondary pb-3 w-100 mb-0">
      <div className="container">
        <p className="text-center">Made with ❤ by <Link href="#" className='text-dark fs-5'>Esraa Shaban</Link> </p>
      </div>
    </footer>
  )
}

export default Footer
