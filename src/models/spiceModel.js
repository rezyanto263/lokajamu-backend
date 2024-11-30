const db = require('../config/database');

const Spice = {
  search: (searchKeyword) => {
    const sql = `SELECT s.*, GROUP_CONCAT(t.tag) AS tags
                  FROM spices s 
                  JOIN tags t ON t.entityId = s.id AND t.entityType = 'spices'
                  WHERE s.name LIKE ? OR t.tag LIKE ? OR s.benefits LIKE ?
                  GROUP BY s.id`;
    return db.query(sql, [`%${searchKeyword}%`, `%${searchKeyword}%`, `%${searchKeyword}%`]);
  },
  getAll: () => {
    const sql = `SELECT s.*, GROUP_CONCAT(t.tag) AS tags
                  FROM spices s 
                  JOIN tags t ON t.entityId = s.id AND t.entityType = 'spices'
                  GROUP BY s.id`;
    return db.query(sql);
  },
  getById: (id) => {
    const sql = 'SELECT * FROM spices WHERE id = ?';
    return db.query(sql, [id]);
  },
  add: (name, imageUrl, description, benefits) => {
    const sql = 'INSERT INTO spices (name, imageUrl, description, benefits) VALUES (?, ?, ?, ?)';
    return db.query(sql, [name, imageUrl, description, benefits]);
  },
  edit: (name, imageUrl, description, benefits, id) => {
    const sql = 'UPDATE spices SET name = ?, imageUrl = ?, description = ?, benefits = ? WHERE id = ?';
    return db.query(sql, [name, imageUrl, description, benefits, id]);
  },
  delete: (id) => {
    const sql = 'DELETE FROM spices WHERE id = ?';
    return db.query(sql, [id]);
  }
};

module.exports = Spice;