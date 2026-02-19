import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <Fragment>
      <li className="nav-item">
        <Link className="nav-link nav-link-icon-text" to="/profiles">
          <i className="fas fa-users nav-icon-top" />
          <span>Terps</span>
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link nav-link-icon-text" to="/organizations">
          <i className="fas fa-building nav-icon-top" />
          <span>Organizations</span>
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link nav-link-icon-text" to="/posts">
          <i className="fas fa-comments nav-icon-top" />
          <span>Forum</span>
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link nav-link-icon-text" to="/dashboard">
          <i className="fas fa-th-large nav-icon-top" />
          <span>Dashboard</span>
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link nav-link-icon-text" to="/" onClick={logout}>
          <i className="fas fa-sign-out-alt nav-icon-top" />
          <span>Logout</span>
        </Link>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li className="nav-item">
        <Link className="nav-link nav-link-icon-text" to="/profiles">
          <i className="fas fa-users nav-icon-top" />
          <span>Terps</span>
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link nav-link-icon-text" to="/organizations">
          <i className="fas fa-building nav-icon-top" />
          <span>Organizations</span>
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link nav-link-icon-text" to="/login">
          <i className="fas fa-user nav-icon-top" />
          <span>Login</span>
        </Link>
      </li>
      <li className="nav-item nav-item-register">
        <Link className="nav-btn-register" to="/register">
          Register
        </Link>
      </li>
    </Fragment>
  );

  return (
    <nav className="navbar navbar-expand-lg navbar-custom">
      <div className="container-fluid navbar-container">
        <Link className="navbar-brand navbar-brand-custom" to="/">
          TerpShake
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarMain"
          aria-expanded="false"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarMain">
          <ul className="navbar-nav ml-auto navbar-nav-custom">
            {isAuthenticated ? authLinks : guestLinks}
          </ul>
        </div>
      </div>
    </nav>
  );
};
Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logout }
)(Navbar);
