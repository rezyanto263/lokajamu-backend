const db = require('../config/database');

const User = {
  getByEmail: (email) => {
    const sql = 'SELECT id, password FROM users WHERE email = ?';
    return db.query(sql, [email]);
  },
  getById: (id) => {
    const sql = 'SELECT * FROM users WHERE id = ?';
    return db.query(sql, [id]);
  },
  add: (data) => {
    const sql ='INSERT INTO users (firstName, lastName, email, password) VALUES (?, ?, ?, ?)';
    return db.query(sql, [data.firstName, data.lastName, data.email, data.hashedPassword]);
  },
  edit: (firstName, lastName, email, id) => {
    const sql ='UPDATE users SET firstName = ?, lastName = ?, email = ? WHERE id = ?';
    return db.query(sql, [firstName, lastName, email, id]);
  },
  changePassword: (id, newPassword) => {
    const sql = 'UPDATE users SET resetToken = null, resetTokenExpire = null, password = ? WHERE id = ?';
    return db.query(sql, [newPassword, id]);
  },
  addResetToken: (email, resetToken, resetTokenExpire) => {
    const sql = 'UPDATE users SET resetToken = ?, resetTokenExpire = ? WHERE email = ?';
    return db.query(sql, [resetToken, resetTokenExpire, email]);
  },
  getResetToken: (email, resetToken) => {
    const sql = 'SELECT id, email, resetToken, resetTokenExpire FROM users WHERE  email = ? AND resetToken = ?';
    return db.query(sql, [email, resetToken]);
  },
};

module.exports = User;
