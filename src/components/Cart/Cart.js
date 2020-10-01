import React from 'react';
import './Cart.css';


const Cart = (props) => {
    const cart=props.cart;

    let total=0;
    for(let i=0;i<cart.length;i++){
        let product=cart[i];
        total=total+product.price*(product.quantify || 1);
    }

    let shipping=0;

    if(total>35){
        shipping=0;
    }else if(total>15){
        shipping=4.99;
    }else if(total>0){
        shipping=12.99;
    }

    const tax=total/10;
    const grandTotal=(total+shipping+Number(tax))

    const formatNUmber=num=>{
        const precision=num.toFixed();
        return Number(precision);
    }

    return (
        <div>
            <h4>Order Summary</h4>
            <p>Item Ordered:{cart.length}</p>
    <p>Product price: {formatNUmber(total)}</p>
    <p><small>Shipping Cost:{shipping}</small></p>
    <p><small>Tax+VAT:{formatNUmber(tax)}</small></p>  
    <p>Total Price:{grandTotal}</p>  
    {
        props.children
    } 
    
         
        </div>
    );
};

export default Cart;