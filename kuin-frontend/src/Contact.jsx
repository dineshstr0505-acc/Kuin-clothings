import "./Contact.css";

function Contact() {
  return (
    <div className="contact-page">

      {/* HERO */}
      <section className="contact-hero">
        <p>GET IN TOUCH</p>
        <h1>CONTACT US</h1>
        <span>We would love to hear from you.</span>
      </section>


      {/* CONTACT SECTION */}
      <section className="contact-section">

        <div className="contact-container">

          {/* CONTACT INFORMATION */}
          <div className="contact-info">

            <p className="contact-label">KUIN WOMEN'S CLOTHING</p>

            <h2>
              WE'RE HERE
              <br />
              TO HELP.
            </h2>

            <p className="contact-description">
              Have a question about our products, orders or delivery?
              Get in touch with us and our team will be happy to help.
            </p>


            <div className="contact-details">

              <div className="contact-detail">
                <div className="contact-icon">📞</div>

                <div>
                  <h3>PHONE</h3>
                  <p>+91 81228 01679</p>
                </div>
              </div>


              <div className="contact-detail">
                <div className="contact-icon">✉</div>

                <div>
                  <h3>EMAIL</h3>
                  <p>info@kuin.com</p>
                </div>
              </div>


              <div className="contact-detail">
                <div className="contact-icon">📍</div>

                <div>
                  <h3>ADDRESS</h3>
                  <p>Coimbatore,Tamil Nadu, India</p>
                </div>
              </div>

            </div>

          </div>


          {/* CONTACT FORM */}
          <div className="contact-form-container">

            <h2>SEND US A MESSAGE</h2>

            <form
              className="contact-form"
              onSubmit={(e) => {
                e.preventDefault();
                alert("Thank you! Your message has been submitted.");
              }}
            >

              <div className="contact-field">
                <label>Your Name</label>

                <input
                  type="text"
                  placeholder="Enter your name"
                  required
                />
              </div>


              <div className="contact-field">
                <label>Email Address</label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  required
                />
              </div>


              <div className="contact-field">
                <label>Phone Number</label>

                <input
                  type="tel"
                  placeholder="Enter your phone number"
                />
              </div>


              <div className="contact-field">
                <label>Message</label>

                <textarea
                  placeholder="Write your message..."
                  rows="6"
                  required
                ></textarea>
              </div>


              <button type="submit" className="contact-submit">
                SEND MESSAGE
              </button>

            </form>

          </div>

        </div>

      </section>


      {/* CTA */}
      <section className="contact-cta">

        <p>KUIN WOMEN'S CLOTHING</p>

        <h2>
          STYLE THAT MAKES
          <br />
          YOU CONFIDENT.
        </h2>

      </section>

    </div>
  );
}

export default Contact;