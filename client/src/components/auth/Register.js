import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: ""
  });

  const { name, email, password, password2 } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Passwords do not match", "danger");
    } else {
      register({ name, email, password });
    }
  };

  //Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className="row mt-3 px-2">
      <div className="col-md-6 mx-auto">
        <div className="card bg-light">
          <div className="card-body">
            <div className="text-center">
              <h1>
                <i class="fas fa-user"></i> Sign Up
              </h1>
            </div>
            <form className="form" onSubmit={e => onSubmit(e)}>
              <label htmlFor="email">Name</label>

              <div className="form-group">
                <input
                  className="form-control input-sm"
                  type="text"
                  name="name"
                  value={name}
                  onChange={e => onChange(e)}
                  // required
                />
              </div>
              <label htmlFor="email">Email</label>
              <div className="form-group">
                <input
                  className="form-control"
                  type="email"
                  name="email"
                  value={email}
                  onChange={e => onChange(e)}
                />
                <small className="form-text"></small>
              </div>
              <label htmlFor="email">Password</label>

              <div className="form-group">
                <input
                  className="form-control"
                  type="password"
                  name="password"
                  minLength="6"
                  value={password}
                  onChange={e => onChange(e)}
                />
              </div>
              <label htmlFor="email">Confirm Password</label>

              <div className="form-group">
                <input
                  className="form-control"
                  type="password"
                  name="password2"
                  minLength="6"
                  value={password2}
                  onChange={e => onChange(e)}
                />
              </div>
              <input
                type="submit"
                className="btn btn-dark btn-block"
                value="Register"
              />
            </form>
            <div className="mt-3 mb-0">
              <span style={{ opacity: ".6" }}>Already have an account?</span>{" "}
              <Link to="/login">Login</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { setAlert, register }
)(Register);
