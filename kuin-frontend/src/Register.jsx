import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Register.css";

function Register() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  const handleRegister = (e) => {

    e.preventDefault();


    if (
      !name ||
      !email ||
      !phone ||
      !password ||
      !confirmPassword
    ) {
      alert("Please fill all fields.");
      return;
    }


    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }


    // Real registration will be connected
    // to Spring Boot + MySQL later

    alert("Account created successfully!");

    navigate("/login");

  };


  return (

    <div className="register-page">

      <div className="register-container">


        {/* Header */}

        <div className="register-header">

          <p>JOIN</p>

          <h1>KUIN</h1>

          <span>
            Create your account
          </span>

        </div>


        {/* Form */}

        <form
          className="register-form"
          onSubmit={handleRegister}
        >

          <h2>
            CREATE ACCOUNT
          </h2>


          {/* Name */}

          <div className="register-field">

            <label>
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

          </div>


          {/* Email */}

          <div className="register-field">

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


          {/* Phone */}

          <div className="register-field">

            <label>
              Phone Number
            </label>

            <input
              type="tel"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

          </div>


          {/* Password */}

          <div className="register-field">

            <label>
              Password
            </label>

            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

          </div>


          {/* Confirm Password */}

          <div className="register-field">

            <label>
              Confirm Password
            </label>

            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
            />

          </div>


          <button
            type="submit"
            className="register-submit"
          >
            CREATE ACCOUNT
          </button>


          <p className="login-text">

            Already have an account?

            <Link to="/login">
              Login
            </Link>

          </p>

        </form>

      </div>

    </div>

  );
}

export default Register;