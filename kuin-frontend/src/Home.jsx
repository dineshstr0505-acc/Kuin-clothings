import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home">

      {/* ================= HERO ================= */}

      <section className="hero">

        <div className="hero-content">

          <p className="hero-subtitle">
            WELCOME TO KUIN
          </p>

          <h1>
            STYLE THAT
            <br />
            SPEAKS FOR YOU
          </h1>

          <p className="hero-text">
            Discover stylish and comfortable women's clothing
            designed for your everyday confidence.
          </p>

          <Link to="/products" className="hero-btn">
            SHOP NOW
          </Link>

        </div>

      </section>


      {/* ================= CATEGORIES ================= */}

      <section className="categories">

        <div className="section-heading">

          <p>OUR COLLECTION</p>

          <h2>
            FIND YOUR STYLE
          </h2>

        </div>


        <div className="category-grid">

          {/* Leggings */}

          <div className="category-card">

            <div className="category-image leggings">
              <div className="image-overlay"></div>
            </div>

            <div className="category-info">

              <h3>Leggings</h3>

              <p>
                Comfortable styles for every day.
              </p>

              <Link to="/products/leggings">
                SHOP COLLECTION →
              </Link>

            </div>

          </div>


          {/* Kurti Leggings */}

          <div className="category-card">

            <div className="category-image kurti">
              <div className="image-overlay"></div>
            </div>

            <div className="category-info">

              <h3>Kurti Leggings</h3>

              <p>
                Everyday comfort with elegant style.
              </p>

              <Link to="/products/kurti-leggings">
                SHOP COLLECTION →
              </Link>

            </div>

          </div>


          {/* Shimmer Leggings */}

          <div className="category-card">

            <div className="category-image shimmer">
              <div className="image-overlay"></div>
            </div>

            <div className="category-info">

              <h3>Shimmer Leggings</h3>

              <p>
                Add a little shine to your style.
              </p>

              <Link to="/products/shimmer-leggings">
                SHOP COLLECTION →
              </Link>

            </div>

          </div>

        </div>

      </section>


      {/* ================= ABOUT KUIN ================= */}

      <section className="about-home">

        <div className="about-content">

          <p className="red-title">
            WHY KUIN?
          </p>

          <h2>
            MADE FOR YOUR
            <br />
            EVERYDAY STYLE.
          </h2>

          <p>
            At KUIN Women's Clothing, we believe that
            fashion should be stylish, comfortable and
            made for real life.
          </p>

          <p>
            We carefully select our clothing with a focus
            on quality, comfort and modern designs that
            help you feel confident every day.
          </p>

          <Link to="/about" className="about-btn">
            ABOUT KUIN
          </Link>

        </div>

      </section>


      {/* ================= FEATURES ================= */}

      <section className="features">

        <div className="feature-card">

          <div className="feature-icon">
            ✓
          </div>

          <h3>QUALITY</h3>

          <p>
            Carefully selected products
            made with quality in mind.
          </p>

        </div>


        <div className="feature-card">

          <div className="feature-icon">
            ♥
          </div>

          <h3>COMFORT</h3>

          <p>
            Clothing designed to keep
            you comfortable throughout the day.
          </p>

        </div>


        <div className="feature-card">

          <div className="feature-icon">
            ★
          </div>

          <h3>STYLE</h3>

          <p>
            Modern designs created
            for your everyday wardrobe.
          </p>

        </div>

      </section>


      {/* ================= CTA ================= */}

      <section className="home-cta">

        <div>

          <p>
            YOUR STYLE. YOUR CONFIDENCE.
          </p>

          <h2>
            DISCOVER KUIN
          </h2>

          <Link to="/products">
            SHOP NOW
          </Link>

        </div>

      </section>

    </div>
  );
}

export default Home;