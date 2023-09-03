/* global $ */

import React, { useState } from "react";
import Modal from "react-modal";
import { useCart } from "../context/cart.js";

const CheckoutModal = ({ isOpen, onRequestClose, totalAmount }) => {
  const [street, setStreet] = useState("");
  const [locality, setLocality] = useState("");
  const [landmark, setLandmark] = useState("");

  const [cart, setCart] = useCart();
  <script src="https://checkout.razorpay.com/v1/checkout.js"></script>;
  var orderId;
  $(document).ready(function () {
    var settings = {
      url: "/create/orderId",
      method: "POST",
      timeout: 0,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        amount: "50000",
      }),
    };

    //creates new orderId everytime
    $.ajax(settings).done(function (response) {
      orderId = response.orderId;
      console.log(orderId);
      $("button").show();
    });
  });

  const handlePayment = () => {
    // Construct the full address by combining street, locality, and landmark
    const fullAddress = `${street}, ${locality}, ${landmark}`;

    // You can send the fullAddress to your payment logic or server here
    // For example:
    // Make an API call with the fullAddress and cart items

    // After successful payment processing, you can close the modal and reset the form
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Checkout Modal"
    >
      <h2>Checkout</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="street" className="form-label">
            Street
          </label>
          <input
            type="text"
            className="form-control"
            id="street"
            placeholder="Flat / House no / Floor / Building"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="locality" className="form-label">
            Locality
          </label>
          <input
            type="text"
            className="form-control"
            id="locality"
            placeholder="Area / Sector / Locality"
            value={locality}
            onChange={(e) => setLocality(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="landmark" className="form-label">
            Landmark
          </label>
          <input
            type="text"
            className="form-control"
            id="landmark"
            placeholder="Nearby Landmark"
            value={landmark}
            onChange={(e) => setLandmark(e.target.value)}
          />
        </div>
        <p>Total Amount: {totalAmount}</p>
        <button className="btn btn-primary" onClick={handlePayment}>
          Make Payment
        </button>
      </form>
    </Modal>
  );
};

export default CheckoutModal;
