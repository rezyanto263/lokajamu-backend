const db = require('../config/database');

const Content = {
  addBatch: (contents) => {
    const sql = 'INSERT INTO contents (articlesId, type, text) VALUES ?';
    return db.query(sql, [contents]);
  },
  deleteAll: (articleId) => {
    const sql = 'DELETE FROM contents WHERE articlesId = ?';
    return db.query(sql, [articleId]);
  }
};

module.exports = Content;