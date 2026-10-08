import { Link } from "react-router-dom";
import "./About.css";

function About() {
  return (
    <div className="about-page">

      {/* Hero */}

      <section className="about-hero">

        <div>
          <p>ABOUT KUIN</p>

          <h1>
            STYLE.
            <br />
            COMFORT.
            <br />
            CONFIDENCE.
          </h1>

          <span>
            Clothing designed for the modern woman.
          </span>
        </div>

      </section>


      {/* About Content */}

      <section className="about-main">

        <div className="about-text">

          <p className="about-label">
            OUR STORY
          </p>

          <h2>
            FASHION MADE FOR
            <br />
            EVERYDAY LIFE
          </h2>

          <p>
            KUIN Women's Clothing is a clothing brand
            focused on bringing stylish, comfortable and
            quality clothing to women.
          </p>

          <p>
            We carefully select our collections with
            everyday comfort and modern style in mind.
            From comfortable leggings to stylish
            shimmer collections, our goal is to help
            every woman feel confident in what she wears.
          </p>

          <p>
            At KUIN, we believe fashion should not only
            look good but also feel good.
          </p>

          <Link to="/products" className="about-shop-btn">
            EXPLORE OUR COLLECTION
          </Link>

        </div>

      </section>


      {/* Values */}

      <section className="about-values">

        <div className="about-value">

          <div className="value-icon">
            ✓
          </div>

          <h3>QUALITY</h3>

          <p>
            We focus on providing clothing with
            quality materials and comfortable designs.
          </p>

        </div>


        <div className="about-value">

          <div className="value-icon">
            ♥
          </div>

          <h3>COMFORT</h3>

          <p>
            Our collections are selected to make
            everyday dressing comfortable and easy.
          </p>

        </div>


        <div className="about-value">

          <div className="value-icon">
            ★
          </div>

          <h3>STYLE</h3>

          <p>
            Modern designs that help you express
            your own personal style.
          </p>

        </div>

      </section>


      {/* CTA */}

      <section className="about-cta">

        <p>
          FIND YOUR PERFECT STYLE
        </p>

        <h2>
          DISCOVER THE KUIN COLLECTION
        </h2>

        <Link to="/products">
          SHOP NOW
        </Link>

      </section>

    </div>
  );
}

export default About;