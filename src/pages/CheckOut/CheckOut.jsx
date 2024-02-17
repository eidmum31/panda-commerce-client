import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/Authprovider";
import Cart from "../Cart/Cart";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CheckOut = () => {
  const navigate = useNavigate();
  const placeOrder = (e) => {
    e.preventDefault();
    const form = e.target;
    const terms = form.terms.checked;
    if (!terms) {
      Swal.fire("please agree terms and condition");
      return;
    }
    const data = {
      price: totalPrice - discount + shipping,
      status: "pending",
    };
    fetch(`https://panda-commerce-server.onrender.com/orders`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            title: "Good job!",
            text: "Your Order Placed successfully!",
            icon: "success",
          });
        }
      });
    localStorage.setItem("cart",JSON.stringify([]));
    setDiscountRatye(0);
    setDiscount(0);
    setShipping(0);
    setTotalPrice(0);
    setCart([]);
    navigate('/');
  };
  const {
    user,
    cart,
    setCart,
    totalPrice,
    shipping,
    setShipping,
    setTotalPrice,
    discountRate,
    setDiscountRatye,
    discount,
    setDiscount,
  } = useContext(AuthContext);
  useEffect(() => {
    let totalShipping = 0;
    for (let i = 0; i < cart.length; i++)
      totalShipping += parseFloat(cart[i].charge);
    setShipping(totalShipping);
  }, [cart]);

  const handlePromo = (e) => {
    e.preventDefault();
    console.log(user);
    if (!user) {
      navigate("/login");
      return;
    }
    const promo = e.target.promo.value;
    fetch(`https://panda-commerce-server.onrender.com/promos?promo=${promo}`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.rate) {
          setDiscountRatye(parseFloat(data.rate) / 100);
          let dis = totalPrice * (parseFloat(data.rate) / 100);
          setDiscount(dis);
        } else {
          Swal.fire(data.message);
        }
      });
  };
  console.log
  return (
    <div className="flex flex-col-reverse  lg:flex-row">
      <div className="lg:w-2/3">
        {cart.map((x) => (
          <Cart key={x._id} singleCart={x}></Cart>
        ))}
        
       <div>
          <form onSubmit={placeOrder} className="flex justify-center">
            <input type="checkbox" name="terms" className="checkbox" />
            <button className="btn w-10/12 ms-2 me-2 mb-10">Checkout</button>
          </form>
       </div>
        
      </div>
      <div
        className="lg:w-1/3 ms-5 text-xl px-10"
        style={{ boxShadow: "0 0 10px", height: "500px" }}
      >
        <h3 className="text-center text-2xl mt-3">Order Summary</h3>
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>{totalPrice}</p>
        </div>
        <div className="flex justify-between">
          <p>Discount</p>
          <p>{discount}</p>
        </div>
        <div className="flex justify-between">
          <p>Shipping Charge</p>
          <p>{shipping}</p>
        </div>
        <div className="flex justify-between">
          <p>Wallet Debid</p>
          <p>00</p>
        </div>
        <hr className="my-2"></hr>
        <div className="join mt-5">
          <form onSubmit={handlePromo} className="">
            <input
              className="input input-bordered "
              placeholder="Email"
              name="promo"
            />
            <button className="btn  ms-3">Apply</button>
          </form>
        </div>
        <hr className="my-5"></hr>
        <div className="flex justify-between">
          <p>Total payable</p>
          <p>{totalPrice - discount + shipping}</p>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
