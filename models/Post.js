const db = require("../db/database");

function buildPost(row) {
  if (!row) return null;

  const likes = db
    .prepare("SELECT id, user_id AS user FROM likes WHERE post_id = ?")
    .all(row.id);

  const comments = db
    .prepare("SELECT * FROM comments WHERE post_id = ? ORDER BY rowid DESC")
    .all(row.id)
    .map(c => ({
      _id: c.id,
      user: c.user_id,
      text: c.text,
      name: c.name,
      avatar: c.avatar,
      date: c.date
    }));

  return {
    _id: row.id,
    user: row.user_id,
    text: row.text,
    name: row.name,
    avatar: row.avatar,
    date: row.date,
    likes,
    comments
  };
}

const Post = {
  findAll() {
    const rows = db.prepare("SELECT * FROM posts ORDER BY date DESC").all();
    return rows.map(buildPost);
  },

  findById(id) {
    const row = db.prepare("SELECT * FROM posts WHERE id = ?").get(id);
    return buildPost(row);
  },

  create({ user_id, text, name, avatar }) {
    const info = db
      .prepare("INSERT INTO posts (user_id, text, name, avatar) VALUES (?, ?, ?, ?)")
      .run(user_id, text, name || null, avatar || null);
    return this.findById(info.lastInsertRowid);
  },

  remove(id) {
    db.prepare("DELETE FROM posts WHERE id = ?").run(id);
  },

  removeByUserId(userId) {
    db.prepare("DELETE FROM posts WHERE user_id = ?").run(userId);
  },

  getLikes(postId) {
    return db
      .prepare("SELECT id, user_id AS user FROM likes WHERE post_id = ?")
      .all(postId);
  },

  addLike(postId, userId) {
    db.prepare("INSERT INTO likes (post_id, user_id) VALUES (?, ?)").run(postId, userId);
    return this.getLikes(postId);
  },

  removeLike(postId, userId) {
    db.prepare("DELETE FROM likes WHERE post_id = ? AND user_id = ?").run(postId, userId);
    return this.getLikes(postId);
  },

  getComments(postId) {
    return db
      .prepare("SELECT * FROM comments WHERE post_id = ? ORDER BY rowid DESC")
      .all(postId)
      .map(c => ({
        _id: c.id,
        user: c.user_id,
        text: c.text,
        name: c.name,
        avatar: c.avatar,
        date: c.date
      }));
  },

  addComment(postId, { user_id, text, name, avatar }) {
    db.prepare(
      "INSERT INTO comments (post_id, user_id, text, name, avatar) VALUES (?, ?, ?, ?, ?)"
    ).run(postId, user_id, text, name || null, avatar || null);
    return this.getComments(postId);
  },

  removeComment(postId, commentId, userId) {
    const comment = db
      .prepare("SELECT * FROM comments WHERE id = ? AND post_id = ?")
      .get(commentId, postId);
    if (!comment) return null;
    if (comment.user_id !== userId) return "unauthorized";
    db.prepare("DELETE FROM comments WHERE id = ?").run(commentId);
    return this.getComments(postId);
  }
};

module.exports = Post;
