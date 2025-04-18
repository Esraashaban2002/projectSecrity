import React from 'react'
import { Footer, Navbar } from '../components'
import Mens from '../assets/pexels-photo-298863.jpeg'
import Women from '../assets/pexels-photo-7679720.jpeg'
import Jewelery from '../assets/pexels-photo-1927259.jpeg'
import Electronics from '../assets/pexels-photo-356056.jpeg'

function About() {
    const product =[
        {id: 1 , title: "Mens's Clothing" , image: Mens},
        {id: 2 , title: "Women's Clothing" , image: Women},
        {id: 3 , title: "Jewelery" , image: Jewelery},
        {id: 4 , title: "Electronics" , image: Electronics},
    ]
  return (
    <div>
      <Navbar />
      <div className="container py-5">
        <h1 className='text-center'>About Us</h1>
        <hr />
        <p className='text-center py-3'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum facere doloremque veritatis odit similique sequi.
            Odit amet fuga nam quam quasi facilis sed doloremque saepe sint perspiciatis explicabo totam vero quas provident ipsam,
            veritatis nostrum velit quos recusandae est mollitia esse fugit dolore laudantium. Ex vel explicabo earum unde eligendi autem praesentium,
            doloremque distinctio nesciunt porro tempore quis eaque labore voluptatibus ea necessitatibus exercitationem tempora molestias.
            Ad consequuntur veniam sequi ullam tempore vel tenetur soluta dolore sunt maxime aliquam corporis est, quo saepe dolorem optio 
            minus sint nemo totam dolorum! Reprehenderit delectus expedita a alias nam recusandae illo debitis repellat libero, quasi explicabo
            molestiae saepe, dolorem tempore itaque eveniet quam dignissimos blanditiis excepturi harum numquam vel nihil? Ipsum
        </p>

        <div className='my-5 '>
           <h1 className='text-center my-3'>Our Products</h1>
           <div className="row my-5">
            {product.map((item) => {
                return (
                <div className="col-md-3 col-sm-6 mb-3 px-3" key={item.id} >
                    <div className="card h-100">
                        <img src={item.image}
                            className="card-img-top img-fluid" alt="Card"  height={160} />
                        <div className="card-body">
                            <h5 className="card-title text-center">{item.title}</h5>
                        </div>
                    </div>
                </div> 
                )
            })}
           </div>
        </div>
      </div> 
      <Footer />
    </div>
  )
}

export default About
