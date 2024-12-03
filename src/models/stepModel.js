const db = require('../config/database');

const Step = {
  addBatch: (steps) => {
    const sql = 'INSERT INTO steps (recipesId, stepNumber, instruction) VALUES ?';
    return db.query(sql, [steps]);
  },
  deleteAll: (recipeId) => {
    const sql = 'DELETE FROM steps WHERE recipesId = ?';
    return db.query(sql, [recipeId]);
  }
};

module.exports = Step;