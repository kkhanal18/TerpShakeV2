import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    login(email, password);
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
            {/* 
      
         */}
            <div className="text-center">
              <h1>
                <i class="fas fa-sign-in-alt"></i> Login
              </h1>
            </div>
            <form className="form-signin" onSubmit={e => onSubmit(e)}>
              <label htmlFor="email">Email</label>

              <div className="form-group">
                <input
                  className="form-control"
                  type="email"
                  // placeholder="Email Address"
                  name="email"
                  value={email}
                  onChange={e => onChange(e)}
                />
              </div>
              <label htmlFor="password">Password</label>

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

              <input
                type="submit"
                className="btn btn-dark btn-block"
                value="Login"
              />
            </form>
            <div className="mt-3 mb-0">
              <span style={{ opacity: ".6" }}>Don't have an account?</span>{" "}
              <Link to="/register">Sign Up</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { login }
)(Login);
