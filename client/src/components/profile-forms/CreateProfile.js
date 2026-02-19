import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProfile } from "../../actions/profile";
import { Link, withRouter } from "react-router-dom";

const CreateProfile = ({ createProfile, history }) => {
  const [formData, setFormData] = useState({
    company: "",
    website: "",
    location: "",
    status: "",
    skills: "",
    bio: "",
    avatar_link: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    youtube: "",
    instagram: ""
  });

  const [displaySocialInputs, toggleSocialInput] = useState(false);

  const {
    company,
    website,
    location,
    status,
    skills,
    bio,
    avatar_link,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram
  } = formData;

  const onChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history);
  };
  return (
    <div className="row mt-3 mb-5 px-2">
      <div className="col-md-8 mx-auto">
        <div className="card bg-light">
          <div className="card-body">
            <h1>Create Your Profile</h1>
            <small>* = required field</small>
            <form className="form" onSubmit={e => onSubmit(e)}>
              <label htmlFor="status">Status</label>

              <div className="form-group">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Give us an idea of where you are at in your career"
                  value={status}
                  onChange={e => onChange(e)}
                  name="status"
                />

                <small className="form-text"></small>
              </div>
              <div className="form-group">
                <label htmlFor="company">Company</label>

                <input
                  className="form-control"
                  type="text"
                  placeholder=""
                  value={company}
                  onChange={e => onChange(e)}
                  name="company"
                />
              </div>
              <div className="form-group">
                <label htmlFor="website">Website</label>

                <input
                  className="form-control"
                  type="text"
                  placeholder=""
                  value={website}
                  onChange={e => onChange(e)}
                  name="website"
                />
              </div>
              <div className="form-group">
                <label htmlFor="location">Location</label>

                <input
                  className="form-control"
                  type="text"
                  placeholder="City & state suggested (eg. Boston, MA)"
                  value={location}
                  onChange={e => onChange(e)}
                  name="location"
                />
              </div>
              <div className="form-group">
                <label htmlFor="skills">Skills</label>

                <input
                  className="form-control"
                  type="text"
                  placeholder="Please use comma separated values (eg.
                    HTML,CSS,JavaScript,PHP)"
                  value={skills}
                  onChange={e => onChange(e)}
                  name="skills"
                />
                <small className="form-text"></small>
              </div>
              <div className="form-group">
                <label htmlFor="bio">About Me</label>

                <textarea
                  className="form-control"
                  placeholder=""
                  value={bio}
                  onChange={e => onChange(e)}
                  name="bio"
                />
                <small className="form-text">
                  Tell us a little about yourself
                </small>
              </div>
              <div className="form-group">
                <label htmlFor="avatar_link">Avatar Link</label>

                <input
                  className="form-control"
                  type="text"
                  placeholder=""
                  value={avatar_link}
                  onChange={e => onChange(e)}
                  name="avatar_link"
                />
                <small className="form-text">Link to profile image</small>
              </div>
              <div className="my-2">
                <button
                  type="button"
                  onClick={() => toggleSocialInput(!displaySocialInputs)}
                  className="btn btn-dark"
                >
                  Add Social Network Links
                </button>{" "}
                <span>Optional</span>
              </div>
              {displaySocialInputs && (
                <Fragment>
                  <div className="form-group">
                    <i className="fab fa-twitter fa-2x" />{" "}
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Twitter URL"
                      value={twitter}
                      onChange={e => onChange(e)}
                      name="twitter"
                    />
                  </div>
                  <div className="form-group social-input">
                    {" "}
                    <i className="fab fa-facebook fa-2x" />
                    <input
                      type="text"
                      placeholder="Facebook URL"
                      value={facebook}
                      onChange={e => onChange(e)}
                      name="facebook"
                    />
                  </div>
                  <div className="form-group social-input">
                    <i className="fab fa-youtube fa-2x" />
                    <input
                      type="text"
                      placeholder="YouTube URL"
                      value={youtube}
                      onChange={e => onChange(e)}
                      name="youtube"
                    />
                  </div>
                  <div className="form-group social-input">
                    {" "}
                    <i className="fab fa-linkedin fa-2x" />
                    <input
                      type="text"
                      placeholder="Linkedin URL"
                      value={linkedin}
                      onChange={e => onChange(e)}
                      name="linkedin"
                    />
                  </div>
                  <div className="form-group social-input">
                    {" "}
                    <i className="fab fa-instagram fa-2x" />
                    <input
                      type="text"
                      placeholder="Instagram URL"
                      value={instagram}
                      onChange={e => onChange(e)}
                      name="instagram"
                    />
                  </div>
                </Fragment>
              )}
              <input type="submit" className="btn btn-primary my-1" />
              <Link className="btn btn-light my-1" to="/dashboard">
                Go Back
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired
};
export default connect(
  null,
  { createProfile }
)(withRouter(CreateProfile));
