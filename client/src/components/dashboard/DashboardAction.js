import React from "react";
import { Link } from "react-router-dom";

const DashboardAction = ({ id }) => {
  return (
    <div className="dash-buttons">
      {/* <Link to={`/profile/${id}`} className="btn btn-dark">
        <i className="far fa-address-card" /> View Profile
      </Link> */}
      <Link to="/edit-profile" className="btn btn-dark">
        <i className="fas fa-user-circle" /> Edit Profile
      </Link>
      <Link to="/add-experience" className="btn btn-dark">
        <i className="fab fa-black-tie" /> Add Experience
      </Link>
      <Link to="/add-education" className="btn btn-dark">
        <i className="fas fa-graduation-cap" /> Add Education
      </Link>
    </div>
  );
};

export default DashboardAction;
