import React, { useEffect } from 'react';
import fakeData from '../../fakeData';
import {useState} from 'react';
import './Shop.css'
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';




const Shop = () => {
    //const first10=fakeData.slice(0,10);
    const [products,setProducts]=useState([]);
    const [cart,setCart]=useState([]);
    const [search, setSearch] = useState('');
    useEffect(()=>{
        fetch('https://hidden-sea-98559.herokuapp.com/products?search='+search)
        .then(res=>res.json())
        .then(data=>setProducts(data))
    },[])

    useEffect(()=>{
        const savedCart=getDatabaseCart();
        const productKeys=Object.keys(savedCart);
        fetch('https://hidden-sea-98559.herokuapp.com/productsByKeys',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(productKeys)
        })
        .then(res=>res.json())
        .then(data=>setCart(data))
    },[]);
    
const handelAddProduct =(product)=>{
    const toBeAddedKey=product.key;
    const sameProduct=cart.find(pd=>pd.key===toBeAddedKey);
    let count=1;
    let newCart;
    if(sameProduct){
        count=sameProduct.quantify+1;
        sameProduct.quantify=count;
        const others=cart.filter(pd=>pd.key!==toBeAddedKey);
        newCart=[...others,sameProduct];
    }
    else{
        product.quantify=1;
        newCart=[...cart,product];

    }
    
     setCart(newCart);
     addToDatabaseCart(product.key,count);

  
}
const handleSearch = event =>{
    setSearch(event.target.value);
}
    return (
        <div className='shop-container'>
            <div className='product-container'>
            <input type="text" onBlur={handleSearch} placeholder="search product"/>
                {
                  products.map(pd=><Product showAddToCart={true} product={pd} handelAddProduct={handelAddProduct}></Product>)
                }
            </div>
            <div className="cart-container">
             <Cart cart={cart}>
             <Link to="/review"><button className="main-button">Review Order</button>  </Link>
             </Cart>
             
             </div>
        </div>
        
    );
};

export default Shop;