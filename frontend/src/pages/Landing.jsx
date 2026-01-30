import { Link } from "react-router-dom";
import "./landing.css";

export default function Landing() {
  return (
    <div className="landing-root">

      {/* HEADER */}
      <header className="landing-header">
        <div className="brand">RentEasy</div>
        <nav className="nav">
          <a href="#features">Features</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
          <Link to="/login" className="btn-link">Login</Link>
          <Link to="/register" className="btn-primary">Get Started</Link>
        </nav>
      </header>

      {/* HERO */}
      <section className="hero">
        <div className="hero-glass">
          <h1>
            Find your next home <span>without stress</span>
          </h1>
          <p>
            Discover verified rental properties, connect with owners,
            and manage everything digitally — faster than ever.
          </p>

          <div className="hero-actions">
            <Link to="/register" className="btn-primary large">
              Start Exploring
            </Link>
            <Link to="/login" className="btn-outline">
              I’m an Owner
            </Link>
          </div>
        </div>

        <div className="hero-visual">
          <img
            src="https://images.unsplash.com/photo-1572120360610-d971b9d7767c?auto=format&fit=crop&w=800&q=80"
            alt="Modern rental home"
          />
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="features">
        <h2>Why choose RentEasy?</h2>

        <div className="feature-grid">
          <div className="feature-card">
            🔒
            <h3>Secure Platform</h3>
            <p>Verified users and protected data.</p>
          </div>

          <div className="feature-card">
            ⚡
            <h3>Fast Search</h3>
            <p>Find homes instantly by filters.</p>
          </div>

          <div className="feature-card">
            🏠
            <h3>Owner Friendly</h3>
            <p>List and manage properties easily.</p>
          </div>

          <div className="feature-card">
            💳
            <h3>Paperless</h3>
            <p>Apply and manage rentals online.</p>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="stats">
        <div>
          <h3>10K+</h3>
          <p>Listings</p>
        </div>
        <div>
          <h3>25K+</h3>
          <p>Tenants</p>
        </div>
        <div>
          <h3>5K+</h3>
          <p>Owners</p>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <h2>List your property today</h2>
        <p>Reach thousands of tenants looking for homes.</p>
        <Link to="/register" className="btn-primary large">
          List My Property
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="landing-footer">
        <p>© {new Date().getFullYear()} RentEasy. All rights reserved.</p>
      </footer>

    </div>
  );
}
