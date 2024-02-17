import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/Authprovider";
import Cart from "../Cart/Cart";
import Swal from "sweetalert2";

const CheckOut = () => {
  const {
    cart,
    totalPrice,
    shipping,
    setShipping,
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
    const promo = e.target.promo.value;
    fetch(`http://127.0.0.1:3000/promos?promo=${promo}`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.rate) {
          setDiscountRatye(parseFloat(data.rate) / 100);
          let dis = totalPrice * (parseFloat(data.rate) / 100);
          setDiscount(dis);
        }
        else{
           Swal.fire(data.message);
        }
      });
  };

  return (
    <div className="flex flex-col-reverse  lg:flex-row">
      <div className="lg:w-2/3">
        {cart.map((x) => (
          <Cart key={x._id} singleCart={x}></Cart>
        ))}
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
