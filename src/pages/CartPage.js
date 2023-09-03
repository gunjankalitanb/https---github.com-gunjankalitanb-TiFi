import React, { useState } from "react";
// import dotenv from "dotenv";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import CheckoutModal from "./CheckoutModal";

// import RazorpayCheckout from "react-native-razorpay";

const CartPage = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  //total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.log(error);
    }
  };

  //delete cart items
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  const handleProceedToPayment = () => {
    setShowCheckoutModal(true);
    var options = {
      currency: "INR",
      key: process.env.RAZORPAY_KEY_ID,
    };
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <h1 className="text-center bg-light p-2 mb-1">
            {`Hello ${auth?.token && auth?.user?.name}`}
          </h1>
          <h4 className="text-center">
            {cart?.length
              ? `You Have ${cart.length} items in you cart ${
                  auth?.token ? "" : "Please login to checkout"
                }`
              : "Your Cart Is Empty"}
          </h4>
        </div>
      </div>
      <div className="row">
        <div className="col-md-8">
          {cart?.map((p) => (
            <div className="row mb-2 p-3 card flex-row">
              <div className="col-md-4">
                <img
                  src={`${process.env.REACT_APP_API}/api/v1/items/item-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                  width={"50px"}
                  height={"200px"}
                />
              </div>
              <div className="col-md-8">
                <p>{p.name}</p>
                <p>price : ₹{p.price}</p>
                <button
                  className="btn btn-danger"
                  onClick={() => removeCartItem(p._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="col-md-4 text-center">
          <h2>Cart Summary</h2>
          <p>Total | Checkout | Payment</p>
          <hr />
          <h4>Total : {totalPrice()} </h4>
          {auth?.token ? (
            <button
              type="button"
              className="btn btn-primary mb-2"
              onClick={handleProceedToPayment}
            >
              Proceed to Payment
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-outline-warning mb-2"
              onClick={() =>
                navigate("/login", {
                  state: "/cartpage",
                })
              }
            >
              Login to Checkout
            </button>
          )}
        </div>
        {/* Render the CheckoutModal */}
        {showCheckoutModal && (
          <CheckoutModal
            isOpen={showCheckoutModal}
            onRequestClose={() => setShowCheckoutModal(false)}
            totalAmount={totalPrice()} // Pass the total amount to the modal
          />
        )}
      </div>
    </div>
  );
};

export default CartPage;
