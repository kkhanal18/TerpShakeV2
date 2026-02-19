import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import { deleteComment } from "../../actions/post";

const CommentItem = ({
  postId,
  comment: { _id, text, name, avatar, user, date },
  auth,
  deleteComment,
  avatar_link
}) => (
  <div className="card rounded-top my-3">
    <div className="card-body">
      <div className="row">
        <div className="col">
          <p className="post-date">
            <Link to={`/profile/${user}`}>{name}</Link>
            <br />
            <span style={{ opacity: ".6" }}>
              <Moment format="MM/DD/YYYY">{date}</Moment>
            </span>
          </p>
        </div>
        <p className="col-10">{text}</p>
        <div className="col">
          {!auth.loading && user === auth.user._id && (
            <span>
              {" "}
              <button
                onClick={() => deleteComment(postId, _id)}
                type="button"
                className="btn btn-sm btn-danger"
              >
                <i className="fas fa-times" />
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  </div>
);

CommentItem.propTypes = {
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteComment }
)(CommentItem);
