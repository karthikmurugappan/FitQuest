import React from "react";
import { Link } from 'react-router-dom';
// Not sure we need this page. - Dave

const LandingPage = () => {
  return (
    <div className="rpgui-content">
      <header className="hero">
        <div className="hero-content">
          <h1>Welcome to FitQuest</h1>
          <p>Start Your Fitness Journey Now</p>
          <Link to="/signup">
            <button className="rpgui-button text-center py-3">Get Started</button>
          </Link>
        </div>
      </header>

      <section className="features">
        <div className="feature">
          <h2>Pick Your Training</h2>
          <p>Pick what you want to train in</p>
        </div>
        <div className="feature">
          <h2>Grow Your Stats</h2>
          <p>See your stats grow in real time</p>
        </div>
        <div className="feature">
          <h2>Get Results</h2>
          <p>See your hardwork pay off in the real world</p>
        </div>
      </section>

      <section className="cta-section">
        <h2>Already have an account?</h2>
        <Link to="/login">
            <button className="rpgui-button text-center py-3">Login</button>
          </Link>
      </section>
    </div>
  );
};

export default LandingPage;