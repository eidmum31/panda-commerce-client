import React, { useContext, useState } from "react";
import { AuthContext } from "../../Providers/Authprovider";
import Swal from "sweetalert2";

const Card = ({product}) => {
  
  const {title,price,img}=product;
  const {cart,setCart}=useContext(AuthContext);
  const addToCart=()=>{
    //check if the product is already added to cart
    const element=cart.find(x=>x._id==product._id);
    if(element){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "The product is already in cart",
       
      })
      return;
    }
    const newCart=[...cart,product];
    setCart(newCart);
    localStorage.setItem('cart',JSON.stringify(newCart)); //before confirm order store 
                                                      //in local storage temporarily
    Swal.fire({
      title: "SUCCESS!",
      text: "Product added to cart!",
      icon: "success"
    });
    return;
  }
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
          <button onClick={addToCart}  className="btn btn-primary">Add to cart</button>
        </div>
        
      </div>
    </div>
  );
};

export default Card;
