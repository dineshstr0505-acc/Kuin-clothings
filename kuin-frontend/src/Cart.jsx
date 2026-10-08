import { useState } from "react";
import { Link } from "react-router-dom";
import "./Cart.css";

function Cart() {

  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("kuinCart");
    return savedCart ? JSON.parse(savedCart) : [];
  });


  // Update cart in localStorage
  const updateCart = (updatedCart) => {
    setCartItems(updatedCart);
    localStorage.setItem("kuinCart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };


  // Increase quantity
  const increaseQuantity = (id) => {

  const updatedCart = cartItems.map((item) => {

    if (item.id === id) {

      if (item.quantity >= item.stockQuantity) {
        alert("You cannot add more than the available stock.");
        return item;
      }

      return {
        ...item,
        quantity: item.quantity + 1
      };
    }

    return item;
  });

  updateCart(updatedCart);
};


  // Decrease quantity
  const decreaseQuantity = (id) => {

    const updatedCart = cartItems
      .map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0);

    updateCart(updatedCart);
  };


  // Remove item
  const removeItem = (id) => {

    const updatedCart = cartItems.filter(
      (item) => item.id !== id
    );

    updateCart(updatedCart);
  };


  // Calculate subtotal
  const subtotal = cartItems.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );


  const delivery = subtotal >= 999 || subtotal === 0
    ? 0
    : 50;

  const total = subtotal + delivery;


  return (

    <div className="cart-page">

      {/* ================= HERO ================= */}

      <section className="cart-hero">

        <p>KUIN SHOPPING</p>

        <h1>
          YOUR CART
        </h1>

        <span>
          Review your selected products.
        </span>

      </section>


      {/* ================= CART ================= */}

      <section className="cart-section">

        <div className="cart-container">

          {/* Cart Items */}

          <div className="cart-items">

            <h2>
              SHOPPING CART
            </h2>


            {cartItems.length === 0 ? (

              <div className="empty-cart">

                <h3>
                  Your cart is empty
                </h3>

                <p>
                  Add some beautiful products to your cart.
                </p>

                <Link
                  to="/products"
                  className="continue-shopping"
                >
                  ← SHOP PRODUCTS
                </Link>

              </div>

            ) : (

              cartItems.map((item) => (

                <div
                  className="cart-item"
                  key={item.id}
                >

                  <img
                    src={item.imageUrl}
                    alt={item.productName}
                  />


                  <div className="cart-item-info">

                    <h3>
                      {item.productName}
                    </h3>

                    <p>
                      ₹{item.price}
                    </p>


                    <div className="quantity-control">

                      <button
                        onClick={() =>
                          decreaseQuantity(item.id)
                        }
                      >
                        −
                      </button>

                      <span>
                        {item.quantity}
                      </span>

                      <button
  onClick={() => increaseQuantity(item.id)}
  disabled={item.quantity >= item.stockQuantity}
>
  +
</button>

                    </div>

                  </div>


                  <div className="cart-item-right">

                    <strong>
                      ₹{item.price * item.quantity}
                    </strong>

                    <button
                      className="remove-btn"
                      onClick={() =>
                        removeItem(item.id)
                      }
                    >
                      REMOVE
                    </button>

                  </div>

                </div>

              ))

            )}


            {cartItems.length > 0 && (

              <Link
                to="/products"
                className="continue-shopping"
              >
                ← CONTINUE SHOPPING
              </Link>

            )}

          </div>


          {/* ================= SUMMARY ================= */}

          <div className="cart-summary">

            <h2>
              ORDER SUMMARY
            </h2>


            <div className="summary-row">

              <span>
                Subtotal
              </span>

              <strong>
                ₹{subtotal}
              </strong>

            </div>


            <div className="summary-row">

              <span>
                Delivery
              </span>

              <strong>
                {delivery === 0
                  ? "FREE"
                  : `₹${delivery}`}
              </strong>

            </div>


            <div className="summary-line"></div>


            <div className="summary-total">

              <span>
                TOTAL
              </span>

              <strong>
                ₹{total}
              </strong>

            </div>


            {cartItems.length > 0 && (
  <Link
    to="/checkout"
    className="checkout-btn"
  >
    PROCEED TO CHECKOUT
  </Link>
)}
          </div>

        </div>

      </section>

    </div>

  );
}

export default Cart;