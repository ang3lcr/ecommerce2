import React, { useEffect } from 'react'
import { ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { getPurchasesThunk } from '../store/slices/purchases.slice';

const Purchases = () => {

    const dispatch = useDispatch();
    const purchases = useSelector(state => state.purchases.data?.purchases);

    useEffect(() => {
     dispatch(getPurchasesThunk())
    }, [])




  return (
  <div>
    <h1>Purchases</h1>
      <ListGroup>
        {
          purchases?.map(purchase => (
            <ListGroup.Item>
              {purchase.createdAt}
              <ListGroup>
                <ListGroup.Item>
                  {purchase.cart.products.map(product =>(
                    <h3>
                      {product.title}
                    </h3>
                  ))}
                </ListGroup.Item>
              </ListGroup>
            </ListGroup.Item>
          ))
        }
      </ListGroup>
  </div>

  )
  }
     

        
     

export default Purchases