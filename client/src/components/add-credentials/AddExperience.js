import React, { Fragment, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addExperience } from "../../actions/profile";

const AddExperience = ({ addExperience, history }) => {
  const [formData, setFormData] = useState({
    company: "",
    title: "",
    location: "",
    from: "",
    to: "",
    current: false,
    description: ""
  });

  const [toDateDisabled, toggledDisabled] = useState(false);

  const { company, title, location, from, to, current, description } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="mt-3">
      <section class="container">
        <h1>Add An Experience</h1>
        <p class="lead">
          <i class="fas fa-code-branch" /> Add any jobs/internships that you
          have had in the past
        </p>
        <small>* = required field</small>
        <form
          className="form"
          onSubmit={e => {
            e.preventDefault();
            addExperience(formData, history);
          }}
        >
          <div class="form-group">
            <input
              className="form-control"
              type="text"
              placeholder="* Job Title"
              name="title"
              required
              value={title}
              onChange={e => onChange(e)}
            />
          </div>
          <div class="form-group">
            <input
              className="form-control"
              type="text"
              placeholder="* Company"
              name="company"
              required
              value={company}
              onChange={e => onChange(e)}
            />
          </div>
          <div class="form-group">
            <input
              className="form-control"
              type="text"
              placeholder="Location"
              name="location"
              value={location}
              onChange={e => onChange(e)}
            />
          </div>
          <div class="form-group">
            <h4>From Date</h4>
            <p>
              <input
                className="form-control"
                type="date"
                name="from"
                value={from}
                // checked={current}
                onChange={e => onChange(e)}
              />{" "}
            </p>
          </div>
          <div class="form-group">
            <p>
              <input
                // className="form-check-input"
                type="checkbox"
                name="current"
                id="currentCheck"
                onChange={e => {
                  setFormData({
                    ...formData,
                    current: !current
                  });
                  toggledDisabled(!toDateDisabled);
                }}
              />{" "}
              <label className="form-check-label" for="currentCheck">
                Current
              </label>
            </p>
          </div>
          <div class="form-group">
            <h4>To Date</h4>
            <input
              className="form-control"
              type="date"
              name="to"
              value={to}
              onChange={e => onChange(e)}
              disabled={toDateDisabled ? "disabled" : ""}
            />
          </div>
          <div class="form-group">
            <textarea
              className="form-control"
              name="description"
              cols="30"
              rows="5"
              placeholder="Job Description"
              value={description}
              onChange={e => onChange(e)}
            />
          </div>
          <input type="submit" class="btn btn-primary my-1" />

          <Link className="btn btn-light" to="/dashboard">
            Go back
          </Link>
        </form>
      </section>
    </div>
  );
};

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired
};

export default connect(
  null,
  { addExperience }
)(AddExperience);
