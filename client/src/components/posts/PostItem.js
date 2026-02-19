import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";
import { addLike, removeLike, deletePost } from "../../actions/post";
import { getProfileById } from "../../actions/profile";

const PostItem = ({
  addLike,
  removeLike,
  deletePost,
  auth,
  post: { _id, text, name, avatar, user, likes, comments, date },
  showActions,
  getProfileById
}) => {
  return (
    <div className="card rounded-top my-3">
      <div className="card-body mx-0">
        <div className="row">
          <div className="col">
            <Link to={`/profile/${user}`} style={{ color: "black" }}>
              {name}
            </Link>{" "}
            <br />
            <span style={{ opacity: 0.5 }}>
              <Moment format="MM/DD/YYYY">{date}</Moment>
            </span>
          </div>
          <div className="col-10">
            {text}
            <br />

            <div>
              <Link to={`/posts/${_id}`} className="btn btn-small btn-primary">
                Replies{" "}
                {comments.length > 0 && (
                  <span className="badge badge-light">{comments.length}</span>
                )}
              </Link>{" "}
              {!auth.loading && user === auth.user._id && (
                <button
                  onClick={() => deletePost(_id)}
                  type="button"
                  className="btn btn-small btn-danger"
                >
                  <i className="fas fa-times" />
                </button>
              )}
              {showActions && (
                <Fragment>
                  {" "}
                  <button
                    onClick={() => addLike(_id)}
                    type="button"
                    className="btn btn-dark"
                  >
                    <i className="far fa-thumbs-up" />{" "}
                    <span>
                      {likes.length > 0 && <span>{likes.length}</span>}
                    </span>
                  </button>
                  <span> </span>
                  <button
                    onClick={() => removeLike(_id)}
                    type="button"
                    className="btn btn-dark"
                  >
                    <i className="far fa-thumbs-down" />
                  </button>
                </Fragment>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  showActions: PropTypes.bool,
  getProfileById: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addLike, removeLike, deletePost, getProfileById }
)(PostItem);
