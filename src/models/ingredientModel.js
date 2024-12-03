const db = require('../config/database');

const Ingredient = {
  addBatch: (ingredients) => {
    const sql = 'INSERT INTO ingredients (recipesId, ingredient, quantity, notes) VALUES ?';
    return db.query(sql, [ingredients]);
  },
  deleteAll: (recipeId) => {
    const sql = 'DELETE FROM ingredients WHERE recipesId = ?';
    return db.query(sql, [recipeId]);
  }
};

module.exports = Ingredient;