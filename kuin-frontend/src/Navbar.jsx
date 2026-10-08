import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {

  const [cartCount, setCartCount] = useState(0);


  // Get cart quantity
  const updateCartCount = () => {

    const cart =
      JSON.parse(localStorage.getItem("kuinCart")) || [];

    const count = cart.reduce(
      (total, item) => total + item.quantity,
      0
    );

    setCartCount(count);
  };


  useEffect(() => {

    // Load cart count when page opens
    updateCartCount();

    // Listen for cart changes
    window.addEventListener(
      "cartUpdated",
      updateCartCount
    );

    return () => {
      window.removeEventListener(
        "cartUpdated",
        updateCartCount
      );
    };

  }, []);


  return (
    <nav className="navbar">

      {/* Logo */}
      <div className="navbar-logo">
        <Link to="/">KUIN</Link>
      </div>


      {/* Navigation Links */}
      <div className="navbar-links">

        <Link to="/">Home</Link>

        <Link to="/about">About</Link>


        {/* Products Dropdown */}
        <div className="products-menu">

          <Link to="/products">
            Products <span>▾</span>
          </Link>

          <div className="dropdown">

            <Link to="/products">
              All Products
            </Link>

            <Link to="/products/leggings">
              Leggings
            </Link>

            <Link to="/products/kurti-leggings">
              Kurti Leggings
            </Link>

            <Link to="/products/shimmer-leggings">
              Shimmer Leggings
            </Link>

          </div>

        </div>


        <Link to="/contact">
          Contact
        </Link>

      </div>


      {/* Right Side */}
      <div className="navbar-actions">

        <Link to="/cart" className="cart-icon">

          🛒

          <span>
            {cartCount}
          </span>

        </Link>


        <Link
          to="/login"
          className="login-btn"
        >
          Login
        </Link>

      </div>

    </nav>
  );
}

export default Navbar;