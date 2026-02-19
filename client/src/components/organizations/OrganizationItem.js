import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const OrganizationItem = ({ org: { name, description, members, tags, avatar }, isAuthenticated }) => {
  const [joining, setJoining] = useState(false);
  const [joined, setJoined] = useState(false);
  const [showAuthMsg, setShowAuthMsg] = useState(false);

  const handleJoin = () => {
    if (!isAuthenticated) {
      setShowAuthMsg(true);
      setTimeout(() => setShowAuthMsg(false), 2000);
      return;
    }

    if (joined) return;

    setJoining(true);
    // Simulate join request (replace with real API call when available)
    setTimeout(() => {
      setJoining(false);
      setJoined(true);
    }, 1500);
  };

  return (
    <div className="profile bg-light" style={{ position: "relative" }}>
      <img src={avatar} alt={name} className="round-img" />
      <div>
        <h2>{name}</h2>
        <p>{description}</p>
        <div>
          {tags.map((tag, i) => (
            <span key={i} className="badge badge-secondary mr-1">
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="text-center">
        <p>
          <strong>{members}</strong> members
        </p>
        <button
          className={`btn ${joined ? "btn-success" : "btn-danger"}`}
          onClick={handleJoin}
          disabled={joining || joined}
        >
          {joining ? (
            <>
              <i className="fas fa-spinner fa-spin mr-1"></i> Joining...
            </>
          ) : joined ? (
            "Joined"
          ) : (
            "Join"
          )}
        </button>
        {showAuthMsg && (
          <p
            className="text-danger mt-1"
            style={{
              fontSize: "0.85rem",
              animation: "fadeOut 2s forwards"
            }}
          >
            Please sign in to join
          </p>
        )}
      </div>
      <style>{`
        @keyframes fadeOut {
          0% { opacity: 1; }
          60% { opacity: 1; }
          100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
};

OrganizationItem.propTypes = {
  org: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(OrganizationItem);
