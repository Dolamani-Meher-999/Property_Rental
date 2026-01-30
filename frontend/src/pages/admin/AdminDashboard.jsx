import "./adminDashboard.css";

export default function AdminDashboard() {
  return (
    <div className="admin-dashboard">

      {/* SIDEBAR */}
      <aside className="admin-sidebar">
        <h2 className="logo">RentEasy</h2>
        
        <nav>
          <a className="active">Dashboard</a>
          <a>Property Requests</a>
          <a>All Properties</a>
          <a>Owners</a>
          <a>Messages</a>
          <a className="logout">Logout</a>
        </nav>
      </aside>

      {/* MAIN */}
      <main className="admin-main">

        {/* HEADER */}
        <header className="admin-header">
          <div>
            <h1>Admin Dashboard</h1>
            <p>Manage property approvals and owners</p>
          </div>
        </header>

        {/* STATS */}
        <section className="admin-stats">
          <div className="stat-card">
            <h3>128</h3>
            <p>Total Properties</p>
          </div>
          <div className="stat-card">
            <h3>14</h3>
            <p>Pending Requests</p>
          </div>
          <div className="stat-card">
            <h3>46</h3>
            <p>Owners</p>
          </div>
          <div className="stat-card">
            <h3>312</h3>
            <p>Active Tenants</p>
          </div>
        </section>

        {/* PROPERTY REQUESTS */}
        <section className="admin-section">
          <h2>Pending Property Requests</h2>

          <div className="request-grid">

            <div className="request-card">
              <img
                src="https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80"
                alt="property"
              />
              <div className="request-info">
                <h4>2 BHK Apartment</h4>
                <p>Whitefield, Bangalore</p>
                <span>Owner: Rahul Sharma</span>
              </div>
              <div className="request-actions">
                <button className="approve">Approve</button>
                <button className="reject">Reject</button>
              </div>
            </div>

            <div className="request-card">
              <img
                src="https://images.unsplash.com/photo-1572120360610-d971b9d7767c?auto=format&fit=crop&w=800&q=80"
                alt="property"
              />
              <div className="request-info">
                <h4>Luxury Villa</h4>
                <p>Indiranagar</p>
                <span>Owner: Ankit Verma</span>
              </div>
              <div className="request-actions">
                <button className="approve">Approve</button>
                <button className="reject">Reject</button>
              </div>
            </div>

          </div>
        </section>

        {/* CHAT PREVIEW */}
        <section className="admin-section">
          <h2>Owner Messages</h2>

          <div className="chat-box">
            <div className="chat-item">
              <strong>Rahul Sharma</strong>
              <p>Requesting approval for my new listing.</p>
            </div>
            <div className="chat-item">
              <strong>Ankit Verma</strong>
              <p>Please review my villa property.</p>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
