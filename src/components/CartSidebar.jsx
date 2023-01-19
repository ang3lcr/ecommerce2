import React, { useEffect } from 'react'
import { ListGroup, Offcanvas } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getCartThunk } from '../store/slices/cart.slice';
import '../styles/cart.css'
const CartSidebar = ({show, handleClose}) => {
    
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    useEffect(() => {
        dispatch(getCartThunk())
    }, [])

    console.log(cart);
    return (
       
            <Offcanvas show={show} onHide={handleClose} placement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Cart</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <ListGroup>
                   {cart?.map(product => (
                    <ListGroup.Item key={product.id} className="element-cart">
                        <p>{product.title}</p>
                        <p>${product.price}</p>

                    </ListGroup.Item>
                   ))}
                    </ListGroup>
                </Offcanvas.Body>
            
            <div className='footer'>
                <p>Hols</p>
            </div>
            
            </Offcanvas>
     
    )
}

export default CartSidebar