const db = require("../db/database");

// Reconstruct a profile row into the shape the routes/frontend expect,
// joining in the user fields, experience, and education arrays.
function buildProfile(row) {
  if (!row) return null;

  const experience = db
    .prepare("SELECT * FROM experience WHERE profile_id = ? ORDER BY rowid DESC")
    .all(row.id)
    .map(e => ({
      id: e.id,
      title: e.title,
      company: e.company,
      location: e.location,
      from: e.from_date,
      to: e.to_date,
      current: e.current === 1,
      description: e.description
    }));

  const education = db
    .prepare("SELECT * FROM education WHERE profile_id = ? ORDER BY rowid DESC")
    .all(row.id)
    .map(e => ({
      id: e.id,
      school: e.school,
      degree: e.degree,
      fieldofstudy: e.fieldofstudy,
      from: e.from_date,
      to: e.to_date,
      current: e.current === 1,
      description: e.description
    }));

  return {
    id: row.id,
    user: {
      id: row.user_id,
      name: row.user_name,
      avatar: row.user_avatar
    },
    company: row.company,
    website: row.website,
    location: row.location,
    status: row.status,
    skills: JSON.parse(row.skills || "[]"),
    bio: row.bio,
    githubusername: row.githubusername,
    avatar_link: row.avatar_link,
    social: {
      youtube: row.social_youtube,
      twitter: row.social_twitter,
      facebook: row.social_facebook,
      linkedin: row.social_linkedin,
      instagram: row.social_instagram
    },
    date: row.date,
    experience,
    education
  };
}

const PROFILE_SELECT = `
  SELECT p.*, u.name AS user_name, u.avatar AS user_avatar
  FROM profiles p
  JOIN users u ON u.id = p.user_id
`;

const Profile = {
  findByUserId(userId) {
    const row = db
      .prepare(`${PROFILE_SELECT} WHERE p.user_id = ?`)
      .get(userId);
    return buildProfile(row);
  },

  findAll() {
    const rows = db.prepare(PROFILE_SELECT).all();
    return rows.map(buildProfile);
  },

  upsert(userId, fields) {
    const {
      company, website, location, bio, status, githubusername,
      skills, avatar_link,
      youtube, facebook, twitter, instagram, linkedin
    } = fields;

    const existing = db
      .prepare("SELECT id FROM profiles WHERE user_id = ?")
      .get(userId);

    if (existing) {
      db.prepare(`
        UPDATE profiles SET
          company = ?, website = ?, location = ?, bio = ?, status = ?,
          githubusername = ?, skills = ?, avatar_link = ?,
          social_youtube = ?, social_facebook = ?, social_twitter = ?,
          social_instagram = ?, social_linkedin = ?
        WHERE user_id = ?
      `).run(
        company || null, website || null, location || null, bio || null,
        status, githubusername || null,
        JSON.stringify(skills || []), avatar_link || null,
        youtube || null, facebook || null, twitter || null,
        instagram || null, linkedin || null,
        userId
      );
    } else {
      db.prepare(`
        INSERT INTO profiles
          (user_id, company, website, location, bio, status, githubusername,
           skills, avatar_link, social_youtube, social_facebook, social_twitter,
           social_instagram, social_linkedin)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        userId,
        company || null, website || null, location || null, bio || null,
        status, githubusername || null,
        JSON.stringify(skills || []), avatar_link || null,
        youtube || null, facebook || null, twitter || null,
        instagram || null, linkedin || null
      );
    }

    return this.findByUserId(userId);
  },

  removeByUserId(userId) {
    db.prepare("DELETE FROM profiles WHERE user_id = ?").run(userId);
  },

  // Experience
  addExperience(userId, { title, company, location, from, to, current, description }) {
    const profile = db
      .prepare("SELECT id FROM profiles WHERE user_id = ?")
      .get(userId);
    if (!profile) throw new Error("Profile not found");

    db.prepare(`
      INSERT INTO experience (profile_id, title, company, location, from_date, to_date, current, description)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      profile.id, title, company, location || null,
      from, to || null, current ? 1 : 0, description || null
    );

    return this.findByUserId(userId);
  },

  deleteExperience(userId, expId) {
    const profile = db
      .prepare("SELECT id FROM profiles WHERE user_id = ?")
      .get(userId);
    if (!profile) throw new Error("Profile not found");

    db.prepare("DELETE FROM experience WHERE id = ? AND profile_id = ?")
      .run(expId, profile.id);

    return this.findByUserId(userId);
  },

  // Education
  addEducation(userId, { school, degree, fieldofstudy, from, to, current, description }) {
    const profile = db
      .prepare("SELECT id FROM profiles WHERE user_id = ?")
      .get(userId);
    if (!profile) throw new Error("Profile not found");

    db.prepare(`
      INSERT INTO education (profile_id, school, degree, fieldofstudy, from_date, to_date, current, description)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      profile.id, school, degree, fieldofstudy,
      from, to || null, current ? 1 : 0, description || null
    );

    return this.findByUserId(userId);
  },

  deleteEducation(userId, eduId) {
    const profile = db
      .prepare("SELECT id FROM profiles WHERE user_id = ?")
      .get(userId);
    if (!profile) throw new Error("Profile not found");

    db.prepare("DELETE FROM education WHERE id = ? AND profile_id = ?")
      .run(eduId, profile.id);

    return this.findByUserId(userId);
  }
};

module.exports = Profile;
