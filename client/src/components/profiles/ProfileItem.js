import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ProfileItem = ({
  profile: {
    user: { _id, name },
    status,
    company,
    location,
    skills,
    avatar_link
  }
}) => {
  return (
    <div className="profile bg-light">
      <img className="round-img" src={avatar_link} />
      <div>
        <h2>{name}</h2>
        <p>
          <b>{status}</b>
          {company && <span> at {company}</span>}
          <br />
          {location && <span>{location}</span>}
        </p>
      </div>
      <div>
        <div>
          <Link to={`/profile/${_id}`} className="btn btn-dark">
            View Profile{" "}
            <i class="fa fa-chevron-circle-right" aria-hidden="true" />
          </Link>
        </div>
        <br />
        <div>
          <b>Areas of Expertise</b>
          <div>
            {skills.slice(0, 4).map((skill, index) => (
              <span key={index} style={{ color: "black" }}>
                <div className="badge badge-secondary">{skill}</div>&nbsp;
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
