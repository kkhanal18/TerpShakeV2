const db = require("../db/database");

const User = {
  findByEmail(email) {
    return db.prepare("SELECT * FROM users WHERE email = ?").get(email);
  },

  findById(id) {
    return db.prepare("SELECT * FROM users WHERE id = ?").get(id);
  },

  // Returns user without password field
  findByIdSafe(id) {
    return db
      .prepare("SELECT id, name, email, avatar, avatar_link, date FROM users WHERE id = ?")
      .get(id);
  },

  create({ name, email, password, avatar, avatar_link }) {
    const info = db
      .prepare(
        "INSERT INTO users (name, email, password, avatar, avatar_link) VALUES (?, ?, ?, ?, ?)"
      )
      .run(name, email, password, avatar || null, avatar_link || null);
    return this.findById(info.lastInsertRowid);
  },

  remove(id) {
    db.prepare("DELETE FROM users WHERE id = ?").run(id);
  }
};

module.exports = User;
