import React, { Fragment, Component } from "react";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";

class NavBar extends Component {
  state = {
    isAuthenticated: false
  };

  static getDerivedStateFromProps(props, state) {
    const { auth } = props;

    if (auth.uid) {
      return { isAuthenticated: true };
    } else {
      return { isAuthenticated: false };
    }
  }

  onLogoutClick = e => {
    e.preventDefault();

    const { firebase } = this.props;
    firebase.logout();
  };

  render() {
    const { isAuthenticated } = this.state;
    const { auth } = this.props;

    return (
      <nav
        className="navbar navbar-expand-sm navbar-dark"
        style={{ "background-color": "#ff4f42" }}
      >
        <div className="container">
          <Link className="navbar-brand" to="/">
            <i className="fas fa-laptop m0" /> Portal
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarMain"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="navbar-collapse" id="navbarMain">
            <ul className="navbar-nav mr-auto">
              {isAuthenticated ? (
                <Fragment>
                  <li className="nav-item">
                    <Link className="nav-link" to="/profiles">
                      Terps
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/posts">
                      Forum
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/dashboard">
                      {/* <i className="fas fa-user" /> */}
                      Dashboard
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      onClick={this.onLogoutClick}
                      to="/"
                    >
                      {/* <i className="fas fa-sign-out-alt" /> */}
                      {"  "}
                      Logout
                    </Link>
                  </li>
                </Fragment>
              ) : (
                <Fragment>
                  <li className="nav-item">
                    <Link className="nav-link" to="/profiles">
                      Terps
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">
                      Register
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </li>
                </Fragment>
              )}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

//   <nav className="navbar navbar-expand-md navbar-dark bg-primary mb-4">
//     <div className="container">
//       <Link to="/" className="navbar-brand">
//         ClientPanel
//       </Link>
//       <button
//         className="navbar-toggler"
//         type="button"
//         data-toggle="collapse"
//         data-target="#navbarMain"
//       >
//         <span className="navbar-toggler-icon" />
//       </button>
//       <div className="collapse navbar-collapse" id="navbarMain">
//         <ul className="navbar-nav mr-auto">
//           {isAuthenticated ? (
//             <li className="nav-item">
//               <Link to="/" className="nav-link">
//                 Dashboard
//               </Link>
//             </li>
//           ) : null}
//         </ul>
//         {isAuthenticated ? (
//           <ul className="navbar-nav ml-auto">
//             <li className="nav-item">
//               <a href="#!" className="nav-link">
//                 {auth.email}
//               </a>
//             </li>
//             <li className="nav-item">
//               <Link to="/settings" className="nav-link">
//                 Settings
//               </Link>
//             </li>
//             <li className="nav-item">
//               <a
//                 href="#!"
//                 className="nav-link"
//                 onClick={this.onLogoutClick}
//               >
//                 Logout
//               </a>
//             </li>
//           </ul>
//         ) : null}

//         {!isAuthenticated ? (
//           <ul className="navbar-nav ml-auto">
//             <li className="nav-item">
//               <Link to="/login" className="nav-link">
//                 Login
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link to="/register" className="nav-link">
//                 Register
//               </Link>
//             </li>
//           </ul>
//         ) : null}
//       </div>
//     </div>
//   </nav>
// );

// NavBar.propTypes = {
//   firebase: PropTypes.object.isRequired,
//   auth: PropTypes.object.isRequired
//   // notify: PropTypes.object.isRequired,
//   // notifyUser: PropTypes.func.isRequired
// };

// export default compose(
//   firebaseConnect(),
//   connect((state, props) => ({
//     auth: state.firebase.auth
//   }))
// )(NavBar);
