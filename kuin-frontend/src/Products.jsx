import { useEffect, useState } from "react";
import "./Products.css";

function Products() {

  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Store selected image for each product
  const [selectedImages, setSelectedImages] = useState({});

  // Get products from Spring Boot
  useEffect(() => {

    fetch("http://localhost:8085/products")
      .then(response => response.json())
      .then(data => {
        setProducts(data);
      })
      .catch(error => {
        console.error("Error fetching products:", error);
      });

  }, []);

  const addToCart = (product) => {

    // Check product stock
    if (product.stockQuantity <= 0) {
      alert("Sorry, this product is out of stock.");
      return;
    }

    const existingCart =
      JSON.parse(localStorage.getItem("kuinCart")) || [];

    const existingProduct = existingCart.find(
      item => item.id === product.id
    );

    // Prevent adding more than available stock
    if (
      existingProduct &&
      existingProduct.quantity >= product.stockQuantity
    ) {
      alert("You cannot add more than the available stock.");
      return;
    }

    let updatedCart;

    if (existingProduct) {

      updatedCart = existingCart.map(item =>
        item.id === product.id
          ? {
              ...item,
              quantity: item.quantity + 1
            }
          : item
      );

    } else {

      updatedCart = [
        ...existingCart,
        {
          ...product,
          quantity: 1
        }
      ];

    }

    localStorage.setItem(
      "kuinCart",
      JSON.stringify(updatedCart)
    );

    window.dispatchEvent(new Event("cartUpdated"));

    alert(`${product.productName} added to cart!`);
  };

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter(
          product =>
            product.subcategory === selectedCategory
        );

  // Change main image
  const changeImage = (productId, imageIndex) => {

    setSelectedImages(prev => ({
      ...prev,
      [productId]: imageIndex
    }));

  };


  return (
    <div className="products-page">

      {/* ================= HERO ================= */}

      <section className="products-hero">

        <p>KUIN COLLECTION</p>

        <h1>
          OUR PRODUCTS
        </h1>

        <span>
          Discover your perfect style.
        </span>

      </section>


      {/* ================= CATEGORY FILTER ================= */}

      <section className="product-section">

        <div className="product-heading">

          <p>SHOP BY CATEGORY</p>

          <h2>
            FIND YOUR FAVORITE
          </h2>

        </div>


        <div className="category-buttons">

          <button
            onClick={() => setSelectedCategory("All")}
            className={
              selectedCategory === "All"
                ? "active"
                : ""
            }
          >
            All Leggings
          </button>

          <button
            onClick={() =>
              setSelectedCategory("Regular Leggings")
            }
            className={
              selectedCategory === "Regular Leggings"
                ? "active"
                : ""
            }
          >
            Regular Leggings
          </button>

          <button
            onClick={() =>
              setSelectedCategory("Kurti Leggings")
            }
            className={
              selectedCategory === "Kurti Leggings"
                ? "active"
                : ""
            }
          >
            Kurti Leggings
          </button>

          <button
            onClick={() =>
              setSelectedCategory("Shimmer Leggings")
            }
            className={
              selectedCategory === "Shimmer Leggings"
                ? "active"
                : ""
            }
          >
            Shimmer Leggings
          </button>

        </div>


        {/* ================= PRODUCT GRID ================= */}

        <div className="product-grid">

          {filteredProducts.map((product) => {

            const images = product.images || [];

            const selectedImageIndex =
              selectedImages[product.id] ?? 0;

            const mainImage =
              images.length > 0
                ? images[selectedImageIndex]?.imageUrl
                : null;

            return (

              <div
                className="product-card"
                key={product.id}
              >

                {/* ================= PRODUCT IMAGES ================= */}

                <div className="product-image">

                  {mainImage ? (

                    <img
                      src={`http://localhost:8085${mainImage}`}
                      alt={product.productName}
                      className="main-product-image"
                    />

                  ) : (

                    <div className="no-product-image">
                      No Image
                    </div>

                  )}


                  <span className="product-category">
                    {product.subcategory}
                  </span>

                </div>


                {/* ================= IMAGE THUMBNAILS ================= */}

                {images.length > 1 && (

                  <div className="product-thumbnails">

                    {images.map((image, index) => (

                      <button
                        key={image.id || index}
                        className={
                          selectedImageIndex === index
                            ? "thumbnail active-thumbnail"
                            : "thumbnail"
                        }
                        onClick={() =>
                          changeImage(
                            product.id,
                            index
                          )
                        }
                      >

                        <img
                          src={`http://localhost:8085${image.imageUrl}`}
                          alt={`${product.productName} ${index + 1}`}
                        />

                      </button>

                    ))}

                  </div>

                )}


                {/* ================= PRODUCT INFO ================= */}

                <div className="product-info">

                  <h3>
                    {product.productName}
                  </h3>

                  <p className="product-price">
                    ₹{product.price}
                  </p>


                  {/* STOCK STATUS */}

                  <div className="stock-status">

                    {product.stockQuantity <= 0 ? (

                      <span className="out-of-stock">
                        Out of Stock
                      </span>

                    ) : product.stockQuantity <= 5 ? (

                      <span className="low-stock">
                        Only {product.stockQuantity} left
                      </span>

                    ) : (

                      <span className="in-stock">
                        In Stock
                      </span>

                    )}

                  </div>


                  {/* ACTION BUTTONS */}

                  <div className="product-actions">

                    <button
                      className="cart-btn"
                      onClick={() =>
                        addToCart(product)
                      }
                      disabled={
                        product.stockQuantity <= 0
                      }
                    >

                      {product.stockQuantity <= 0
                        ? "OUT OF STOCK"
                        : "ADD TO CART"}

                    </button>


                    <button
                      className="buy-btn"
                      disabled={
                        product.stockQuantity <= 0
                      }
                    >

                      {product.stockQuantity <= 0
                        ? "OUT OF STOCK"
                        : "BUY NOW"}

                    </button>

                  </div>

                </div>

              </div>

            );

          })}

        </div>

      </section>


      {/* ================= ADMIN NOTE ================= */}

      <section className="admin-preview">

        <p>
          SHOP OWNER
        </p>

        <h2>
          PRODUCT MANAGEMENT
        </h2>

        <span>
          Admin users will be able to add, edit and
          remove products from this section.
        </span>

      </section>

    </div>
  );
}

export default Products;