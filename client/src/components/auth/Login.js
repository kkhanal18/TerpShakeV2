import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    login(email, password);
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome back</h2>
        <p style={styles.subtitle}>Sign in to your account</p>

        <form onSubmit={onSubmit} style={styles.form}>
          <div style={styles.field}>
            <label style={styles.label} htmlFor="email">Email</label>
            <input
              id="email"
              style={styles.input}
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              placeholder="you@example.com"
              onFocus={e => (e.target.style.borderColor = "#0e1111")}
              onBlur={e => (e.target.style.borderColor = "#e0e0e0")}
              required
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label} htmlFor="password">Password</label>
            <div style={styles.passwordWrapper}>
              <input
                id="password"
                style={{ ...styles.input, paddingRight: "3rem" }}
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={onChange}
                placeholder="••••••••"
                minLength="6"
                onFocus={e => (e.target.style.borderColor = "#0e1111")}
                onBlur={e => (e.target.style.borderColor = "#e0e0e0")}
                required
              />
              <button
                type="button"
                style={styles.eyeBtn}
                onClick={() => setShowPassword(v => !v)}
                tabIndex={-1}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`} />
              </button>
            </div>
          </div>

          <button type="submit" style={styles.submitBtn}>
            Sign in
          </button>
        </form>

        <p style={styles.footer}>
          Don't have an account?{" "}
          <Link to="/register" style={styles.link}>Sign up</Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "calc(100vh - 60px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem 1rem",
    backgroundColor: "#fff",
  },
  card: {
    width: "100%",
    maxWidth: "420px",
    padding: "2.5rem",
    border: "1px solid #e8e8e8",
    borderRadius: "12px",
    boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: "1.6rem",
    fontWeight: 700,
    color: "#0e1111",
    margin: "0 0 0.25rem",
  },
  subtitle: {
    fontSize: "0.95rem",
    color: "#777",
    margin: "0 0 2rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1.25rem",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: "0.4rem",
  },
  label: {
    fontSize: "0.875rem",
    fontWeight: 600,
    color: "#333",
  },
  input: {
    width: "100%",
    padding: "0.65rem 0.9rem",
    fontSize: "0.95rem",
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
    outline: "none",
    transition: "border-color 0.15s ease",
    backgroundColor: "#fafafa",
    boxSizing: "border-box",
  },
  passwordWrapper: {
    position: "relative",
  },
  eyeBtn: {
    position: "absolute",
    right: "0.75rem",
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#aaa",
    padding: "0",
    fontSize: "0.9rem",
  },
  submitBtn: {
    marginTop: "0.5rem",
    padding: "0.75rem",
    fontSize: "0.95rem",
    fontWeight: 700,
    color: "#fff",
    backgroundColor: "#0e1111",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background-color 0.15s ease",
    width: "100%",
  },
  footer: {
    marginTop: "1.5rem",
    textAlign: "center",
    fontSize: "0.875rem",
    color: "#777",
  },
  link: {
    color: "#0e1111",
    fontWeight: 600,
    textDecoration: "none",
  },
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
