import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

function AdminLogin() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAdminLogin = (e) => {

    e.preventDefault();

    if (!email || !password) {
      alert("Please enter admin email and password.");
      return;
    }

    // Temporary admin login
    // Real authentication will be connected
    // with Spring Boot + MySQL later.

    if (
      email === "admin@kuin.com" &&
      password === "admin123"
    ) {
      alert("Admin login successful!");
      navigate("/admin/dashboard");
    } else {
      alert("Invalid admin email or password.");
    }
  };


  return (

    <div className="admin-login-page">

      <div className="admin-login-container">

        <div className="admin-login-header">

          <p>KUIN ADMIN</p>

          <h1>KUIN</h1>

          <span>
            Shop Owner Dashboard
          </span>

        </div>


        <form
          className="admin-login-form"
          onSubmit={handleAdminLogin}
        >

          <h2>ADMIN LOGIN</h2>


          <div className="admin-login-field">

            <label>
              Admin Email
            </label>

            <input
              type="email"
              placeholder="Enter admin email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

          </div>


          <div className="admin-login-field">

            <label>
              Password
            </label>

            <input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

          </div>


          <button
            type="submit"
            className="admin-login-submit"
          >
            LOGIN AS ADMIN
          </button>

        </form>

      </div>

    </div>
  );
}

export default AdminLogin;