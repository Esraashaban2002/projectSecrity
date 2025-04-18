import React, { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useParams } from 'react-router-dom';
import { Footer, Navbar } from '../components';
import { FaStar } from 'react-icons/fa6';
import { useDispatch } from 'react-redux';
import { addCart } from '../redux/action';
import Marquee from 'react-fast-marquee';

function Product() {
  const {id} = useParams()
  const [product , setProduct] = useState([])
  const [similarProducts, setSimilarProducts] = useState([]);
  const componentMounted = useRef(true); 
  const dispatch = useDispatch();

  const addProduct = (product) => {
    dispatch(addCart(product));
  };(addCart(product));
  
useEffect(()=>{
    const getProduct = async () =>{
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await response.json();
        if (componentMounted.current) {
            setProduct(data);
        }
        const response2 = await fetch(
          `https://fakestoreapi.com/products/category/${data.category}`
        );
        const data2 = await response2.json();
        setSimilarProducts(data2);
      
        return () => {
          componentMounted.current = false;
        };
      };
    getProduct();
} , [id]);

 return (
    <>
    <Navbar />
    <div className="container my-5 py-2">
      <div className="row">
        <div className="col-md-6 col-sm-12 py-3">
          <img className="img-fluid"
            src={product.image} alt={product.title}
            width="400px" height="400px" />
        </div>
        <div className="col-md-6 col-md-6 py-5">
          <h4 className="text-uppercase text-muted">{product.category}</h4>
          <h1 className="display-5">{product.title}</h1>
          <p className="lead">
            {product.rating && product.rating.rate}{" "}
            <FaStar />
          </p>
          <h3 className="display-6  my-4">${product.price}</h3>
          <p className="lead">{product.description}</p>
          <button className="btn btn-outline-dark" onClick={() => addProduct(product)} > Add to Cart </button>
          <Link to="/cart" className="btn btn-dark mx-3"> Go to Cart </Link>
        </div>
      </div>

      <div className='row mt-5 pt-5'>
        <h2>You may also Like</h2>
        <Marquee pauseOnHover={true} pauseOnClick={true} speed={50}>
          <div className="py-4 my-4">
              <div className="d-flex">
                {similarProducts.map((item) => {
                  return (
                    <div key={item.id} className="card mx-4 text-center">
                      <img className="card-img-top p-3"
                        src={item.image} alt="Card"
                        height={300} width={300} />
                      <div className="card-body">
                        <h5 className="card-title">{item.title.substring(0, 15)}...</h5>
                      </div>
                      <div className="card-body">
                        <NavLink to={"/product/" + item.id} className="btn btn-dark m-1">Buy Now </NavLink>
                        <button className="btn btn-dark m-1" onClick={() => addProduct(item)} > Add to Cart </button>
                      </div>
                    </div>
                  );
                })}
              </div>
          </div>
        </Marquee>
      </div>
    </div>

    <Footer />
    </>
  )
}

export default Product
