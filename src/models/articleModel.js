const db = require('../config/database');

const Article = {
  getAll: () => {
    const sql = `SELECT a.*,
                    GROUP_CONCAT(t.tag) AS tags,
                    GROUP_CONCAT(c.type SEPARATOR '|') AS contentTypes,
                    GROUP_CONCAT(c.text SEPARATOR '|') AS contentTexts
                  FROM articles a
                  LEFT JOIN tags t ON t.entityId = a.id AND t.entityType = 'articles'
                  LEFT JOIN contents c ON c.articlesId = a.id
                  GROUP BY a.id`;
    return db.query(sql);
  },
  search: (searchKeyword) => {
    const sql = `SELECT a.*,
                    GROUP_CONCAT(t.tag) AS tags,
                    GROUP_CONCAT(c.type SEPARATOR '|') AS contentTypes,
                    GROUP_CONCAT(c.text SEPARATOR '|') AS contentTexts
                  FROM articles a
                  LEFT JOIN tags t ON t.entityId = a.id AND t.entityType = 'articles'
                  LEFT JOIN contents c ON c.articlesId = a.id
                  WHERE a.title LIKE ? OR t.tag LIKE ?
                  GROUP BY a.id`;
    return db.query(sql, [`%${searchKeyword}%`, `%${searchKeyword}%`]);
  },
  getById: (id) => {
    const sql = `SELECT a.*,
                    GROUP_CONCAT(t.tag) AS tags,
                    GROUP_CONCAT(c.type SEPARATOR '|') AS contentTypes,
                    GROUP_CONCAT(c.text SEPARATOR '|') AS contentTexts
                  FROM articles a
                  LEFT JOIN tags t ON t.entityId = a.id AND t.entityType = 'articles'
                  LEFT JOIN contents c ON c.articlesId = a.id
                  WHERE a.id = ?
                  GROUP BY a.id`;
    return db.query(sql, [id]);
  },
  add: (title, imageUrl) => {
    const sql = `INSERT INTO articles (title, imageUrl)
                  VALUES (?, ?)`;
    return db.query(sql, [title, imageUrl]);
  },
  edit: (title, imageUrl) => {
    const sql = `UPDATE articles
                  SET title = ?, imageUrl = ?`;
    return db.query(sql, [title, imageUrl]);
  },
  delete: (id) => {
    const sql = `DELETE a, t, c
                  FROM articles a
                  LEFT JOIN tags t ON t.entityId = a.id AND t.entityType = 'articles'
                  LEFT JOIN contents c ON c.articlesId = a.id
                  WHERE a.id = ?`;
    return db.query(sql, [id]);
  }
};

module.exports = Article;