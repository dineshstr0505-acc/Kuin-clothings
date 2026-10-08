import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Login.css";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {

    e.preventDefault();

    // Temporary frontend login
    // Real authentication will be added with Spring Boot later

    if (!email || !password) {
      alert("Please enter email and password.");
      return;
    }

    alert("Login successful!");

    navigate("/products");
  };


  return (

    <div className="login-page">

      <div className="login-container">

        <div className="login-header">

          <p>WELCOME TO</p>

          <h1>KUIN</h1>

          <span>
            Women's Clothing
          </span>

        </div>


        <form
          className="login-form"
          onSubmit={handleLogin}
        >

          <h2>
            LOGIN
          </h2>


          <div className="login-field">

            <label>
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

          </div>


          <div className="login-field">

            <label>
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

          </div>


          <button
            type="submit"
            className="login-submit"
          >
            LOGIN
          </button>


          <p className="register-text">

            Don't have an account?

            <Link to="/register">
              Create Account
            </Link>

          </p>

        </form>

      </div>

    </div>

  );
}

export default Login;