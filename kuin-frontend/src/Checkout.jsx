import { useState } from "react";
import { Link } from "react-router-dom";
import "./Checkout.css";

function Checkout() {
  const [cartItems] = useState(() => {
  const savedCart = localStorage.getItem("kuinCart");
  return savedCart ? JSON.parse(savedCart) : [];
});

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: ""
  });


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const subtotal = cartItems.reduce(
  (total, item) =>
    total + item.price * item.quantity,
  0
);

const delivery =
  subtotal >= 999 || subtotal === 0
    ? 0
    : 50;

const total = subtotal + delivery;


  const handleOrder = (e) => {

    e.preventDefault();

    if (
      !formData.name ||
      !formData.phone ||
      !formData.address ||
      !formData.city ||
      !formData.state ||
      !formData.pincode
    ) {
      alert("Please fill all required fields.");
      return;
    }

    alert("Order placed successfully!");

  };


  return (

    <div className="checkout-page">

      {/* ================= HERO ================= */}

      <section className="checkout-hero">

        <p>KUIN SHOPPING</p>

        <h1>CHECKOUT</h1>

        <span>
          Complete your order details.
        </span>

      </section>


      {/* ================= CHECKOUT ================= */}

      <section className="checkout-section">

        <div className="checkout-container">


          {/* ================= CUSTOMER DETAILS ================= */}

          <div className="checkout-form-container">

            <h2>
              DELIVERY DETAILS
            </h2>

            <p className="checkout-description">
              Enter your details to receive your order.
            </p>


            <form onSubmit={handleOrder}>


              <div className="checkout-row">

                <div className="checkout-field">

                  <label>
                    Full Name *
                  </label>

                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                  />

                </div>


                <div className="checkout-field">

                  <label>
                    Phone Number *
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    placeholder="Enter phone number"
                    value={formData.phone}
                    onChange={handleChange}
                  />

                </div>

              </div>


              <div className="checkout-field">

                <label>
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={handleChange}
                />

              </div>


              <div className="checkout-field">

                <label>
                  Delivery Address *
                </label>

                <textarea
                  name="address"
                  placeholder="Enter your complete address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="4"
                />

              </div>


              <div className="checkout-row">

                <div className="checkout-field">

                  <label>
                    City *
                  </label>

                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleChange}
                  />

                </div>


                <div className="checkout-field">

                  <label>
                    State *
                  </label>

                  <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={formData.state}
                    onChange={handleChange}
                  />

                </div>

              </div>


              <div className="checkout-field">

                <label>
                  PIN Code *
                </label>

                <input
                  type="text"
                  name="pincode"
                  placeholder="Enter PIN code"
                  value={formData.pincode}
                  onChange={handleChange}
                />

              </div>


              {/* PAYMENT */}

              <div className="payment-section">

                <h2>
                  PAYMENT METHOD
                </h2>


                <label className="payment-option">

                  <input
                    type="radio"
                    name="payment"
                    defaultChecked
                  />

                  <span>
                    Cash on Delivery
                  </span>

                </label>


                <label className="payment-option">

                  <input
                    type="radio"
                    name="payment"
                  />

                  <span>
                    Online Payment
                  </span>

                </label>

              </div>


              <button
                type="submit"
                className="place-order-btn"
              >
                PLACE ORDER
              </button>

            </form>

          </div>


          {/* ================= ORDER SUMMARY ================= */}

          <div className="checkout-summary">

            <h2>
              ORDER SUMMARY
            </h2>


            {cartItems.map((item) => (

  <div
    className="checkout-product"
    key={item.id}
  >

    <div>

      <h3>
        {item.productName}
      </h3>

      <span>
        Qty: {item.quantity}
      </span>

    </div>

    <strong>
      ₹{item.price * item.quantity}
    </strong>

  </div>

))}
<div className="checkout-line"></div>

<div className="checkout-total-row">

  <span>
    Subtotal
  </span>

  <strong>
    ₹{subtotal}
  </strong>

</div>

<div className="checkout-total-row">

  <span>
    Delivery
  </span>

  <strong>
    {delivery === 0 ? "FREE" : `₹${delivery}`}
  </strong>

</div>

<div className="checkout-line"></div>

<div className="checkout-grand-total">

  <span>
    TOTAL
  </span>

  <strong>
    ₹{total}
  </strong>

</div>

            <Link
              to="/cart"
              className="back-cart"
            >
              ← BACK TO CART
            </Link>

          </div>

        </div>

      </section>

    </div>

  );
}

export default Checkout;