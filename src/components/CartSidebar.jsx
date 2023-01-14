import React, { useEffect } from 'react'
import { ListGroup, Offcanvas } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getCartThunk } from '../store/slices/cart.slice';

const CartSidebar = ({show, handleClose}) => {
    
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    useEffect(() => {
        dispatch(getCartThunk())
    }, [])
    
    return (
       
            <Offcanvas show={show} onHide={handleClose} placement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Cart</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <ListGroup>
                   {cart?.map(product => (
                    <ListGroup.Item key={product.id}>
                        <h2>{product.title}</h2>
                    </ListGroup.Item>
                   ))}
                    </ListGroup>
                </Offcanvas.Body>
            </Offcanvas>
     
    )
}

export default CartSidebar