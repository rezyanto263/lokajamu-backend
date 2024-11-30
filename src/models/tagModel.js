const db = require('../config/database');

const Tag = {
  getAll: (entityId, entityType) => {
    const sql = 'SELECT * FROM tags WHERE entityId = ? AND entityType = ?';
    return db.query(sql, [entityId, entityType]);
  },
  addBatch: (tags) => {
    const sql = 'INSERT INTO tags (tag, entityId, entityType) VALUES ?';
    return db.query(sql, [tags]);
  },
  deleteAll: (entityId, entityType) => {
    const sql = 'DELETE FROM tags where entityId = ? AND entityType = ?';
    return db.query(sql, [entityId, entityType]);
  }
};

module.exports = Tag;