import "./ownerDashboard.css";

export default function OwnerDashboard() {
  return (
    <div className="owner-dashboard">

      {/* SIDEBAR */}
      <aside className="sidebar">
        <h2 className="logo">RentEasy</h2>
        <nav>
          <a className="active">Dashboard</a>
          <a>My Properties</a>
          <a>Requests</a>
          <a>Messages</a>
          <a>Profile</a>
          <a className="logout">Logout</a>
        </nav>
      </aside>

      {/* MAIN */}
      <main className="dashboard-main">

        {/* TOP BAR */}
        <header className="dashboard-header">
          <div>
            <h1>Welcome back, Owner 👋</h1>
            <p>Manage your listings and property requests</p>
          </div>

          <button className="btn-primary">
            + Request New Property
          </button>
        </header>

        {/* STATS */}
        <section className="stats-grid">
          <div className="stat-card">
            <h3>12</h3>
            <p>Total Properties</p>
          </div>
          <div className="stat-card">
            <h3>8</h3>
            <p>Active Listings</p>
          </div>
          <div className="stat-card">
            <h3>3</h3>
            <p>Pending Requests</p>
          </div>
          <div className="stat-card">
            <h3>₹1.2L</h3>
            <p>Monthly Earnings</p>
          </div>
        </section>

        {/* PROPERTIES */}
        <section className="properties-section">
          <h2>My Properties</h2>

          <div className="property-grid">

            <div className="property-card">
              <img src="https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80" />
              <div className="property-info">
                <h4>2 BHK Apartment</h4>
                <p>Whitefield, Bangalore</p>
                <span>₹18,000 / month</span>
              </div>
              <div className="property-actions">
                <button className="view">View</button>
                <button className="delete">Delete</button>
              </div>
            </div>

            <div className="property-card">
              <img src="https://images.unsplash.com/photo-1572120360610-d971b9d7767c?auto=format&fit=crop&w=800&q=80" />
              <div className="property-info">
                <h4>Luxury Villa</h4>
                <p>Indiranagar</p>
                <span>₹45,000 / month</span>
              </div>
              <div className="property-actions">
                <button className="view">View</button>
                <button className="delete">Delete</button>
              </div>
            </div>

          </div>
        </section>

      </main>
    </div>
  );
}
