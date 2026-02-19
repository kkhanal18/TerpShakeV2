import React from "react";
import PropTypes from "prop-types";

const ProfileTop = ({
  profile: {
    status,
    company,
    location,
    website,
    social,
    user: { name, avatar },
    avatar_link
  }
}) => {
  return (
    <div className="profile-top mt-2">
      <img className="profile-img my-2" src={avatar_link} alt="" />
      <h1 className="large">{name}</h1>
      <p className="lead">
        {status} {company && <span> at {company}</span>}
        <p className="mb-0">{location && <span>{location}</span>}</p>
      </p>
    </div>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileTop;
