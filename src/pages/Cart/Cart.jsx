import React, { useContext, useEffect, useState } from "react";
import { FaMinus, FaPlus, FaRegTimesCircle } from "react-icons/fa";
import { AuthContext } from "../../Providers/Authprovider";

const Cart = ({ singleCart }) => {
  const { cart, setCart,setShipping, setTotalPrice,setDiscount,discountRate } = useContext(AuthContext);
  let { _id, img, title, price, quantity, charge, color } = singleCart;
  const [qt, setQT] = useState(quantity);
  useEffect(() => {
    let total = 0;
    for (let i = 0; i < cart.length; i++)
      total += parseFloat(cart[i].quantity) * parseFloat(cart[i].price);
    setTotalPrice(total);
  }, []);
  console.log(quantity);
  const clearCart = () => {
    const remaining = cart.filter((x) => x._id != _id);
    setCart([...remaining]);
    console.log(remaining);
    localStorage.setItem("cart", JSON.stringify(remaining));
    let total = 0;
    let totalShipping = 0;
    for (let i = 0; i < cart.length; i++)
      totalShipping += parseFloat(cart[i].charge);
    setShipping(totalShipping);
    for (let i = 0; i < remaining.length; i++) {
      total +=
        parseFloat(remaining[i].quantity) * parseFloat(remaining[i].price);
    }
    setDiscount(discountRate*total);
    setTotalPrice(total);
  };
  const addOne = () => {
    setQT(qt + 1);
    const remaining = cart.filter((x) => x._id != _id);
    const current = cart.find((x) => x._id == _id);

    current.quantity = current.quantity + 1;
    const newCart = [...remaining, current];

    let total = 0;
    for (let i = 0; i < newCart.length; i++)
      total += parseFloat(newCart[i].quantity) * parseFloat(newCart[i].price);
    setTotalPrice(total);
    setDiscount(discountRate*total);
    localStorage.setItem("cart", JSON.stringify(newCart));
    console.log(cart);
  };
  const removeOne = () => {
    if (quantity == 1) return;
    setQT(qt - 1);
    const remaining = cart.filter((x) => x._id != _id);
    const current = cart.find((x) => x._id == _id);

    current.quantity = current.quantity - 1;
    const newCart = [...remaining, current];

    let total = 0;
    for (let i = 0; i < newCart.length; i++)
      total += parseFloat(newCart[i].quantity) * parseFloat(newCart[i].price);
    setTotalPrice(total);
    setDiscount(discountRate*total);
    localStorage.setItem("cart", JSON.stringify(newCart));
    console.log(cart);
  };
  return (
    <div className="mb-5 ">
      <div className="card lg:card-side bg-base-100 shadow-xl">
        <figure>
          <img src={img} alt="Album" className="p-5" />
        </figure>
        <div className="card-body my-auto gap-y-9 font-semibold grid grid-cols-2">
          <span>{title}</span>
          <FaRegTimesCircle onClick={clearCart} className="text-3xl" />

          <span className="">Color : {color}</span>
          <span className="">Shipping Method : {`EMS`}</span>
          <div className="join">
            <button onClick={addOne} className="btn join-item">
              <FaPlus className="" />
            </button>
            <button className="btn join-item">{qt}</button>
            <button onClick={removeOne} className="btn join-item">
              <FaMinus className="" />
            </button>
          </div>
          <span className="">Price: {price}</span>
          <span className="">Shipping Charge: {charge}</span>
          <span>Total Price : {quantity * price}TK</span>
        </div>
      </div>
    </div>
  );
};

export default Cart;
