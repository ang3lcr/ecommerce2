import React, { useEffect, useState } from 'react'
import { Button, Col, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import { addToCartThunk } from '../store/slices/cart.slice';
import '../styles/productdetail.css'

const ProductDetail = () => {
  
  const { id } = useParams();
  const dispatch = useDispatch();

  const productList = useSelector(state => state.products)
  const productDetail = productList.find(product => product.id == id)
  const relatedProducts = productList.filter(product => product.category.id === productDetail.category.id) 
  
  const [quantity, setQuantity] = useState(0);

  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }
  const decreaseQuantity = () => {
    if (quantity <= 0) {
      return 0;
    } else {
      setQuantity(quantity - 1)
    }
 }

 useEffect(() => {
  setQuantity(0);
 }, [id])
  
 const addToCart = () => {
  const product = {
    id: id,
    quantity: quantity,
  }
  dispatch(addToCartThunk(product))
 }


  
  return (
    

    <div className='mainContainer'>
      <div className="product">
        <h1>{productDetail?.title}</h1>
        <div className="imgContainer">
          <img src={productDetail?.productImgs[0]} alt="" className='img-resize' />
        </div>
        <div className="description">
          {productDetail?.description}
        </div>
        <div className="functions">

        <Button className='me-3' onClick={decreaseQuantity}>-</Button>
        {quantity}
        <Button className='ms-3' onClick={increaseQuantity}>+</Button>
        <br />
        <Button className='mt-3' onClick={addToCart}>Add to cart</Button>
        </div>
      </div>

      <div className='relatedProducts'>
        <h2>Related Products</h2>
        {relatedProducts.map(product => (
          <div key={product.id} className="relatedProductsCard">
             <Link to={`/product/${product.id}`}>
            <div className='productsRelatedImg'>
              <img src={product.productImgs?.[0]} alt="" className='related-img'/>
            </div>
           </Link>
          </div>
          
        ))}
      </div>





    </div>
  )
}

/*
    {
          relatedProducts.map(product => (
            <li key={product.id} className='related'>
              <Link to={`/product/${product.id}`}>
                {product.title}
                <img src={product.productImgs[0]}  />
              </Link>
            </li>
          ))
        }
*/


       
       
      
    

export default ProductDetail