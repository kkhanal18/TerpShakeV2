import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import LandingTop from "../landing/LandingTop";
import Features from "../landing/Features";

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <div className="landing">
      <div className="landing-content">
        <div className="landing-text">
          <h1>Start your career path right.</h1>
          <p>
            Search for jobs. Setup a profile to impress employers. And get help
            from UMD students and alumni.
          </p>
          <Link to="/register" className="btn btn-danger rounded-pill">
            Get Started <i className="fas fa-arrow-right ml-1" />
          </Link>
        </div>
        <div className="landing-image">
          <img src={require("../../img/showcase_cp.jpg")} alt="TerpShake" />
        </div>
      </div>
    </div>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);
