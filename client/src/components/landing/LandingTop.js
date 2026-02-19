import React from "react";

import { Link, Redirect } from "react-router-dom";

const LandingTop = () => {
  return (
    <div className="mt-3">
      <div className="card" style={{ width: "25%" }}>
        <div className="card-body">
          <p className="card-text">
            <i class="far fa-check-square"></i> Search for jobs on job board
          </p>
          <p className="card-text">
            <i class="far fa-check-square"></i> Setup up portfolio to impress
            employeers
          </p>
          <p className="card-text">
            <i class="far fa-check-square"></i> Get help from other UMD students
            and alumni
          </p>
          <Link to="/register" className="btn btn-dark rounded-pill">
            Get Started <i className="fas fa-arrow-right ml-1" />
          </Link>
        </div>
      </div>
      <div></div>
      {/* <h3>Job search made easy</h3>
      
      {/* <Link to="/login" className="btn btn-light">
        Login
      </Link> */}
    </div>
  );
};

export default LandingTop;
