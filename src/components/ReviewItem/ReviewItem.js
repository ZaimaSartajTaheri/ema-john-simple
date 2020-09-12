import React from 'react';
import './ReviewItem.css';

const ReviewItem = (props) => {
    
    const {name,quantify,key}=props.product;
    return (
        
        <div>
           
                  <h3>{name}</h3> 
                  <h3>{quantify}</h3>
                  <button onClick={()=>{props.removeProduct(key)}} className="main-button">Remove</button>
                
            </div>
           
    
    );
};

export default ReviewItem;