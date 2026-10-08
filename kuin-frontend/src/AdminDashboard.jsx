import { Link, useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

function AdminDashboard() {

  const navigate = useNavigate();

  const handleLogout = () => {
    alert("Admin logged out.");
    navigate("/admin/login");
  };

  return (
    <div className="admin-dashboard">

      {/* ================= HEADER ================= */}

      <header className="admin-header">

        <div className="admin-brand">
          <h1>KUIN</h1>
          <span>ADMIN PANEL</span>
        </div>

        <div className="admin-header-right">

          <span>Shop Owner</span>

          <button onClick={handleLogout}>
            LOGOUT
          </button>

        </div>

      </header>


      {/* ================= DASHBOARD ================= */}

      <main className="admin-main">

        <div className="admin-welcome">

          <div>
            <p>WELCOME BACK</p>

            <h2>
              KUIN ADMIN DASHBOARD
            </h2>

            <span>
              Manage your products and shop.
            </span>
          </div>

        </div>


        {/* ================= STATS ================= */}

        <section className="admin-stats">

          <div className="admin-stat-card">
            <span>PRODUCTS</span>
            <strong>6</strong>
          </div>

          <div className="admin-stat-card">
            <span>ORDERS</span>
            <strong>0</strong>
          </div>

          <div className="admin-stat-card">
            <span>CUSTOMERS</span>
            <strong>0</strong>
          </div>

          <div className="admin-stat-card">
            <span>LOW STOCK</span>
            <strong>0</strong>
          </div>

        </section>


        {/* ================= MANAGEMENT ================= */}

        <section className="admin-management">

          <div className="admin-section-heading">

            <div>
              <p>SHOP MANAGEMENT</p>

              <h2>
                MANAGE YOUR STORE
              </h2>
            </div>

          </div>


          <div className="admin-management-grid">

            {/* PRODUCTS */}

            <Link
              to="/admin/products"
              className="admin-management-card"
            >

              <div className="management-icon">
                📦
              </div>

              <h3>
                PRODUCT MANAGEMENT
              </h3>

              <p>
                Add new products, edit existing products,
                remove products and manage stock.
              </p>

              <span>
                MANAGE PRODUCTS →
              </span>

            </Link>


            {/* ORDERS */}

            <div className="admin-management-card">

              <div className="management-icon">
                🛍️
              </div>

              <h3>
                ORDER MANAGEMENT
              </h3>

              <p>
                View customer orders and manage
                order status and deliveries.
              </p>

              <span>
                COMING SOON
              </span>

            </div>


            {/* CUSTOMERS */}

            <div className="admin-management-card">

              <div className="management-icon">
                👥
              </div>

              <h3>
                CUSTOMER MANAGEMENT
              </h3>

              <p>
                View registered customers and
                manage customer information.
              </p>

              <span>
                COMING SOON
              </span>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default AdminDashboard;