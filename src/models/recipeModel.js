const db = require('../config/database');

const Recipe = {
  search: (searchKeyword) => {
    const sql = `SELECT r.*, 
                  GROUP_CONCAT(DISTINCT ta.tag ORDER BY ta.id) AS tags,
                  GROUP_CONCAT(DISTINCT i.ingredient ORDER BY i.id SEPARATOR '|') AS ingredientNames,
                  GROUP_CONCAT(DISTINCT i.quantity ORDER BY i.id SEPARATOR '|') AS ingredientQuantities,
                  GROUP_CONCAT(DISTINCT i.notes ORDER BY i.id SEPARATOR '|') AS ingredientNotes,
                  GROUP_CONCAT(DISTINCT s.stepNumber ORDER BY s.stepNumber SEPARATOR '|') AS stepNumbers, 
                  GROUP_CONCAT(DISTINCT s.instruction ORDER BY s.stepNumber SEPARATOR '|') AS instructions, 
                  GROUP_CONCAT(DISTINCT ti.description) AS tips
                FROM recipes r
                LEFT JOIN tags ta ON ta.entityId = r.id AND ta.entityType = 'recipes'
                LEFT JOIN ingredients i ON i.recipesId = r.id
                LEFT JOIN steps s ON s.recipesId = r.id
                LEFT JOIN tips ti ON ti.recipesId = r.id
                WHERE r.name LIKE ? OR ta.tag LIKE ? OR i.ingredient LIKE ?
                GROUP BY r.id`;
    return db.query(sql, [`%${searchKeyword}%`, `%${searchKeyword}%`, `%${searchKeyword}%`]);
  },
  getAll: () => {
    const sql =  `SELECT r.*, 
                    GROUP_CONCAT(DISTINCT ta.tag ORDER BY ta.id) AS tags,
                    GROUP_CONCAT(DISTINCT i.ingredient ORDER BY i.id SEPARATOR '|') AS ingredientNames,
                    GROUP_CONCAT(DISTINCT i.quantity ORDER BY i.id SEPARATOR '|') AS ingredientQuantities,
                    GROUP_CONCAT(DISTINCT i.notes ORDER BY i.id SEPARATOR '|') AS ingredientNotes,
                    GROUP_CONCAT(DISTINCT s.stepNumber ORDER BY s.stepNumber SEPARATOR '|') AS stepNumbers,
                    GROUP_CONCAT(DISTINCT s.instruction ORDER BY s.stepNumber SEPARATOR '|') AS instructions,
                    GROUP_CONCAT(DISTINCT ti.description) AS tips
                  FROM recipes r
                  LEFT JOIN tags ta ON ta.entityId = r.id AND ta.entityType = 'recipes'
                  LEFT JOIN ingredients i ON i.recipesId = r.id
                  LEFT JOIN steps s ON s.recipesId = r.id
                  LEFT JOIN tips ti ON ti.recipesId = r.id
                  GROUP BY r.id`;
    return db.query(sql);
  },
  getById: (id) => {
    const sql = `SELECT r.*,
                    GROUP_CONCAT(DISTINCT ta.tag ORDER BY ta.id) AS tags,
                    GROUP_CONCAT(DISTINCT i.ingredient ORDER BY i.id SEPARATOR '|') AS ingredientNames,
                    GROUP_CONCAT(DISTINCT i.quantity ORDER BY i.id SEPARATOR '|') AS ingredientQuantities,
                    GROUP_CONCAT(DISTINCT i.notes ORDER BY i.id SEPARATOR '|') AS ingredientNotes,
                    GROUP_CONCAT(DISTINCT s.stepNumber ORDER BY s.stepNumber SEPARATOR '|') AS stepNumbers,
                    GROUP_CONCAT(DISTINCT s.instruction ORDER BY s.stepNumber SEPARATOR '|') AS instructions,
                    GROUP_CONCAT(DISTINCT ti.description) AS tips
                  FROM recipes r
                  LEFT JOIN tags ta ON ta.entityId = r.id AND ta.entityType = 'recipes'
                  LEFT JOIN ingredients i ON i.recipesId = r.id
                  LEFT JOIN steps s ON s.recipesId = r.id
                  LEFT JOIN tips ti ON ti.recipesId = r.id
                  WHERE r.id = ?
                  GROUP BY r.id`;
    return db.query(sql, [id]);
  },
  add: (name, imageUrl, description, prepTime, cookTime, totalTime, servingSize) => {
    const sql = `INSERT INTO recipes (name, imageUrl, description, prepTime, cookTime, totalTime, servingSize) 
                  VALUES (?, ?, ?, ?, ?, ?, ?)`;
    return db.query(sql, [name, imageUrl, description, prepTime, cookTime, totalTime, servingSize]);
  },
  edit: (name, imageUrl, description, prepTime, cookTime, totalTime, servingSize, id) => {
    const sql = `UPDATE recipes 
                  SET 
                    name = ?, imageUrl = ?, description = ?, prepTime = ?, 
                    cookTime = ?, totalTime = ?, servingSize = ?
                  WHERE id = ?`;
    return db.query(sql, [name, imageUrl, description, prepTime, cookTime, totalTime, servingSize, id]);
  },
  delete: (id) => {
    const sql = `DELETE r, ta, i, s, ti
                  FROM recipes r
                  LEFT JOIN tags ta ON ta.entityId = r.id AND ta.entityType = 'recipes'
                  LEFT JOIN ingredients i ON i.recipesId = r.id
                  LEFT JOIN steps s ON s.recipesId = r.id
                  LEFT JOIN tips ti ON ti.recipesId = r.id
                  WHERE r.id = ?`;
    return db.query(sql, [id]);
  }
};

module.exports = Recipe;