import axios from 'axios';
import { Button, Card, Col, Form, InputGroup, ListGroup, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import ProductDetail from './ProductDetail';
import '../styles/home.css'
import { addToCartThunk } from '../store/slices/cart.slice';

const Home = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productsList = useSelector(state => state.products)
  const [categories, setCategories] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    axios.get('https://e-commerce-api.academlo.tech/api/v1/products/categories')
      .then(res => setCategories(res.data.data.categories))
  }, [])

  useEffect(() => {
    setProductsFiltered(productsList)
  }, [productsList])

  const filterCategory = (categoryId) => {
    const filtered = productsList.filter(product => product.category.id == categoryId);
    setProductsFiltered(filtered)
  }

  const searchProducts = () => {
    const filteredProducts = productsList.filter(product => product.title.toLowerCase().includes(searchValue.toLowerCase()));
    setProductsFiltered(filteredProducts);
  }

  const addToCart = () => {const product = {id: product.id, quantity: 1,}
  dispatch(addToCartThunk(product))
   }



  return (
    <div>
      <div className='busqueda'>
        <InputGroup className="mb-3 searchbar">
          <Form.Control
            placeholder="Search products"
            onChange={e => setSearchValue(e.target.value)}
            value={searchValue}
          />
          <Button variant="outline-secondary" onClick={searchProducts}>
            Button
          </Button>
        </InputGroup>
      </div>
      <div className="mainContainer">

        <div className="listCategories">
          <ListGroup>
            {
              categories.map(category => (
                <ListGroup.Item key={category.id} onClick={() => filterCategory(category.id)} style={{ cursor: "pointer" }}>
                  {category.name}
                </ListGroup.Item>
              ))
            }
          </ListGroup>
        </div>

        <div className="listProducts">
          <div className='productContainer'>
          {productsFiltered.map(product => (
             <div className="productCard" onClick={() => navigate(`/product/${product.id}`)}>
              <div className="imgContainer">
                <img src={product.productImgs[0]} alt=""/>
              </div>
                <div className="bodyCard">
                  <p style={{textAlign: "center"}} className="product-title">
                  {product.title}
                  </p>
                </div>

              <div className="extra">
                <div className="price">
                  ${product.price}
                </div>
                <div className="btn1">
                  <Button onClick={addToCart}>+</Button>
                </div>
              </div>


              </div>
              
            ))}
          </div>
        </div>
      </div>
    </div>
            
           
  )
}





export default Home