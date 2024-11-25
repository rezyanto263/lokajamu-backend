const db = require('../config/database');

const User = {
  getByEmail: (email) => {
    const sql = 'SELECT id, password FROM users WHERE email = ?';
    return db.promise().query(sql, [email]);
  },
  getById: (id) => {
    const sql = 'SELECT * FROM users WHERE id = ?';
    return db.promise().query(sql, [id]);
  },
  add: (data) => {
    const sql ='INSERT INTO users (firstName, lastName, email, password) VALUES (?, ?, ?, ?)';
    return db.promise().query(sql, [data.firstName, data.lastName, data.email, data.password]);
  },
  edit: (newData, id) => {
    const sql ='UPDATE users SET firstName = ?, lastName = ?, email = ?, password = ? WHERE id = ?';
    return db.promise().query(sql, [newData.firstName, newData.lastName, newData.email, newData.password, id]);
  },
  changePassword: (id, newPassword) => {
    const sql = 'UPDATE users SET password = ? WHERE id = ?';
    return db.promise().query(sql, [newPassword, id]);
  },
  addResetCode: (email, resetCode, expiresIn) => {
    const sql = 'INSERT INTO reset_code (email, code, expiresIn) VALUES (?, ?, ?)';
    return db.promise().query(sql, [email, resetCode, expiresIn]);
  },
  getResetCode: (resetCode) => {
    const sql = 'SELECT * FROM reset_code WHERE code = ?, ';
    return db.promise().query(sql, [resetCode]);
  },
};

module.exports = User;
