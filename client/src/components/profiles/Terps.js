import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "../tools/Spinner";
import ProfileItem from "./ProfileItem";
import { getProfiles } from "../../actions/profile";

const Terps = ({ getProfiles, profile: { profiles, loading }, auth }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  if (!auth.loading && !auth.isAuthenticated) {
    return (
      <div>
        <h2 style={{ color: "#000", fontWeight: 800, marginTop: "2rem" }}>Terps</h2>
        <p className="lead">Browse and connect with UMD students and alumni</p>
        <div
          className="bg-light p-5 text-center"
          style={{ borderRadius: "8px", marginTop: "2rem" }}
        >
          <i
            className="fas fa-lock"
            style={{ fontSize: "3rem", color: "#e03434", marginBottom: "1rem" }}
          />
          <h2 className="mt-3">Login Required</h2>
          <p className="lead mt-2">
            You need to be logged in to browse Terps.
          </p>
          <div className="mt-4">
            <Link to="/login" className="btn btn-danger mr-2">
              Login
            </Link>
            <Link to="/register" className="btn btn-light">
              Register
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <div className="mt-3">
          <h2 style={{ textAlign: "right", color: "#000", fontWeight: 800 }}>Terps</h2>
          <p style={{ textAlign: "right" }}>
            <i className="far fa-list-alt" /> Browse and connect with UMD
            students and alumni
          </p>
          <div className="profiles">
            {profiles.length > 0 ? (
              profiles.map(profile => (
                <ProfileItem key={profile._id} profile={profile} />
              ))
            ) : (
              <h4>No profiles found...</h4>
            )}
          </div>
        </div>
      )}
    </Fragment>
  );
};

Terps.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getProfiles }
)(Terps);
