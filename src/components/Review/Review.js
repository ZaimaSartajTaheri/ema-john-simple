import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import { Link, useHistory } from 'react-router-dom';
import happyImage from '../../images/giphy.gif';

const Review = () => {
    const [cart,setCart]=useState([]);
    const [orderPlaced,setOrderPlaced]=useState(false);
    useEffect(()=>{
        const savedCart=getDatabaseCart();
        const productKeys=Object.keys(savedCart);
        const cartProducts=productKeys.map(key=>{
            const product=fakeData.find(pd=>pd.key===key);
            product.quantify=savedCart[key];
            return product;
        });
        setCart(cartProducts);
    },[]);
    const removeProduct=(productKey)=>{
       const remainingProducts=cart.filter(pd=>pd.key!==productKey);
       setCart(remainingProducts);
       removeFromDatabaseCart(productKey);
    }
    const history=useHistory();
    const handleProceedCheckout=()=>{
        history.push('/shipment');
    }
    let thankyou;
    if(orderPlaced){
        thankyou=<img src={happyImage} alt=""/>;
    }
    return (
        
            <div className="shop-container">
                
                <div className="product-container">
                
                  {
                  cart.map(pd=><ReviewItem removeProduct={removeProduct} product={pd}></ReviewItem>)
                  
                  } 
                  {thankyou}
                  
                  
                </div>
            
                <div className="cart-container">

                  <Cart cart={cart}>
                  <button onClick={handleProceedCheckout} className="main-button">Proceed Checkout</button>
                  </Cart>
                </div>
            </div>
           
        
    );
};

export default Review;