import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { addCart } from '../redux/action';

function Products() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);
  const componentMounted = useRef(true); 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authState = useSelector((state) => state.auth);
  const addProduct = (product) => {
    if (!authState.isAuthenticated) {
      navigate("/login"); // Redirect to login if user is not authenticated
    } else {
      dispatch(addCart(product));
    }
  };

  const categoryList = [
    {id: 1 , title: "All"},
    {id: 2 , title: "Men's Clothing"},
    {id: 3 , title: "Women's Clothing"},
    {id: 4 , title: "Jewelery"},
    {id: 5 , title: "Electronics"},
  ]
  const CategoryListMenu = categoryList.map((item) =>{
    return (
      <button key={item.id}
      className="btn btn-outline-dark btn-sm m-2"
      onClick={() => filterProduct(item.title)}>
        {item.title}
      </button>
    )
  })

  useEffect(() => {
    const getProducts = async () => {
      const response = await fetch("https://fakestoreapi.com/products/");
      if (componentMounted.current) {
        setData(await response.clone().json());
        setFilter(await response.json());
      }

      return () => {
        componentMounted.current = false;
      };
    };

    getProducts();
  }, []);

  const filterProduct = (category) => {
    if(category === "All"){
      setFilter(data)
    }else{
      const updatedList = data.filter((item) => item.category === category.toLowerCase());
      setFilter(updatedList);
    }
  };
  
  function ShowProducts(){
      return (
        <>
        {filter.map((product) => {
                return(
                    <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4" id={product.id} key={product.id}>
                        <div className="card border-1 text-center h-100 "  key={product.id}>
                        <img src={product.image} className="card-img-top p-3" alt="Card" height={300} />
                        <div className="card-body">
                            <h5 className="card-title"> {product.title.substring(0,12)}... </h5>
                            <p className="card-text"> {product.description.substring(0, 90)}...</p>
                        </div>
                        <ul className="list-group list-group-flush align-items-center">
                            <li className="list-group-item">$ {product.price}</li>
                        </ul>
                        <div className="card-body ">
                            <Link to={"/product/" + product.id} className="btn btn-dark me-2">Buy Now</Link>
                            <button  className="btn btn-dark" onClick={() => addProduct(product)}>Add to Cart</button>
                        </div>
                        </div>
                </div>
                )
            })}
        </>
      );
    }
  
  return (
    <div className="container mt-5 pb-5">
    <div className="row">
      <div className="col-12">
        <h2 className="display-5 text-center">Latest Products</h2>
        <hr />
      </div>
    </div>
    <div className="row justify-content-center">
      <div className="buttons text-center py-5">
        {CategoryListMenu}
      </div>
      <ShowProducts />
    </div>
  </div>
  )
}

export default Products
