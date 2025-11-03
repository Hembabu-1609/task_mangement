const db = require("../config/db");


const findUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM users WHERE email = ?";
    db.query(query, [email], (err, results) => {
      if (err) reject(err);
      else resolve(results[0]);
    });
  });
};


const createUser = (user) => {
  return new Promise((resolve, reject) => {
    const query = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    db.query(query, [user.name, user.email, user.password], (err, result) => {
      if (err) reject(err);
      else resolve({ id: result.insertId, ...user });
    });
  });
};

module.exports = { findUserByEmail, createUser };
