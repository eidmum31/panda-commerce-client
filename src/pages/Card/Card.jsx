import React, { useState } from "react";

const Card = ({product}) => {
  
  const {title,price,img}=product;
  
  return (
   
    <div>
      <div className="card w-full h-[400px] bg-base-100 shadow-xl">
        <figure className="px-10 pt-10 ">
          <img
            src={img}
            className="rounded-xl"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{title}</h2>
          
          <div className="card-actions flex justify-between">
            <h3 className="text-xl font-semibold">{price}</h3>
            <h3 className="text-xl font-semibold bg-yellow-300 p-1 rounded">15%</h3>
          </div>
          <button  className="btn btn-primary">Add to cart</button>
        </div>
        
      </div>
    </div>
  );
};

export default Card;
