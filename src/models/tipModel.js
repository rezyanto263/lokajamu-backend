const db = require('../config/database');

const Tip = {
  addBatch: (tips) => {
    const sql = 'INSERT INTO Tips (recipesId, description) VALUES ?';
    return db.query(sql, [tips]);
  },
  deleteAll: (recipeId) => {
    const sql = 'DELETE FROM Tips WHERE recipesId = ?';
    return db.query(sql, [recipeId]);
  }
};

module.exports = Tip;